import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
  updateDeliveryOption,
} from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import { formatCurrency } from "../Utils/money.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";
import {
  deliveryOptions,
  getDeliveryOption,
} from "../../data/deliveryOptions.js";
import { renderPaymentSummary } from "../checkout/paymentSummary.js";
import { renderCheckoutHeader } from "./checkoutHeader.js";
import { isWeekend } from "../Utils/DateAndTime.js";
import { calculateDeliveryDate } from "../../data/deliveryOptions.js";

export function renderCartSummaryHTML() {
  let cartSummaryHTML = "";
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingItem = getProduct(productId);
    const deliveryOptionId = cartItem.deliveryOptionId;
    const deliveryOption = getDeliveryOption(deliveryOptionId);

    const dateString = calculateDeliveryDate(deliveryOption);
    // ${matchingItem.getPrice()}
    cartSummaryHTML += ` 
        <div class="cart-item-container js-cart-item-container-${matchingItem.id}">
        <div class="delivery-date">Delivery date: ${dateString}</div>
        <div class="cart-item-details-grid">
            <img
            class="product-image"
            src="${matchingItem.image}"
            />

            <div class="cart-item-details">
            <div class="product-name">
                ${matchingItem.name}
            </div>
            <div class="product-price">${matchingItem.getPrice()}</div> 
            <div class="product-quantity">
                <span> Quantity: <span class="quantity-label js-quantity-label-${matchingItem.id}">${cartItem.quantity}</span> </span>
                <span class="update-quantity-link link-primary js-update-link" data-product-id=${matchingItem.id}>
                Update
                </span>
                <input class="quantity-input js-quantity-input-${matchingItem.id} js-quantity-input-enter" data-product-id=${matchingItem.id}>
                <span class="save-quantity-link link-primary js-save-quantity-link" data-product-id=${matchingItem.id}>
                Save
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id=${matchingItem.id}>
                Delete
                </span>
            </div>
            </div>

            <div class="delivery-options">
            <div class="delivery-options-title">
                Choose a delivery option:
            </div>
            ${deliveryOptionsHTML(matchingItem, cartItem)}
            </div>
        </div>
        </div>`;
  });

  function deliveryOptionsHTML(matchingItem, cartItem) {
    let html = "";
    deliveryOptions.forEach((deliveryOption) => {
      // const today = dayjs();
      // let final = "";
      // let deliveryDate = today.add(deliveryOption.deliveryDays, "day");
      // if (isWeekend(deliveryDate) === 0) {
      //   deliveryDate = today.add(deliveryOption.deliveryDays + 3, "day"); // today-> daliverydate = object == > format -- >
      // } else if (isWeekend(deliveryDate) === 6) {
      //   deliveryDate = today.add(deliveryOption.deliveryDays + 2, "day");
      // }

      // const dateString = deliveryDate.format("dddd, MMMM D");
      let dateString = calculateDeliveryDate(deliveryOption);
      const priceString =
        deliveryOption.priceCents === 0
          ? "FREE"
          : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `
      <div class="delivery-option js-delivery-option" data-product-id = '${matchingItem.id}' data-delivery-option-id = '${deliveryOption.id}'>
        <input
          ${isChecked ? "checked" : ""}
          type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingItem.id}"
        />
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString} Shipping</div>
        </div>
      </div>`;
    });
    return html;
  }

  document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

  renderCheckoutHeader();

  function saveQuantity(productId) {
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`,
    );

    container.classList.remove("is-editing-quantity");
    let quantityInput = document.querySelector(
      `.js-quantity-input-${productId}`,
    );
    let newQuantity = Math.floor(Number(quantityInput.value));
    if (newQuantity >= 0 && newQuantity < 1000) {
      document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
        updateQuantity(productId, newQuantity);

      renderCheckoutHeader();
      renderPaymentSummary();
      quantityInput.value = "";
    }
  }

  document.querySelectorAll(".js-delete-link").forEach((link) => {
    link.addEventListener("click", () => {
      let productId = link.dataset.productId;
      removeFromCart(productId);
      /*   const container = document.querySelector(
        `.js-cart-item-container-${productId}`,
      ); */
      //container.remove();
      renderCartSummaryHTML();
      renderCheckoutHeader();
      renderPaymentSummary();
    });
  });

  document.querySelectorAll(".js-update-link").forEach((link) => {
    link.addEventListener("click", () => {
      let { productId } = link.dataset;
      const container = document.querySelector(
        `.js-cart-item-container-${productId}`,
      );
      container.classList.add("is-editing-quantity");
    });
  });

  document.querySelectorAll(".js-quantity-input-enter").forEach((input) => {
    input.addEventListener("keydown", () => {
      let { productId } = input.dataset;
      if (event.key === "Enter") {
        saveQuantity(productId);
      }
    });
  });

  document.querySelectorAll(".js-save-quantity-link").forEach((link) => {
    link.addEventListener("click", () => {
      let { productId } = link.dataset;
      saveQuantity(productId);
    });
  });

  document.querySelectorAll(".js-delivery-option").forEach((element) => {
    element.addEventListener("click", () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderCartSummaryHTML();
      renderPaymentSummary();
    });
  });
}

//   console.log(dayjs().add(5, 'days').format('MMMM D'));
//   console.log(dayjs().add(1, 'M').format('MMMM D'));
//   console.log(dayjs().subtract(1, 'M').format('MMMM D'));
//   console.log(dayjs().format("'dddd'"));
// export function isWeekend (date){
//     return dayjs().format(date);

//   }
//   console.log(isWeekend('d'));
