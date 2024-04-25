// count functionality = increment and decrement functions for the buttons.

// Initializing count variables for each product
let count11 = 0; // Count for product 1
let count12 = 0; // Count for product 2
let count13 = 0; // Count for product 3
let count14 = 0; // Count for product 4

// Getting references to HTML elements representing product counts
let productCount11 = document.getElementById("product-count-11"); // Element for product 1 count
let productCount12 = document.getElementById("product-count-12"); // Element for product 2 count
let productCount13 = document.getElementById("product-count-13"); // Element for product 3 count
let productCount14 = document.getElementById("product-count-14"); // Element for product 4 count

let totalPrice = 0; // Add totalPrice variable

// Update cart count function
function updateCartCount() {
  // set the total count
  let totalCount = count11 + count12 + count13 + count14;
  // update the total count
  document.getElementById("cart-count").innerText = totalCount;
}

// Functions for handling increment and decrement of product counts and updating the cart dynamically.
// Each increment function increases the count for a specific product, updates its corresponding UI element,
// adds the product to the cart with its price and quantity, and updates the overall cart count.
// Decrement functions decrease the count for each product.

function increment11() {
  count11++;
  productCount11.innerText = count11;
  addToCart("Nitro Cold Brew", 6.99, count11); // Add to cart dynamically
  updateCartCount();
}

function increment12() {
  count12++;
  productCount12.innerText = count12;
  addToCart("Blonde Roast", 4.56, count12); // Add to cart dynamically
  updateCartCount();
}

function increment13() {
  count13++;
  productCount13.innerText = count13;
  addToCart("Turkish Coffee", 2.45, count13); // Add to cart dynamically
  updateCartCount();
}

function increment14() {
  count14++;
  productCount14.innerText = count14;
  addToCart("Affogato", 4.0, count14); // Add to cart dynamically
  updateCartCount();
}

// decrement functions
function decrement11() {
  if (count11 > 0) {
    count11--;
    productCount11.innerText = count11;
    removeCartItem("Nitro Cold Brew"); // Remove one item from the cart
    updateTotalPrice(); // Update the total price
    updateCartCount();
  }
}

function decrement12() {
  if (count12 > 0) {
    count12--;
    productCount12.innerText = count12;
    removeCartItem("Blonde Roast");
    updateTotalPrice();
    updateCartCount();
  }
}

function decrement13() {
  if (count13 > 0) {
    count13--;
    productCount13.innerText = count13;
    removeCartItem("Turkish Coffee");
    updateTotalPrice();
    updateCartCount();
  }
}

function decrement14() {
  if (count14 > 0) {
    count14--;
    productCount14.innerText = count14;
    removeCartItem("Affogato");
    updateTotalPrice();
    updateCartCount();
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
  // Count the total number of selected items
  let totalSelectedItems = count10 + count11 + count12 + count13 + count14;

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
