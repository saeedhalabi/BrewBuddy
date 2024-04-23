// count functionality = increment and decrement functions for the buttons.

// Initializing count variables for each product
let count6 = 0; // Count for product 1
let count7 = 0; // Count for product 2
let count8 = 0; // Count for product 3
let count9 = 0; // Count for product 4
let count10 = 0; // Count for product 5

// Getting references to HTML elements representing product counts
let productCount6 = document.getElementById("product-count-6"); // Element for product 1 count
let productCount7 = document.getElementById("product-count-7"); // Element for product 2 count
let productCount8 = document.getElementById("product-count-8"); // Element for product 3 count
let productCount9 = document.getElementById("product-count-9"); // Element for product 4 count
let productCount10 = document.getElementById("product-count-10"); // Element for product 5 count

let totalPrice = 0; // Add totalPrice variable

// Update cart count function
function updateCartCount() {
  // set the total count
  let totalCount = count6 + count7 + count8 + count9 + count10;
  // update the total count
  document.getElementById("cart-count").innerText = totalCount;
}

// Functions for handling increment and decrement of product counts and updating the cart dynamically.
// Each increment function increases the count for a specific product, updates its corresponding UI element,
// adds the product to the cart with its price and quantity, and updates the overall cart count.
// Decrement functions decrease the count for each product.

function increment6() {
  count6++;
  productCount6.innerText = count6;
  addToCart("Arabian Mocha", 2.99, count6); // Add to cart dynamically
  updateCartCount();
}

function increment7() {
  count7++;
  productCount7.innerText = count7;
  addToCart("Vanilla Latte", 5.29, count7); // Add to cart dynamically
  updateCartCount();
}

function increment8() {
  count8++;
  productCount8.innerText = count8;
  addToCart("Flat White", 4.45, count8); // Add to cart dynamically
  updateCartCount();
}

function increment9() {
  count9++;
  productCount9.innerText = count9;
  addToCart("Espressso", 1.25, count9); // Add to cart dynamically
  updateCartCount();
}

function increment10() {
  count10++;
  productCount10.innerText = count10;
  addToCart("Frappuccino®", 6.39, count10); // Add to cart dynamically
  updateCartCount();
}

// decrement functions
function decrement6() {
  count6--;
  productCount6.innerText = count6;
}

function decrement7() {
  count7--;
  productCount7.innerText = count7;
}

function decrement8() {
  count8--;
  productCount8.innerText = count8;
}

function decrement9() {
  count9--;
  productCount9.innerText = count9;
}

function decrement10() {
  count10--;
  productCount10.innerText = count10;
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

function validateSelection2() {
  if (
    count6 === 0 &&
    count7 === 0 &&
    count8 === 0 &&
    count9 === 0 &&
    count10 === 0
  ) {
    document.getElementById("error-message").innerText =
      "Please select a product before proceeding.";
    document.getElementById("error-message").style.color = "red";
    return false; // to indicate that the user didn't select a product.
  }
  return true; // user selected
}
