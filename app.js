// count functionality = increment and decrement functions for the buttons.

let count1 = 0;
let count2 = 0;
let count3 = 0;
let count4 = 0;
let count5 = 0;

let productCount1 = document.getElementById("product-count-1");
let productCount2 = document.getElementById("product-count-2");
let productCount3 = document.getElementById("product-count-3");
let productCount4 = document.getElementById("product-count-4");
let productCount5 = document.getElementById("product-count-5");

let totalPrice = 0; // Add totalPrice variable

// increment functions
function increment1() {
  count1++;
  productCount1.innerText = count1;
  addToCart("Coffee Latte", 4.99, count1); // Add to cart dynamically
}

function increment2() {
  count2++;
  productCount2.innerText = count2;
  addToCart("Capuccino", 3.49, count2); // Add to cart dynamically
}

function increment3() {
  count3++;
  productCount3.innerText = count3;
  addToCart("Americano", 2.2, count3); // Add to cart dynamically
}

function increment4() {
  count4++;
  productCount4.innerText = count4;
  addToCart("Iced Caramel Latte", 5.3, count4); // Add to cart dynamically
}

function increment5() {
  count5++;
  productCount5.innerText = count5;
  addToCart("Cold Brew", 3.3, count5); // Add to cart dynamically
}

// decrement functions
function decrement1() {
  if (count1 > 0) {
    count1--;
    productCount1.innerText = count1;
    removeFromCart("Coffee Latte");
  }
}

function decrement2() {
  if (count2 > 0) {
    count2--;
    productCount2.innerText = count2;
    removeFromCart("Capuccino");
  }
}

function decrement3() {
  if (count3 > 0) {
    count3--;
    productCount3.innerText = count3;
    removeFromCart("Americano");
  }
}

function decrement4() {
  if (count4 > 0) {
    count4--;
    productCount4.innerText = count4;
    removeFromCart("Iced Caramel Latte");
  }
}

function decrement5() {
  if (count5 > 0) {
    count5--;
    productCount5.innerText = count5;
    removeFromCart("Cold Brew");
  }
}

// Function to add a product to the cart
function addToCart(productName, price, count) {
  // Find the cart container
  let cartContainer = document.querySelector(".cart-items");

  // Create a new cart item
  let cartItem = document.createElement("div");
  cartItem.classList.add("cart-item");

  // Set the HTML content of the cart item
  cartItem.innerHTML = `
    <h2 class="text-lg font-semibold item-name">${productName}</h2>
    <div class="flex justify-between items-center mb-2">
      <div class="quantity">-</div>
      <div class="quantity-value">${count}</div>
      <div class="price">$${(price * count).toFixed(2)}</div>
    </div>
  `;

  // Append the cart item to the cart container
  cartContainer.appendChild(cartItem);

  // Update total price
  totalPrice += price * count;
  document.getElementById("total-price").innerText =
    "$" + totalPrice.toFixed(2);
}

function validateSelection() {
  if (
    count1 === 0 &&
    count2 === 0 &&
    count3 === 0 &&
    count4 === 0 &&
    count5 === 0
  ) {
    document.getElementById("error-message").innerText =
      "Please select a product before proceeding.";
    document.getElementById("error-message").style.color = "red";
    return false; // to indicate that the user didn't select a product.
  }
  return true; // user selected
}
