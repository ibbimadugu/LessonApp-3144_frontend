<template>
  <div class="cart-page max-w-5xl mx-auto p-6">
    <h2 class="text-3xl font-semibold mb-6 text-gray-800">Your Cart</h2>

    <!-- Empty Cart Message -->
    <div v-if="cart.length === 0" class="text-center text-gray-500">
      Your cart is empty.
    </div>

    <!-- Cart Items -->
    <div v-else>
      <div
        v-for="(lesson, index) in cart"
        :key="index"
        class="cart-item flex items-center justify-between p-6 mb-4 border rounded-lg shadow-lg bg-white">
        <!-- Lesson Information -->
        <div class="flex items-center">
          <div
            class="lesson-image-container w-24 h-24 overflow-hidden mr-6 rounded-lg">
            <img
              v-if="lesson.image"
              :src="lesson.image"
              alt="Lesson image"
              class="w-full h-full object-cover" />
          </div>

          <div>
            <h3 class="lesson-title text-xl font-semibold text-gray-800 mb-1">
              {{ lesson.subject }}
            </h3>
            <p class="lesson-location text-sm text-gray-600 mb-2">
              {{ lesson.location }}
            </p>
            <p class="lesson-price text-lg font-semibold text-green-600">
              ${{ lesson.price }}
            </p>
          </div>
        </div>
        <!-- Remove Button -->
        <div class="flex items-center space-x-4">
          <button
            @click="removeFromCart(index)"
            class="text-sm font-semibold bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors duration-300">
            Remove
          </button>
        </div>
      </div>

      <!-- Total, Back to Lessons, and Checkout -->
      <div class="mt-6 flex justify-between items-center">
        <div class="text-right">
          <p class="font-semibold text-xl text-gray-800 mb-4">
            Total: ${{ total }}
          </p>
          <router-link
            to="/checkout"
            class="py-2 px-6 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors duration-300">
            Proceed to Checkout
          </router-link>
        </div>
      </div>
    </div>

    <div style="display: flex; justify-content: center; align-items: center">
      <!-- Back to Lessons Button -->
      <router-link
        to="/"
        class="py-2 px-6 bg-green-500 text-white rounded-lg text-lg font-semibold hover:bg-green-600 transition-colors duration-300">
        Back to Lessons
      </router-link>
    </div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  data() {
    return {
      cart: [],
    };
  },
  computed: {
    total() {
      return this.cart.reduce(
        (sum, lesson) => sum + parseFloat(lesson.price) * lesson.quantity,
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

      // Display notification
      toast(`${lesson.subject} removed from the cart`, {
        type: "error",
        autoClose: 2000,
      });

      // Update lessons in localStorage
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
/* No custom styles here, everything is handled by Tailwind CSS */
</style>
