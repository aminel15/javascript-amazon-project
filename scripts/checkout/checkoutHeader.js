import { calculateCartQuantity } from "../../data/cart.js";
export function renderCheckoutHeader(){ 
  return (document.querySelector(".js-return-to-home-link").innerHTML =
        `${calculateCartQuantity()} items`);
};