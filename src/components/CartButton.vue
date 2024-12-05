<script>
import {
  getCartLength,
  addItemToCart,
  removeItemFromCart,
} from "../utils/cart"; // Adjust the import path if needed

export default {
  name: "CartButton",
  data() {
    return {
      cartLength: getCartLength(), // Load cart length on component mount
    };
  },
  methods: {
    // Method to redirect to the cart page
    navigateToCart() {
      this.$router.push("/cart"); // Replace with your actual route for the cart page
    },
    addToCart(item) {
      addItemToCart(item); // Add item to the cart
      this.cartLength = getCartLength(); // Update cart length
    },
    removeFromCart(itemId) {
      removeItemFromCart(itemId); // Remove item from the cart
      this.cartLength = getCartLength(); // Update cart length
    },
  },
};
</script>

<template>
  <div>
    <button
      :disabled="cartLength === 0"
      @click="navigateToCart"
      :class="{
        'bg-green-500 text-white': cartLength > 0,
        'bg-gray-300 text-gray-500 cursor-not-allowed': cartLength === 0,
      }"
      class="view-cart-button py-2 my-20 px-8 rounded-lg">
      View Cart
    </button>
  </div>
</template>
