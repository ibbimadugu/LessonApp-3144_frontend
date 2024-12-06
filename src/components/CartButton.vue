<script>
export default {
  name: "CartButton",
  data() {
    return {
      cartLength: this.getCartLengthFromLocalStorage(), // Initialize cart length from localStorage
    };
  },
  methods: {
    // Method to redirect to the cart page
    navigateToCart() {
      this.$router.push("/cart"); // Replace with your actual route for the cart page
    },
    // Method to retrieve the cart length from localStorage
    getCartLengthFromLocalStorage() {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      return cart.length;
    },
    // Method to add item to the cart and update localStorage
    addToCart(item) {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(item);
      localStorage.setItem("cart", JSON.stringify(cart));
      this.cartLength = cart.length; // Update cart length
    },
    // Method to remove item from the cart and update localStorage
    removeFromCart(itemId) {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart = cart.filter((item) => item.id !== itemId); // Remove the item by ID
      localStorage.setItem("cart", JSON.stringify(cart));
      this.cartLength = cart.length; // Update cart length
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
      class="py-2 px-8 rounded-lg transition-colors duration-300 ease-in-out">
      View Cart
    </button>
  </div>
</template>

<style scoped>
/* Custom styling if needed */
</style>
