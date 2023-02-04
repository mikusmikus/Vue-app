<template>
  <router-link :to="`/characters/${props.id}`">
    <article class="article">
      <img :src="props.image" :alt="props.name" class="image" />
      <div class="info">
        <h3 class="title">
          {{ props.name }}
          {{
            props.id == 1
              ? "Long titlte as da ong titlte as das daong titlte as das das da sda d"
              : ""
          }}
        </h3>
        <div v-if="props.gender">{{ props.gender }}</div>
        <p v-if="props.type">{{ props.type }}</p>
        <p
          v-if="props.status"
          class="status"
          :class="{
            alive: props.status === 'Alive',
            dead: props.status === 'Dead',
            unknown: props.status === 'unknown',
          }"
        >
          {{ props.status }}
        </p>
      </div>
    </article>
  </router-link>
</template>

<script setup lang="ts">
import type { Character } from "@/types/character";
import { useRouter } from "vue-router";

const router = useRouter();

const props = defineProps<Character>();
</script>

<style lang="scss" scoped>
.article {
  display: flex;
  flex-direction: column;
  border: 1px solid red;
  row-gap: steps(2);
  height: 100%;

  @include for-at-least($breakpoint-sm) {
    flex-direction: row;
    column-gap: steps(2);
  }

  &:hover {
    .image {
      transform: scale(120%);
    }
  }
}

.status {
  display: inline-block;
  padding: steps(1) steps(2);
  border-radius: steps(1);
  text-align: center;
}
.alive {
  background-color: green;
}
.dead {
  background-color: red;
  color: $color-primary;
}
.unknown {
  background-color: blue;
  color: $color-primary;
}

.image {
  width: 100%;
  transition: 0.3s transform ease-in-out;
  object-fit: cover;
  @include for-at-least($breakpoint-sm) {
    width: 40%;
    max-width: 200px;
  }
}
.info {
  display: flex;
  flex-direction: column;
  row-gap: steps(2);
  @include for-at-least($breakpoint-sm) {
    justify-content: center;
    align-items: flex-start;
  }
}

.title {
}
</style>
