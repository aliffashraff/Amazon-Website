import {orders} from "../data/orders.js";
import formatCurrency from "./utils/money.js";
import {getProducts, loadProductsFetch, products} from "../data/products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {calculateCartQuantity, cart} from "../data/cart.js";

async function loadPage() {
  await loadProductsFetch();
  renderOrderHistory();
}
loadPage();

function renderOrderHistory() {

  let ordersHTML = ``;

  orders.forEach((order) => {

    ordersHTML += `
      <div class="order-container">
              
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${convertDate(order.orderTime)}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatCurrency(order.totalCostCents)}</div>
            </div>
          </div>

          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>

        <div class="order-details-grid js-order-details">
          ${productsListHTML()}
        </div>
      </div>
    `
    function productsListHTML() {
      let productsListHTML = ``;
  
      order.products.forEach((productDetails) => {
        const productId = productDetails.productId;
        const matchingProduct = getProducts(productId);

        productsListHTML += `
          <div class="product-image-container">
            <img src="${matchingProduct.image}">
          </div>

          <div class="product-details">
            <div class="product-name">
              ${matchingProduct.name}
            </div>
            <div class="product-delivery-date">
              Arriving on: ${convertDate(productDetails.estimatedDeliveryTime)}
            </div>
            <div class="product-quantity">
              Quantity: ${productDetails.quantity}
            </div>
            <button class="buy-again-button button-primary">
              <img class="buy-again-icon" src="images/icons/buy-again.png">
              <span class="buy-again-message">Buy it again</span>
            </button>
          </div>

          <div class="product-actions">
            <a href="tracking.html?orderId=123&productId=456">
              <button class="track-package-button button-secondary">
                Track package
              </button>
            </a>
          </div>
        `
      })

      return productsListHTML;
    }
  });

  document.querySelector('.js-cart-quantity').innerHTML = calculateCartQuantity();

  document.querySelector('.js-orders-grid').innerHTML = ordersHTML;
}

function convertDate(date) {
  const dateString = dayjs(date).format('MMMM D');
  return dateString;
}