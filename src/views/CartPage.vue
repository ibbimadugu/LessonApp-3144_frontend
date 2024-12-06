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

      <!-- Total and Checkout Form -->
      <div class="mt-6">
        <p class="font-semibold text-xl text-gray-800 mb-4">
          Total: ${{ total }}
        </p>

        <!-- Checkout Form -->
        <div class="checkout-form space-y-4">
          <div>
            <input
              v-model="name"
              type="text"
              placeholder="Enter your name"
              class="w-full p-3 border rounded-lg"
              :class="{ 'border-red-500': !isNameValid && name !== '' }" />
            <p
              v-if="!isNameValid && name !== ''"
              class="text-red-500 text-sm mt-1">
              Enter a valid name.
            </p>
          </div>

          <div>
            <input
              v-model="phone"
              type="text"
              placeholder="Enter your phone"
              class="w-full p-3 border rounded-lg"
              :class="{ 'border-red-500': !isPhoneValid && phone !== '' }" />
            <p
              v-if="!isPhoneValid && phone !== ''"
              class="text-red-500 text-sm mt-1">
              Enter a valid phone number.
            </p>
          </div>

          <button
            @click="checkout"
            :disabled="!isFormValid"
            class="py-3 px-6 w-full bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors duration-300 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed">
            Checkout
          </button>
        </div>
      </div>
    </div>

    <!-- Back to Lessons Button -->
    <div class="mt-6 text-center">
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
      name: "",
      phone: "",
    };
  },
  computed: {
    total() {
      return this.cart.reduce(
        (sum, lesson) =>
          sum + parseFloat(lesson.price) * (lesson.quantity || 1),
        0
      );
    },
    isNameValid() {
      return /^[A-Za-z\s]+$/.test(this.name);
    },
    isPhoneValid() {
      return /^[0-9]+$/.test(this.phone);
    },
    isFormValid() {
      return this.isNameValid && this.isPhoneValid && this.name && this.phone;
    },
  },
  methods: {
    removeFromCart(index) {
      const lesson = this.cart[index];
      if (lesson.quantity > 1) {
        lesson.quantity--;
      } else {
        this.cart.splice(index, 1);
      }
      toast(`${lesson.subject} removed from the cart`, {
        type: "error",
        autoClose: 2000,
      });

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(this.cart));
    },
    checkout() {
      if (this.isFormValid) {
        toast("Order submitted successfully!", {
          type: "success",
          autoClose: 3000,
        });

        // Clear the cart and form
        this.cart = [];
        this.name = "";
        this.phone = "";
        localStorage.removeItem("cart");
      } else {
        toast("Please fill out the form correctly.", {
          type: "error",
          autoClose: 3000,
        });
      }
    },
  },
  created() {
    this.cart = JSON.parse(localStorage.getItem("cart")) || [];
  },
};
</script>

<style scoped>
/* Tailwind handles most of the styling */
</style>
