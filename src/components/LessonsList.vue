<template>
  <div>
    <!-- Filter component for sorting -->
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
        <LessonCard :lesson="lesson" />
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from "vue";
import LessonCard from "./LessonCard.vue";
import LessonFilter from "./LessonFilter.vue";
import { fetchLessons } from "../services/lessonService"; // Import the fetchLessons function

export default {
  name: "LessonsList",
  components: {
    LessonCard,
    LessonFilter,
  },
  setup() {
    const lessons = ref([]);
    const sortAttribute = ref("subject"); // Default sort attribute
    const sortOrder = ref("asc"); // Default sort order (ascending)

    // Fetch lessons from API
    const fetchLessonsData = async () => {
      try {
        lessons.value = await fetchLessons(); // Fetch lessons using the service
      } catch (error) {
        console.error("Error fetching lessons:", error);
      }
    };

    // Fetch lessons when the component is mounted
    onMounted(() => {
      fetchLessonsData();
    });

    // Sorting logic
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

    return {
      lessons,
      sortedLessons,
      sortAttribute,
      sortOrder,
      updateSort,
    };
  },
};
</script>
