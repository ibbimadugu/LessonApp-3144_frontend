<template>
  <div>
    <LessonFilter
      :sort-attribute="sortAttribute"
      :sort-order="sortOrder"
      @update-sort="updateSort" />

    <div
      class="lesson-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 p-4">
      <div
        v-for="lesson in sortedLessons"
        :key="lesson.id"
        class="lesson-item bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-xl">
        <LessonCard :lesson="lesson" @update-cart="updateCart" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from "vue";
import LessonCard from "./LessonCard.vue";
import LessonFilter from "./LessonFilter.vue";

export default {
  name: "LessonsList",
  components: {
    LessonCard,
    LessonFilter,
  },
  setup() {
    const lessons = ref([
      {
        id: 1,
        subject: "Math",
        location: "London",
        price: "50",
        spaces: 5,
        image: "/images/mathematics.jpg",
      },
      {
        id: 2,
        subject: "Physics",
        location: "Manchester",
        price: "60",
        spaces: 5,
        image: "/images/physics.jpg",
      },
      {
        id: 3,
        subject: "Chemistry",
        location: "Birmingham",
        price: "55",
        spaces: 5,
        image: "/images/chemistry.jpg",
      },
      {
        id: 4,
        subject: "Biology",
        location: "Liverpool",
        price: "65",
        spaces: 5,
        image: "/images/biology.jpg",
      },
      {
        id: 5,
        subject: "English Literature",
        location: "Bristol",
        price: "45",
        spaces: 5,
        image: "/images/english.jpg",
      },
      {
        id: 6,
        subject: "History",
        location: "Edinburgh",
        price: "50",
        spaces: 5,
        image: "/images/history.jpg",
      },
      {
        id: 7,
        subject: "Art History",
        location: "Cardiff",
        price: "40",
        spaces: 5,
        image: "/images/art.jpg",
      },
      {
        id: 8,
        subject: "Geography",
        location: "Glasgow",
        price: "55",
        spaces: 5,
        image: "/images/geography.jpg",
      },
      {
        id: 9,
        subject: "Computer Science",
        location: "Manchester",
        price: "75",
        spaces: 5,
        image: "/images/computer.jpg",
      },
      {
        id: 10,
        subject: "Psychology",
        location: "London",
        price: "65",
        spaces: 5,
        image: "/images/psychology.jpg",
      },
      {
        id: 11,
        subject: "Philosophy",
        location: "Cambridge",
        price: "70",
        spaces: 5,
        image: "/images/philosophy.jpg",
      },
      {
        id: 13,
        subject: "Music Theory",
        location: "Nottingham",
        price: "55",
        spaces: 5,
        image: "/images/music.jpg",
      },
      {
        id: 14,
        subject: "Economics",
        location: "Leeds",
        price: "80",
        spaces: 5,
        image: "/images/economics.jpg",
      },
      {
        id: 16,
        subject: "Law",
        location: "Newcastle",
        price: "85",
        spaces: 5,
        image: "/images/law.jpg",
      },
    ]);

    const sortAttribute = ref("subject");
    const sortOrder = ref("asc");

    const sortedLessons = computed(() => {
      const sorted = [...lessons.value];
      sorted.sort((a, b) => {
        const attrA = a[sortAttribute.value];
        const attrB = b[sortAttribute.value];

        if (typeof attrA === "string") {
          return sortOrder.value === "asc"
            ? attrA.localeCompare(attrB)
            : attrB.localeCompare(attrA);
        } else if (typeof attrA === "number") {
          return sortOrder.value === "asc" ? attrA - attrB : attrB - attrA;
        }
        return 0;
      });

      return sorted;
    });

    const updateSort = (attribute, order) => {
      sortAttribute.value = attribute;
      sortOrder.value = order;
    };

    const updateCart = (cart) => {
      console.log("Cart updated:", cart); // Placeholder for handling cart updates
    };

    return {
      lessons,
      sortedLessons,
      sortAttribute,
      sortOrder,
      updateSort,
      updateCart,
    };
  },
};
</script>
