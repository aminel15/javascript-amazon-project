import { renderCartSummaryHTML } from "./checkout/orderSummery.js";
import { renderPaymentSummary} from "./checkout/paymentSummary.js";
import { loadProduct } from "../data/products.js";
//import '../data/backend-practice.js'
// import "../data/car.js"
// import "../data/cart-class.js";
loadProduct(()=>{
  renderCartSummaryHTML();
  renderPaymentSummary();
});

