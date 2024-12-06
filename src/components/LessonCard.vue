<template>
  <div
    class="lesson-card border rounded-lg shadow-lg bg-white transition-transform transform hover:scale-105 hover:shadow-xl">
    <div class="lesson-image-container w-full h-48 overflow-hidden">
      <!-- Display lesson image if available, otherwise fallback to default image -->
      <img
        v-if="lessonImage"
        :src="lessonImage"
        alt="Lesson image"
        class="w-full h-full object-cover" />
      <img v-else src="../assets/default-image.jpg" <!-- Fallback image -- />
      alt="Default Lesson image" class="w-full h-full object-cover" />
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
import art from "../assets/art.jpg";
import biology from "../assets/biology.jpg";
import chemistry from "../assets/chemistry.jpg";
import computer from "../assets/computer.jpg";
import economics from "../assets/economics.jpg";
import engineering from "../assets/engineering.jpg";
import english from "../assets/english.jpg";
import french from "../assets/french.jpg";
import geography from "../assets/geography.jpg";
import history from "../assets/history.jpg";
import law from "../assets/law.jpg";
import mathematics from "../assets/mathematics.jpg";
import music from "../assets/music.jpg";
import philosophy from "../assets/philosophy.jpg";
import physics from "../assets/physics.jpg";
import psychology from "../assets/psychology.jpg";
import defaultImage from "../assets/defaultimg.png"; // Import the default image

export default {
  name: "LessonCard",
  props: {
    lesson: {
      type: Object,
      required: true,
    },
  },
  computed: {
    // Dynamically return the correct image based on the lesson subject
    lessonImage() {
      const images = {
        "art history": art,
        biology,
        chemistry,
        "computer science": computer,
        economics,
        engineering,
        "english literature": english,
        french,
        geography,
        history,
        law,
        math: mathematics,
        philosophy,
        physics,
        psychology,
        "music theory": music,
      };

      return images[this.lesson.subject.toLowerCase()] || defaultImage;
    },
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

<style scoped>
/* Tailwind handles most of the styling, additional tweaks for smoother transition and visuals */
.lesson-card {
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.lesson-card:hover {
  transform: scale(1.05);
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}
</style>
