import {renderOrderSummary} from './checkout/orderSummary.js';
import{renderPaymentSummary} from './checkout/paymentSummary.js';
import {renderCheckoutHeader} from './checkout/checkoutHeader.js';
import {loadProductsFetch} from '../data/products.js';
import {loadCart} from '../data/cart.js';
//import '../data/cart-class.js'; //import all from the file
//import '../data/car.js';
//import '../data/backend-practice.js'

//async make a function return a promise
async function loadPage() {
  //code that can cause an error
  try {
    //throw 'error1'; //manually create errors

    await loadProductsFetch(); //wait for this response to finsih before go to next line

  const value = await new Promise((resolve, reject) => {
    //throw 'error2'
    loadCart(() => {
      //reject('error3'); //create error for the future
      resolve('value3');
    });
  });
  }

  //if there is an error run catch()
  catch (error) {
    console.log('Error. Please try again');
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
}
loadPage();

/*
//run the Promises at the same time
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve('value2');
    });
  })

]).then((values) => {
  console.log(values)
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
})
*/

/*
new Promise((resolve) => {
  loadProducts(() => {
    resolve('value1');
  });

}).then((value) => {
  console.log(value);
  return new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  })

}).then(() => {
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
})
*/

/*loadProducts(() => {
  loadCart(() => {
    renderCheckoutHeader();
    renderOrderSummary();
    renderPaymentSummary();
  })
});*/
