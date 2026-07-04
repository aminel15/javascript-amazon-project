class Cart {
  cartItem;
  localStorageKey;
  constructor(localStorageKey){
    this.localStorageKey = localStorageKey ;
    this.loadFromStorage();
  }
  loadFromStorage() {
    this.cartItem = JSON.parse(localStorage.getItem(this.localStorageKey));

    if (!this.cartItem) {
      this.cartItem = [
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 2,
          deliveryOptionId: "1",
        },
        {
          productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
          quantity: 1,
          deliveryOptionId: "2",
        },
      ];
    }
  }
  saveToStorage() {
    localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItem));
  }

  addToCart(productId) {
    let matchingItem;
    let quantitySelector = document.querySelector(
      `.js-quantity-selector-${productId}`,
    );
    let quantity = Number(quantitySelector.value);
    this.cartItem.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });

    if (matchingItem) {
      matchingItem.quantity += quantity;
    } else {
      this.cartItem.push({
        productId,
        quantity,
        deliveryOptionId: "1",
      });
    }

    this.saveToStorage();
  }

  removeFromCart(productId) {
    let newCart = [];
    this.cartItem.forEach((cartItem) => {
      if (cartItem.productId !== productId) {
        newCart.push(cartItem);
      }
    });
    this.cartItem = newCart;

    this.saveToStorage();
  }

  calculateCartQuantity() {
    let cartQuantity = 0;
    this.cartItem.forEach((cartItem) => {
      cartQuantity += cartItem.quantity;
    });

    return cartQuantity;
  }

  updateQuantity(productId, newQuantity) {
    let matchingItem;
    this.cartItem.forEach((cartItem) => {
      if (cartItem.productId === productId) {
        cartItem.quantity += newQuantity;
        matchingItem = cartItem.quantity;
      }
    });
    this.saveToStorage();
    return matchingItem;
  }

  updateDeliveryOption(productId, deliveryOptionId) {
    let matchingItem;

    this.cartItem.forEach((cartItem) => {
      if (productId === cartItem.productId) {
        matchingItem = cartItem;
      }
    });
    matchingItem.deliveryOptionId = deliveryOptionId;

    this.saveToStorage();
  }
}

const cart = new Cart("cart-oop");
const businessCart = new Cart("cart-business");
