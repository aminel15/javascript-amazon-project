import {
  cart,
  removeFromCart,
  calculateCartQuantity,
  updateQuantity,
} from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./Utils/money.js";
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'
import deliveryOptions from "../data/deliveryOptions.js";



let cartSummaryHTML = "";
cart.forEach((cartItem) => {
  let productId = cartItem.productId;
  let matchingItem;
  products.forEach((product) => {
    if (product.id === productId) {
      matchingItem = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;
  let deliveryOption;
  
  deliveryOptions.forEach((option)=>{
    if(option.id === deliveryOptionId) {
      deliveryOption = option;
    }
  })

  const today = dayjs();
  const deliveryDate = today.add(
    deliveryOption.deliveryDays,
    'day'
  );

  const dateString = deliveryDate.format('dddd, MMMM D' );

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
      <div class="product-price">$${formatCurrency(matchingItem.priceCents)}</div>
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

function deliveryOptionsHTML(matchingItem, cartItem){
  let html = '';
  deliveryOptions.forEach((deliveryOption)=>{
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'day'
    );

    const dateString = deliveryDate.format('dddd, MMMM D' );

    const priceString = deliveryOption.priceCents === 0 ? 'FREE' : `$${formatCurrency(deliveryOption.priceCents)} -`
    const isChecked = deliveryOption.id === cartItem.deliveryOptionId   
    html+= `
      <div class="delivery-option">
        <input
          ${isChecked ? 'checked' : ''}
          type="radio"
          class="delivery-option-input"
          name="delivery-option-${matchingItem.id}"
        />
        <div>
          <div class="delivery-option-date">${dateString}</div>
          <div class="delivery-option-price">${priceString} Shipping</div>
        </div>
      </div>`
  });
  return html;
}

document.querySelector(".js-order-summary").innerHTML = cartSummaryHTML;

function updateCartQuantity() {
  return (document.querySelector(".js-return-to-home-link").innerHTML =
    `${calculateCartQuantity()} items`);
}
updateCartQuantity();

function saveQuantity(productId) {
  const container = document.querySelector(
    `.js-cart-item-container-${productId}`,
  );

  container.classList.remove("is-editing-quantity");
  let quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
  let newQuantity = Math.floor(Number(quantityInput.value));
  if (newQuantity >= 0 && newQuantity < 1000) {
    document.querySelector(`.js-quantity-label-${productId}`).innerHTML =
      updateQuantity(productId, newQuantity);

    updateCartQuantity();
    quantityInput.value = "";
  }
}

document.querySelectorAll(".js-delete-link").forEach((link) => {
  link.addEventListener("click", () => {
    let productId = link.dataset.productId;
    removeFromCart(productId);
    const container = document.querySelector(
      `.js-cart-item-container-${productId}`,
    );
    container.remove();

    updateCartQuantity();
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
    // <div class="delivery-option">
      //   <input
      //     type="radio"
      //     checked
      //     class="delivery-option-input"
      //     name="delivery-option-${matchingItem.id}"
      //   />
      //   <div>
      //     <div class="delivery-option-date">Tuesday, June 21</div>
      //     <div class="delivery-option-price">FREE Shipping</div>
      //   </div>
      // </div>
      // <div class="delivery-option">
      //   <input
      //     type="radio"
      //     class="delivery-option-input"
      //     name="delivery-option-${matchingItem.id}"
      //   />
      //   <div>
      //     <div class="delivery-option-date">Wednesday, June 15</div>
      //     <div class="delivery-option-price">$4.99 - Shipping</div>
      //   </div>
      // </div>
      // <div class="delivery-option">
      //   <input
      //     type="radio"
      //     class="delivery-option-input"
      //     name="delivery-option-${matchingItem.id}"
      //   />
      //   <div>
      //     <div class="delivery-option-date">Monday, June 13</div>
      //     <div class="delivery-option-price">$9.99 - Shipping</div>
      //   </div>
      // </div>
  //        let days;
  //  let today = dayjs()
  //  let deliveryDateFormat;
  //  let deliveryDate;
  //  let price = 0;
  // deliveryOptions.forEach((option)=>{
  //   // console.log(price);
  //   if (option.id === cart.deliveryOptionId) {
  //     price = option.priceCents ; 
  //     //cart = option   cart.deliveryoid => deliveryos.id => price  
  //     deliveryDate = today.add(option.deliveryDays, 'days');
        
  //       deliveryDateFormat = deliveryDate.format("dddd, MMMM D");
  //     }
  //     console.log(option.id);
  //     console.log(cart.deliveryOptionId + " cart id");
  //     // console.log(deliveryDateFormat);
  //     // console.log(deliveryDateFormat);
  //   })
  //   // console.log(price);
  // let optionsHTML;
  // //let today = dayjs()
  
