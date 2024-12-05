<template>
  <div class="lesson-filter my-4 ml-4 flex items-center gap-4">
    <!-- Sort attribute dropdown -->
    <select
      v-model="selectedAttribute"
      @change="updateSortOptions"
      class="p-2 border rounded">
      <option value="subject">Subject</option>
      <option value="location">Location</option>
      <option value="price">Price</option>
      <option value="spaces">Spaces</option>
    </select>

    <!-- Sort order toggle -->
    <select
      v-model="selectedOrder"
      @change="updateSortOptions"
      class="p-2 border rounded">
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  </div>
</template>

<script>
export default {
  name: "LessonFilter",
  props: {
    sortAttribute: String,
    sortOrder: String,
  },
  emits: ["update-sort"],
  data() {
    return {
      selectedAttribute: this.sortAttribute,
      selectedOrder: this.sortOrder,
    };
  },
  methods: {
    updateSortOptions() {
      this.$emit("update-sort", this.selectedAttribute, this.selectedOrder);
    },
  },
};
</script>

<style scoped>
.lesson-filter select {
  min-width: 150px;
}
</style>
