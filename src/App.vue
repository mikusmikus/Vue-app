<script setup lang="ts">
import { RouterView, RouterLink } from "vue-router";
</script>

<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
    <RouterLink to="/about">About</RouterLink>
    <RouterLink to="/characters">Characters</RouterLink>
    <RouterLink to="/form">Form</RouterLink>
  </nav>
  <RouterView />
</template>

<style>
nav {
  display: flex;
  column-gap: 8px;
}
</style>
