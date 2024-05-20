import { renderOrderSummary } from "../../scripts/checkout/orderSummary.js";
import {loadfromStorage, cart} from "../../data/cart.js";
import {loadProductsFetch} from "../../data/products.js";


 describe('test suite: renderOrderSummary', () => {
  const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
  const productId2 = '15b6fc6f-327a-4ec4-896f-486349e85a3d';

  //run function before all of the tests
  beforeAll((done) => {
    // done() is function provided by Jasmine - to control when to go to the next step
    loadProductsFetch().then(() => {
      done();
    });
  })

  // beforeEach hook - before each of test will run this code
  beforeEach(() => {
    spyOn(localStorage, 'setItem');

    document.querySelector('.js-test-container').innerHTML = `
      <div class="js-order-summary"></div>
      <div class="js-payment-summary"></div>
    `

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: productId1,
        quantity: 2,
        deliveryOptionId: '1'
      }, {
        productId: productId2,
        quantity: 1,
        deliveryOptionId: '2'
      }]);
    });
    loadfromStorage();

    renderOrderSummary();
  })

  it('display the cart', () => {
    expect(
      document.querySelectorAll('js-cart-item-container').length
    ).toEqual(2);
    expect(
      document.querySelector(`js-product-quantity-${productId1}`).innerText
    ).toContain('quantty: 2');
    expect(
      document.querySelector(`js-product-quantity-${productId2}`).innerText
    ).toContain('quantty: 1');

    document.querySelector('.js-test-container').innerHTML = '';
  });

  it('remove a product', () => {
    document.querySelector(`js-delete-link-${productId1}`).click();
    expect(
      document.querySelectorAll('js-cart-item-container').length
    ).toEqual(1);
    expect(
      document.querySelector(`js-cart-item-container-${productId1}`)).toEqual(null);
    expect(
      document.querySelector(`js-cart-item-container-${productId1}`)).not(null);
      expect(cart.length).toEqual(1);
      expect(cart[0].productId).toEqual(productId2);

    document.querySelector('.js-test-container').innerHTML = '';
  });
 });