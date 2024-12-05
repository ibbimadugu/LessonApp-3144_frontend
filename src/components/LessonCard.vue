<template>
  <div
    class="lesson-card border rounded-lg p-4 shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl">
    <div
      class="lesson-image-container mb-4 w-full h-48 overflow-hidden rounded-lg">
      <img
        v-if="lesson.image"
        :src="lesson.image"
        alt="Lesson image"
        class="w-full h-full object-cover" />
    </div>

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
</template>

<script>
export default {
  name: "LessonCard",
  props: {
    lesson: Object,
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
  methods: {
    addToCart() {
      if (this.lesson.spaces > 0) {
        this.lesson.spaces--; // Decrease space count
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const existingLesson = cart.find((item) => item.id === this.lesson.id);

        if (existingLesson) {
          existingLesson.quantity++;
        } else {
          cart.push({ ...this.lesson, quantity: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        this.$emit("update-cart", cart);
      }
    },
  },
};
</script>
