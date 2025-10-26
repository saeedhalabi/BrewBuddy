// Shared cart functionality
const CartManager = {
  // Get all cart items from localStorage
  getCartItems() {
    const cartItems = localStorage.getItem("cartItems");
    return cartItems ? JSON.parse(cartItems) : [];
  },

  // Save cart items to localStorage
  saveCartItems(items) {
    localStorage.setItem("cartItems", JSON.stringify(items));
  },

  // Add item to cart
  addItem(productName, price, quantity = 1) {
    const items = this.getCartItems();
    const existingItem = items.find(item => item.name === productName);

    if (existingItem) {
      existingItem.quantity = quantity;
      existingItem.total = price * quantity;
    } else {
      items.push({
        name: productName,
        price: price,
        quantity: quantity,
        total: price * quantity,
      });
    }

    this.saveCartItems(items);
    this.updateUI();
  },

  // Remove item from cart
  removeItem(productName) {
    const items = this.getCartItems();
    const itemIndex = items.findIndex(item => item.name === productName);

    if (itemIndex > -1) {
      items.splice(itemIndex, 1);
      this.saveCartItems(items);
    }
    this.updateUI();
  },

  // Update item quantity
  updateItemQuantity(productName, quantity) {
    const items = this.getCartItems();
    const item = items.find(item => item.name === productName);

    if (item) {
      item.quantity = quantity;
      item.total = item.price * quantity;
      this.saveCartItems(items);
      this.updateUI();
    }
  },

  // Get total count of items
  getTotalCount() {
    return this.getCartItems().reduce(
      (total, item) => total + item.quantity,
      0
    );
  },

  // Get total price
  getTotalPrice() {
    return this.getCartItems().reduce((total, item) => total + item.total, 0);
  },

  // Update the UI with current cart state
  updateUI() {
    const cartContainer = document.querySelector(".cart-items");
    const cartCountElement = document.getElementById("cart-count");
    const totalPriceElement = document.getElementById("total-price");

    if (cartContainer) {
      cartContainer.innerHTML = "";
      this.getCartItems().forEach(item => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");
        cartItem.innerHTML = `
                    <h2 class="text-lg font-semibold item-name">${
                      item.name
                    }</h2>
                    <div class="flex justify-between items-center mb-2">
                        <div class="quantity">-</div>
                        <div class="quantity-value">${item.quantity}</div>
                        <div class="price">$${item.total.toFixed(2)}</div>
                    </div>
                `;
        cartContainer.appendChild(cartItem);
      });
    }

    if (cartCountElement) {
      cartCountElement.innerText = this.getTotalCount();
    }

    if (totalPriceElement) {
      totalPriceElement.innerText = "$" + this.getTotalPrice().toFixed(2);
    }

    // Update product counts on the current page
    this.getCartItems().forEach(item => {
      const productCountElement = document.querySelector(
        `[data-product-name="${item.name}"]`
      );
      if (productCountElement) {
        productCountElement.innerText = item.quantity;
      }
    });
  },
};

// Initialize cart UI when the page loads
document.addEventListener("DOMContentLoaded", () => {
  CartManager.updateUI();
});
