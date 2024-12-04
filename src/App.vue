<script setup>
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <div class="wrapper">
      <HelloWorld msg="You did it!" />

      <nav class="bg-gray-800 text-white p-4 flex justify-between">
        <RouterLink
          to="/"
          class="text-white hover:text-gray-300 transition-colors duration-300">
          Home
        </RouterLink>
        <RouterLink
          to="/about"
          class="text-white hover:text-gray-300 transition-colors duration-300">
          About
        </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
