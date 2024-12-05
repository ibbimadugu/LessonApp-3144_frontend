<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <nav class="bg-gray-800 text-white p-4 flex">
        <RouterLink
          to="/"
          class="text-white hover:text-gray-300 transition-colors duration-300">
          Home
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
