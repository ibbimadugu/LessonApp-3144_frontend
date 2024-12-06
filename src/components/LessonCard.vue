<template>
  <div
    class="lesson-card border rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl">
    <div class="lesson-image-container w-full h-48 overflow-hidden">
      <img
        v-if="lesson.image"
        :src="'http://localhost:5000/images/' + lesson.image"
        alt="Lesson image"
        class="w-full h-full object-cover" />
    </div>

    <div class="p-4">
      <h3 class="lesson-title font-semibold text-xl text-gray-800 mb-2">
        {{ lesson.subject }}
      </h3>
      <p class="lesson-location text-gray-600 text-sm">{{ lesson.location }}</p>

      <p class="lesson-price text-green-600 font-semibold text-lg mt-2">
        {{ formattedPrice }}
      </p>

      <p class="lesson-availability text-gray-500 text-sm mt-1">
        Spaces left:
        <span :class="lesson.spaces === 0 ? 'text-red-500' : 'text-gray-500'">{{
          lesson.spaces
        }}</span>
      </p>

      <button
        :disabled="lesson.spaces === 0"
        @click="addToCart"
        class="add-to-cart-btn mt-4 w-full bg-green-500 text-white p-2 rounded-lg text-lg transition-colors duration-300 ease-in-out hover:bg-green-600 disabled:bg-gray-400">
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
import { toast } from "vue3-toastify";
import "vue3-toastify/dist/index.css";

export default {
  name: "LessonCard",
  props: {
    lesson: {
      type: Object,
      required: true,
    },
  },
  computed: {
    formattedPrice() {
      const price = parseFloat(this.lesson.price.replace(/[^0-9.-]+/g, ""));
      return new Intl.NumberFormat("en-GB", {
        style: "currency",
        currency: "GBP",
      }).format(price);
    },
  },
  mounted() {
    // Log the lesson object when the component is mounted
    console.log("Lesson data in LessonCard:", this.lesson);
  },
  methods: {
    addToCart() {
      if (this.lesson.spaces > 0) {
        this.lesson.spaces--;
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push({ ...this.lesson, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        this.$emit("update-cart");
        // Display notification
        toast(`${this.lesson.subject} added to the cart!`, {
          type: "success", // Success notification
          autoClose: 2000, // Duration of toast
        });
      }
    },
  },
};
</script>
