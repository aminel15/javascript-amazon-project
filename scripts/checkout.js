import { renderCartSummaryHTML } from "./checkout/orderSummery.js";
import { renderPaymentSummary} from "./checkout/paymentSummary.js";
import { loadProduct , loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/backend-practice.js'
// import "../data/car.js"
// import "../data/cart-class.js";

async function loadPage() {
  await loadProductsFetch();

  await new Promise((resolve)=>{
    loadCart(()=>{
      resolve();
    })
  })

  renderCartSummaryHTML();
  renderPaymentSummary();

}
loadPage();


/*

* this is a function that retruns a promise by default because of using the fetch() method
export function loadProductsFetch (){
 const promise = fetch('https://supersimplebackend.dev/products').then((response)=>{
  return response.json();
  }).then((productsData)=>{
    products = productsData.map((productDetails) => {
        if (productDetails.type === 'clothing') {
          return new Clothing(productDetails);
        }else if(productDetails.type === 'appliance'){
          return new Appliance(productDetails);
        }
        return new Product(productDetails);
      });
    console.log("Load product")
  })
  return promise;
}
  


* and this is a regular function and that's why we have to put it inside a new Promise when we wanna use it in a async function 
export function loadCart(fun){
  let xhr = new XMLHttpRequest()
  xhr.addEventListener('load', () => {
    console.log(xhr.response);
    fun();
  }); 
 
 xhr.open('GET', 'https://supersimplebackend.dev/cart');
 xhr.send(); 
}
*/






// Promise.all([
//  loadProductsFetch(),

//   new Promise((resolve)=>{
//     loadCart(()=>{
//       resolve();
//     })
//   }),
    
// ]).then(()=>{
// renderCartSummaryHTML();
// renderPaymentSummary()
// });
  






// Promise.all([
//   new Promise ((resolve)=>{
//     loadProduct(()=>{
//       resolve();
//     })
//   }),

//   new Promise((resolve)=>{
//     loadCart(()=>{
//       resolve();
//     })
//   }),
    
// ]).then(()=>{
// renderCartSummaryHTML();
// renderPaymentSummary()
// });
  


