import {addToCart, cart, loadfromStorage} from "../../data/cart.js";

describe('test suite: addToCart', () => {
  
  beforeEach(() => {
    // Ensure the cart is empty before each test
    cart.length = 0;
  });

  it('adds a new product to the cart', () => {
    // Mock localStorage
    spyOn(localStorage, 'setItem'); //save a spy of empty array

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([]); //.callFake - Tell the spy to call a fake implementation when invoked. //return string when storage os called
    });
    loadfromStorage(); // reload the empty cart

    // Mock document.querySelector to return a mock element with specific class with the value property
    spyOn(document, 'querySelector').and.callFake((selector) => {
      if (selector.startsWith('.js-quantity-selector')) {
        return {
          value: '1' // return a mock value
        };
      }
      // Return null for other selectors
      return null;
    });

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); // checked how many times localStorage.setItem is called in the code above
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(1);
  });

  it('adds an existing product to the cart', () => {
    // Mock localStorage
    spyOn(localStorage, 'setItem');

    spyOn(localStorage, 'getItem').and.callFake(() => {
      return JSON.stringify([{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 1,
        deliveryOptionId: '1'
      }]);
    });
    loadfromStorage(); // reload the cart

    // Mock document.querySelector to return a mock element with the value property
    spyOn(document, 'querySelector').and.callFake(() => {
      return {
        value: 2 // return a mock value for the quantity
      };
    });

    addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1); // checked how many times localStorage.setItem is called in the code above
    expect(cart[0].productId).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
    expect(cart[0].quantity).toEqual(3); // 1 (existing) + 2 (new)
  });
});
