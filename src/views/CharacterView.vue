<template>
  <MainContainer>
    <button @click="router.back()">Go back</button>
    <div v-if="state.isLoading">
      <div class="lds-roller">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
    <div v-if="state.error">Error...</div>

    <div v-if="state.character">
      <div class="top-section">
        <h1 class="heading">{{ state.character.name }}</h1>
        <div class="image-wrapper">
          <img class="image" :src="state.character.image" alt="" />
          <p class="status">{{ state.character.status }}</p>
        </div>
      </div>
      <div>
        <p class="gender" v-if="state.character.gender">
          Gender: {{ state.character.gender }}
        </p>
        <p class="location">Location: {{ state.character.location.name }}</p>
        <p class="type" v-if="state.character.type">
          Type: {{ state.character.type }}
        </p>
      </div>
    </div>
  </MainContainer>
</template>

<script lang="ts" setup>
import type { Character } from "@/types/character";
import axios from "axios";
import MainContainer from "../components/MainContainer.vue";
import { onMounted, reactive } from "vue";
import { useRoute, useRouter } from "vue-router";

const route = useRoute();
const router = useRouter();
console.log("router", router);

interface SingleCharacter extends Character {
  created: Date;
  location: {
    name: string;
    url: string;
  };
}

const id = route.params.id;

const url = "https://rickandmortyapi.com/api/character/";

const state = reactive({
  isLoading: false,
  character: null as SingleCharacter | null,
  error: "",
});

const fetchSingleCharacter = async () => {
  try {
    state.isLoading = true;
    const { data } = await axios.get(`${url}${id}`);
    console.log("data", data);

    state.character = data;
    state.isLoading = false;
  } catch (error) {
    state.isLoading = false;
  }
};

onMounted(() => {
  fetchSingleCharacter();
});
</script>

<style lang="scss" scoped>
.top-section {
  display: flex;
  flex-direction: column;
  row-gap: steps(2);

  @include for-at-least($breakpoint-lg) {
    flex-direction: row-reverse;
    column-gap: steps(4);
    align-items: center;
    justify-content: start;
  }
}

.image-wrapper {
  position: relative;
  aspect-ratio: 1/1;
  .image {
    width: 100%;
    max-width: 300px;
  }
  .status {
    position: absolute;
    background-color: darkcyan;
    color: white;
    padding: steps(1) steps(2);
    right: steps(4);
    top: steps(4);
  }
}

.heading {
  font-size: steps(8);
  line-height: steps(10);

  @include for-at-least($breakpoint-md) {
    font-size: steps(12);
    line-height: steps(14);
  }

  @include for-at-least($breakpoint-lg) {
    font-size: steps(16);
    line-height: steps(20);
  }
}

p {
  color: #1b1a1a;
  font-size: 20px;
  font-style: italic;
}
.gender,
.type {
  background-color: aquamarine;
}
</style>
