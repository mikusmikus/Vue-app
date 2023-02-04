<template>
  <MainContainer>
    <h1 class="heading">Characters list</h1>
    <div>
      <button @click="store.toggleThem">Toggle {{ store.theme }}</button>
    </div>

    <button @click="showWelcome = true">change Welcome</button>
    <div v-if="showWelcome">
      <WelcomeItem />
    </div>

    <div v-if="state.isLoading">Is loading...</div>
    <div v-else-if="state.isError">Something is wrong</div>
    <div v-else>
      <div class="buttonWrapper">
        <button :disabled="page === 1" @click="handlePrevPage">
          Prev page
        </button>
        <button :disabled="page === 42" @click="handleNextPage">
          Next page
        </button>
      </div>
      <ul class="characters-list">
        <li
          v-for="character in visibleCharacters"
          :key="character.id"
          class="characters-item"
        >
          <CharacterCard
            :name="character.name"
            :gender="character.gender"
            :image="character.image"
            :id="character.id"
            :status="character.status"
            :type="character.type"
            class="red"
          />
        </li>
      </ul>
    </div>
    <div class="load-more-wrapper" v-if="visibleCount < totalCharactersCount">
      <button @click="visibleCount = visibleCount + STEP">Load more</button>
    </div>
  </MainContainer>
</template>

<script setup lang="ts">
import { reactive, ref, computed, watch } from "vue";
import { onMounted } from "vue";
import axios from "axios";
import type { Character } from "../types/character";
import MainContainer from "../components/MainContainer.vue";
import CharacterCard from "../components/CharacterCard.vue";

import { defineAsyncComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
import { store } from "../globalState";

const WelcomeItem = defineAsyncComponent(
  () => import("../components/WelcomeItem.vue")
);

const showWelcome = ref(false);

const url = ref("https://rickandmortyapi.com/api/character");
const DEFAULT_VISIBLE_CHARACTER_COUNT = 4;
const STEP = 3;

const route = useRoute();
const router = useRouter();

console.log("route", route);
console.log("router", router);

const state = reactive({
  characters: [] as Character[],
  isLoading: false,
  isError: false,
});

const visibleCount = ref(DEFAULT_VISIBLE_CHARACTER_COUNT);
const page = ref(Number(route.query.page) || 1);

const fetchData = async (page: number) => {
  try {
    state.isLoading = true;
    const fullUrl = `${url.value}?page=${page}`;

    const { data } = await axios.get(fullUrl);

    state.characters = data.results.map((character: Character) => {
      return {
        id: character.id,
        name: character.name,
        gender: character.gender,
        image: character.image,
        type: character.type,
        status: character.status,
      };
    });
    state.isLoading = false;
  } catch (error) {
    state.isLoading = false;
    state.isError = true;
  }
};

const totalCharactersCount = computed(() => {
  return state.characters.length;
});

const visibleCharacters = computed(() => {
  return state.characters.filter((_, index) => index < visibleCount.value);
});

const updateData = () => {
  fetchData(page.value);
  visibleCount.value = DEFAULT_VISIBLE_CHARACTER_COUNT;
  router.push({
    query: {
      page: page.value,
    },
  });
};

watch(
  page,
  (newValue, oldValue) => {
    console.log("page", newValue);
    updateData();
  },
  { immediate: true }
);

const handlePrevPage = () => {
  page.value--;
};
const handleNextPage = () => {
  page.value++;
};

// onMounted(async () => {
//   fetchData(page.value);
// });
</script>

<style lang="scss" scoped>
.buttonWrapper {
  display: flex;
  column-gap: steps(2);
  margin-bottom: steps(4);
}

.load-more-wrapper {
  margin-top: steps(6);
  display: flex;
  justify-content: center;
}
.characters-item{
  
}
.characters-list {
  display: grid;
  column-gap: steps(2);
  row-gap: steps(2);
  margin-bottom: steps(8);
  grid-auto-rows: 1fr;

  @include for-at-least($breakpoint-md) {
    grid-template-columns: 1fr 1fr;
  }
  @include for-at-least($breakpoint-lg) {
    grid-template-columns: 1fr 1fr 1fr;
  }
}
</style>
