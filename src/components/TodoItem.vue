<template>
  <div class="todo-wrapper">
    <div class="todo-content">
      <input type="checkbox" :checked="isCompleted" @change="changeTodoState" />
      <h2 class="todo-title">{{ isCompleted ? "Completed" : "Active" }}</h2>

      <input type="text" v-model="newEditValue" v-if="isEdited" />
      <p v-else>{{ task }}</p>
    </div>

    <button @click="isEdited = !isEdited">
      {{ isEdited ? "Cancel" : "Edit" }}
    </button>
    <button v-if="isEdited" @click="onSave">Save</button>

    <button @click="$emit('deleteTodo')">Delete</button>
  </div>
</template>

<style scoped>
.content {
  display: flex;
  align-items: center;
  column-gap: 8px;
}
.todo {
  display: flex;
  justify-content: space-between;
}

</style>

<script lang="ts">
export function test() {
  return "hei";
}
</script>

<script setup lang="ts">
import { ref } from "vue";

interface Props {
  task: string;
  isCompleted: boolean;
}

const props = defineProps<Props>();

const isEdited = ref(false);
const newEditValue = ref(props.task);

interface Emits {
  (e: "deleteTodo"): void;
  (e: "updateTodoState", newValue: boolean): void;
  (e: "UpdateTodoText", newValue: string): void;
}

const emit = defineEmits<Emits>();

const onSave = () => {
  emit("UpdateTodoText", newEditValue.value);
  isEdited.value = false;
  // save new todo
};

const changeTodoState = (e: Event) => {
  emit("updateTodoState", (e.target as HTMLInputElement).checked);
};
</script>
