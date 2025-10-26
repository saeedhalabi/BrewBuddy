// count functionality = increment and decrement functions for the buttons.

// Initialize product counts from cart state
const cartItems = CartManager.getCartItems();
let count11 =
  cartItems.find(item => item.name === "Nitro Cold Brew")?.quantity || 0;
let count12 =
  cartItems.find(item => item.name === "Blonde Roast")?.quantity || 0;
let count13 =
  cartItems.find(item => item.name === "Turkish Coffee")?.quantity || 0;
let count14 =
  cartItems.find(item => item.name === "Mocha Cookie Crumble")?.quantity || 0;

// Getting references to HTML elements representing product counts
let productCount11 = document.getElementById("product-count-11");
let productCount12 = document.getElementById("product-count-12");
let productCount13 = document.getElementById("product-count-13");
let productCount14 = document.getElementById("product-count-14");

// Initialize the UI with stored values
if (productCount11) productCount11.innerText = count11;
if (productCount12) productCount12.innerText = count12;
if (productCount13) productCount13.innerText = count13;
if (productCount14) productCount14.innerText = count14;

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
  CartManager.addItem("Nitro Cold Brew", 6.99, count11);
  productCount11.innerText = count11;
}

function increment12() {
  count12++;
  CartManager.addItem("Blonde Roast", 4.56, count12);
  productCount12.innerText = count12;
}

function increment13() {
  count13++;
  CartManager.addItem("Turkish Coffee", 2.45, count13);
  productCount13.innerText = count13;
}

function increment14() {
  count14++;
  CartManager.addItem("Affogato", 4.0, count14);
  productCount14.innerText = count14;
}

// decrement functions
function decrement11() {
  if (count11 > 0) {
    count11--;
    productCount11.innerText = count11;
    CartManager.updateItemQuantity("Nitro Cold Brew", count11);
  }
}

function decrement12() {
  if (count12 > 0) {
    count12--;
    productCount12.innerText = count12;
    CartManager.updateItemQuantity("Blonde Roast", count12);
  }
}

function decrement13() {
  if (count13 > 0) {
    count13--;
    productCount13.innerText = count13;
    CartManager.updateItemQuantity("Turkish Coffee", count13);
  }
}

function decrement14() {
  if (count14 > 0) {
    count14--;
    productCount14.innerText = count14;
    CartManager.updateItemQuantity("Affogato", count14);
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
  let totalSelectedItems = count11 + count12 + count13 + count14;

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
