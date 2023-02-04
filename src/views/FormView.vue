<template>
  <div>Theme: {{ store.theme }}</div>
  <div>mouse position: {{ x }} {{ y }}</div>
  <div class="form-wrapper">
    <form @submit.prevent="handleSubmit" class="form">
      <CustomInput
        id="name"
        v-model:inputValue="state.name.value"
        label="Add name"
        class="red"
        :error="state.name.error"
        isRequired
      />
      <CustomInput
        id="email"
        v-model:inputValue="state.email.value"
        :error="state.email.error"
        label="Add Email"
        :isRequired="true"
      />
      <input type="text" ref="inputRef" />
      <div class="checkbox-wrapper">
        <input type="checkbox" id="checkbox" v-model="state.terms.value" />
        <div>
          <label for="checkbox">Confirm terms</label>
          <a href="/">Read terms</a>
        </div>
      </div>
      <button type="submit" :disabled="!state.terms.value || isLoading">
        Submit
        {{ isLoading ? "..." : "" }}
      </button>
      <div class="success" v-if="successMessage">
        {{ successMessage }}
        <button @click="successMessage = ''">Send again</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts" setup>
import {
  onMounted,
  onUnmounted,
  reactive,
  ref,
  watch,
  type VNodeRef,
} from "vue";
import CustomInput from "../components/CustomInput.vue";
import axios from "axios";
import { isValid } from "@/helpers/validateName";
import { useMouse } from "@/hooks/useMouse";
import { store } from "../globalState";

const url = "https://jsonplaceholder.typicode.com/posts";

const state = reactive({
  name: {
    value: "",
    error: "",
  },
  email: {
    value: "",
    error: "",
  },
  terms: {
    value: false,
    error: "",
  },
});

const inputRef = ref(null);

const userId = ref(1);

const successMessage = ref("");
const isLoading = ref(false);
const { x, y } = useMouse();

watch(
  () => state.name.value,
  (newValue, oldValue) => {
    state.name.error = "";
  }
);

const isValidName = () => {
  if (!state.name.value) {
    state.name.error = "Name field can not be empty!";
    return false;
  }
  if (state.name.value.length < 3) {
    state.name.error = "Name must be atleast 3 letters long";
    return false;
  }
  state.name.error = "";
  return true;
};

function isValidEmail() {
  if (!state.email.value) {
    state.email.error = "Email field can not be empty!";
    return false;
  }
  let emailRegex = new RegExp(
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  const isEmailValid = emailRegex.test(state.email.value);

  if (!isEmailValid) {
    state.email.error = "Email is in wrong format";
    return false;
  }

  return true;
}

const submitData = async () => {
  const payload = {
    title: state.name.value,
    body: state.email.value,
    userId: userId.value,
  };

  try {
    isLoading.value = true;
    const response = await axios.post(url, payload);
    setTimeout(() => {
      console.log("response", response);
      userId.value++;
      state.email.value = "";
      state.name.value = "";
      state.terms.value = false;

      successMessage.value = "Message success";
      isLoading.value = false;
    }, 100);
  } catch (error) {
    console.log("error", error);
    isLoading.value = false;
  }
};

const handleSubmit = () => {
  const { valid, errorMessage } = isValid(state.name.value);
  if (!valid) {
    state.name.error = errorMessage;
  }

  const isNameValid = isValidName();
  const isEmailValid = isValidEmail();

  if (!isNameValid || !isEmailValid) {
    return;
  }

  submitData();
};

onMounted(() => {
  inputRef.value.focus();
});
</script>

<style lang="scss">
@import "../styles/formStyles.scss";
</style>
