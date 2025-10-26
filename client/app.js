// count functionality = increment and decrement functions for the buttons.

// Initialize product counts from cart state
const cartItems = CartManager.getCartItems();
let count1 =
  cartItems.find(item => item.name === "Coffee Latte")?.quantity || 0;
let count2 = cartItems.find(item => item.name === "Capuccino")?.quantity || 0;
let count3 = cartItems.find(item => item.name === "Americano")?.quantity || 0;
let count4 =
  cartItems.find(item => item.name === "Iced Caramel Latte")?.quantity || 0;
let count5 = cartItems.find(item => item.name === "Cold Brew")?.quantity || 0;

// Getting references to HTML elements representing product counts
let productCount1 = document.getElementById("product-count-1");
let productCount2 = document.getElementById("product-count-2");
let productCount3 = document.getElementById("product-count-3");
let productCount4 = document.getElementById("product-count-4");
let productCount5 = document.getElementById("product-count-5");

// Initialize the UI with stored values
if (productCount1) productCount1.innerText = count1;
if (productCount2) productCount2.innerText = count2;
if (productCount3) productCount3.innerText = count3;
if (productCount4) productCount4.innerText = count4;
if (productCount5) productCount5.innerText = count5;

let totalPrice = 0; // Add totalPrice variable

// Update cart count function
function updateCartCount() {
  // set the total count
  let totalCount = count1 + count2 + count3 + count4 + count5;
  // update the total count
  document.getElementById("cart-count").innerText = totalCount;
}

// increment functions
function increment1() {
  count1++;
  CartManager.addItem("Coffee Latte", 4.99, count1);
  productCount1.innerText = count1;
}

function increment2() {
  count2++;
  CartManager.addItem("Capuccino", 3.49, count2);
  productCount2.innerText = count2;
}

function increment3() {
  count3++;
  localStorage.setItem("count3", count3);
  productCount3.innerText = count3;
  addToCart("Americano", 2.2, count3);
  updateCartCount();
}

function increment4() {
  count4++;
  localStorage.setItem("count4", count4);
  productCount4.innerText = count4;
  addToCart("Iced Caramel Latte", 5.3, count4);
  updateCartCount();
}

function increment5() {
  count5++;
  localStorage.setItem("count5", count5);
  productCount5.innerText = count5;
  addToCart("Cold Brew", 3.3, count5);
  updateCartCount();
}

// decrement functions
function decrement1() {
  if (count1 > 0) {
    count1--;
    localStorage.setItem("count1", count1);
    productCount1.innerText = count1;
    removeCartItem("Coffee Latte");
    updateCartCount();
    updateTotalPrice();
  }
}

function decrement2() {
  if (count2 > 0) {
    count2--;
    localStorage.setItem("count2", count2);
    productCount2.innerText = count2;
    removeCartItem("Capuccino");
    updateCartCount();
    updateTotalPrice();
  }
}

function decrement3() {
  if (count3 > 0) {
    count3--;
    localStorage.setItem("count3", count3);
    productCount3.innerText = count3;
    removeCartItem("Americano");
    updateCartCount();
    updateTotalPrice();
  }
}

function decrement4() {
  if (count4 > 0) {
    count4--;
    localStorage.setItem("count4", count4);
    productCount4.innerText = count4;
    removeCartItem("Iced Caramel Latte");
    updateCartCount();
    updateTotalPrice();
  }
}

function decrement5() {
  if (count5 > 0) {
    count5--;
    localStorage.setItem("count5", count5);
    productCount5.innerText = count5;
    removeCartItem("Cold Brew");
    updateCartCount();
    updateTotalPrice();
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
  let totalSelectedItems = count1 + count2 + count3 + count4 + count5;

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
