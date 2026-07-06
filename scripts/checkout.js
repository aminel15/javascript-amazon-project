import { renderCartSummaryHTML } from "./checkout/orderSummery.js";
import { renderPaymentSummary} from "./checkout/paymentSummary.js";
import { loadProduct } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/backend-practice.js'
// import "../data/car.js"
// import "../data/cart-class.js";
Promise.all([
  new Promise ((resolve)=>{
    loadProduct(()=>{
      resolve();
    })
  }),

  new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    })
  }),
    
]).then(()=>{
renderCartSummaryHTML();
renderPaymentSummary()
});
  









