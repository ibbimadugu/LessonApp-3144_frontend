<template>
  <div class="home">
    <LessonsList />
    <div style="display: flex; justify-content: center; align-items: center">
      <CartButton />
    </div>
  </div>
</template>

<script>
import LessonsList from "@/components/LessonsList.vue";
import CartButton from "../components/CartButton.vue";

export default {
  name: "Home",
  components: {
    LessonsList,
    CartButton,
  },
};
</script>

<style scoped>
.home {
  padding: 20px;
}
</style>
