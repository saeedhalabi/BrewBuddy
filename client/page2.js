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
  addToCart("Espresso", 1.25, count9); // Add to cart dynamically
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
  if (count6 > 0) {
    count6--;
    productCount6.innerText = count6;
    removeCartItem("Arabian Mocha");
    updateTotalPrice();
    updateCartCount();
  }
}

function decrement7() {
  if (count7 > 0) {
    count7--;
    productCount7.innerText = count7;
    removeCartItem("Vanilla Latte");
    updateTotalPrice();
    updateCartCount();
  }
}

function decrement8() {
  if (count8 > 0) {
    count8--;
    productCount8.innerText = count8;
    removeCartItem("Flat White");
    updateTotalPrice();
    updateCartCount();
  }
}

function decrement9() {
  if (count9 > 0) {
    count9--;
    productCount9.innerText = count9;
    removeCartItem("Espresso");
    updateTotalPrice();
    updateCartCount();
  }
}

function decrement10() {
  if (count10 > 0) {
    count10--;
    productCount10.innerText = count10;
    removeCartItem("Frappuccino®");
    updateTotalPrice();
    updateCartCount();
  }
}

// Function to add a product to the cart
function addToCart(productName, price, count) {
  // Find the cart container element
  let cartContainer = document.querySelector(".cart-items");

  // Variable to hold the existing cart item if found
  let existingCartItem = null;

  // Get all cart items
  let cartItems = cartContainer.children;

  // Loop through each cart item to check if it matches the product name
  for (let i = 0; i < cartItems.length; i++) {
    // Check if the current cart item's product name matches the given product name
    if (cartItems[i].querySelector(".item-name").innerText === productName) {
      // If it matches, store the existing cart item and break the loop
      existingCartItem = cartItems[i];
      break;
    }
  }

  // If the item already exists in the cart
  if (existingCartItem) {
    // Get the element that shows the quantity
    let quantityElement = existingCartItem.querySelector(".quantity-value");

    // Increment the quantity by 1
    let newCount = parseInt(quantityElement.innerText) + 1;

    // Update the displayed quantity
    quantityElement.innerText = newCount;

    // Get the element that shows the price
    let priceElement = existingCartItem.querySelector(".price");

    // Update the price based on the new quantity
    priceElement.innerText = "$" + (price * newCount).toFixed(2);
  } else {
    // If the item does not exist in the cart, create a new cart item
    let cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    // Set the HTML content of the new cart item
    cartItem.innerHTML = `
      <h2 class="text-lg font-semibold item-name">${productName}</h2>
      <div class="flex justify-between items-center mb-2">
        <div class="quantity">-</div>
        <div class="quantity-value">${count}</div>
        <div class="price">$${(price * count).toFixed(2)}</div>
      </div>
    `;

    // Append the new cart item to the cart container
    cartContainer.appendChild(cartItem);
  }

  // Update the total price by adding the price of the newly added item
  totalPrice += price;

  // Display the updated total price
  document.getElementById("total-price").innerText =
    "$" + totalPrice.toFixed(2);
}

function validateSelection() {
  // Count the total number of selected items
  let totalSelectedItems = count6 + count7 + count8 + count9 + count10;

  // Check if at least one item is selected
  if (totalSelectedItems === 0) {
    // Display error message if no item is selected
    document.getElementById("error-message").innerText =
      "Please select a product before proceeding.";
    document.getElementById("error-message").style.color = "red";
    return false;
  }

  // Proceed to the validation page
  window.location.href = "validation.html";
  return true;
}

// Define the removeCartItem function which takes a productName parameter
function removeCartItem(productName) {
  // Get all cart items from the DOM
  let cartItems = document.querySelectorAll(".cart-item");

  // Iterate over each cart item
  cartItems.forEach(item => {
    // Check if the product name of the current cart item matches the specified productName
    if (item.querySelector(".item-name").innerText === productName) {
      // Get the quantity element and retrieve the current count
      // parseInt to retreive the text content directly to a number
      let quantityElement = item.querySelector(".quantity-value");
      let count = parseInt(quantityElement.innerText);

      if (count > 1) {
        // If there is more than one item, decrement the count
        quantityElement.innerText = count - 1;

        // get the price element specific to the current item
        let priceElement = item.querySelector(".price");

        // convert from string to a floating point number using the 'parseFloat' function
        let price = parseFloat(priceElement.innerText.slice(1)); // this will remove the '$' sign, resulting only the price

        // calculate the new price
        let newPrice = (price / count) * (count - 1);

        // update the price specific to the current item
        priceElement.innerText = "$" + newPrice.toFixed(2);
      } else {
        // If the count is 1, remove the cart item from the DOM
        item.remove();
      }
    }
  });
  updateTotalPrice();
}

function updateTotalPrice() {
  // initialize a variable called total and set it to 0
  let total = 0;
  // get the HTML of the cart items
  let cartItems = document.querySelectorAll(".cart-item");
  // loop through each item in the HTML
  cartItems.forEach(item => {
    // get the HTML class of the price element
    let priceElement = item.querySelector(".price");

    let price = parseFloat(priceElement.innerText.slice(1)); // Remove "$" sign and parse float
    // Accumulate the price of the current item to the total price
    total += price;
  });
  // Update the displayed total price with the calculated total, formatted with two decimal places and prefixed with a dollar sign
  document.getElementById("total-price").innerText = "$" + total.toFixed(2);
}
