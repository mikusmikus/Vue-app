<template>
  <div class="input-wrapper">
    <label :for="props.id"
      >{{ props.label }} <span class="required" v-if="props.isRequired">*</span>
    </label>
    <input
      type="text"
      v-bind="$attrs"
      :class="{ 'input-dark': store.theme === 'dark' }"
      :value="inputValue"
      @input="updateValue"
      :id="props.id"
      :placeholder="props.placeholder"
    />
    <p v-if="error" class="error">{{ props.error }}</p>
  </div>
</template>

<script lang="ts" setup>
import { defineComponent } from "vue";
import { store } from "../globalState";

interface Props {
  id: string;
  inputValue: string;
  placeholder?: string;
  label?: string;
  error?: string;
  isRequired?: boolean;
}

interface Emits {
  (e: "update:inputValue", newValue: string): void;
}

const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
  placeholder: "Add text",
  isRequired: false,
});

const updateValue = (e: Event) => {
  emit("update:inputValue", (e.target as HTMLInputElement).value);
};
</script>

<script lang="ts">
export default defineComponent({
  inheritAttrs: false,
});
</script>

<style scoped lang="scss">
input {
  padding: steps(2) steps(6);
  border: 1px solid black;
  border-radius: 4px;
  width: 100%;
  max-width: 400px;
}
.input-wrapper {
  display: flex;
  flex-direction: column;
  row-gap: steps(2);
  margin-bottom: steps(2);
  align-items: start;
}

.input-dark {
  background-color: black;
  color: white;
  border: 1px solid white;
}

.required {
  color: $color-error;
}

p {
  color: $color-error;
}
</style>
