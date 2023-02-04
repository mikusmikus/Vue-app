<template>
  <div class="container">
    <slot></slot>

    <div>
      <slot name="footer"></slot>
    </div>
  </div>
</template>

<style scoped>
.container {
  padding: 0 24px;
  max-width: 1200px;
  margin: 0 auto;
}
</style>
