<template>
  <div class="home">
    <LessonsList />
  </div>
</template>

<script>
import LessonsList from "@/components/LessonsList.vue";

export default {
  name: "Home",
  components: {
    LessonsList,
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>
