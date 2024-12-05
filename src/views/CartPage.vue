<template>
  <div class="cart-page">
    <h2 class="text-2xl font-bold mb-4">Your Cart</h2>
    <div v-if="cart.length === 0" class="text-center text-gray-500">
      Your cart is empty.
    </div>
    <div v-else>
      <div
        v-for="(lesson, index) in cart"
        :key="index"
        class="mb-4 p-4 border-b">
        <p>{{ lesson.subject }}</p>
        <p>${{ lesson.price }}</p>
        <button @click="removeFromCart(index)" class="text-red-500">
          Remove
        </button>
      </div>
      <div class="mt-4">
        <p class="font-semibold">Total: ${{ total }}</p>
        <router-link
          to="/"
          class="block mt-4 py-2 px-4 bg-green-500 text-white rounded-lg text-center">
          Proceed to Checkout
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cart: [],
    };
  },
  computed: {
    total() {
      return this.cart.reduce(
        (sum, lesson) => sum + parseFloat(lesson.price),
        0
      );
    },
  },
  methods: {
    removeFromCart(index) {
      const lesson = this.cart[index];
      if (lesson.quantity > 1) {
        lesson.quantity--; // Decrease quantity if more than 1
      } else {
        this.cart.splice(index, 1); // Remove item from cart
      }
      // Update the lessons in localStorage
      const lessons = JSON.parse(localStorage.getItem("lessons")) || [];
      const lessonIndex = lessons.findIndex((l) => l.id === lesson.id);
      if (lessonIndex !== -1) {
        lessons[lessonIndex].spaces++; // Increment spaces
      }
      localStorage.setItem("lessons", JSON.stringify(lessons)); // Save lessons
      localStorage.setItem("cart", JSON.stringify(this.cart)); // Save updated cart
    },
  },
  created() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
  },
};
</script>

<style scoped>
.cart-page {
  padding: 20px;
}
</style>
