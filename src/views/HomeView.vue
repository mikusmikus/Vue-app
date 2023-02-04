<style lang="scss">
.filters {
  display: flex;
  flex-direction: column;
  align-items: start;
  row-gap: steps(3);

  @include for-at-least($breakpoint-md) {
    flex-direction: row;
    flex-wrap: wrap;
    column-gap: 12px;
  }
  @include for-at-least($breakpoint-lg) {
    background-color: lightblue;
  }
}

.filters-button {
  /* min-width: 300px; */
  background-color: lightcyan;
  margin-bottom: 12px;
  padding: steps(2) steps(4);
  transition: all 500ms ease-in-out;
  &:hover {
    background-color: black;
    color: $color-primary;
  }
}

@media screen and (min-width: $breakpoint-md) {
  .filters-button {
    flex-grow: 1;
  }
}
</style>

<template>
  <div class="wrapper">
    mouse position: {{ x }} {{ y }}
    <div class="filters">
      <div class="filters-button" @click="state.filter = 'all'">All</div>
      <div class="filters-button" @click="state.filter = 'active'">Active</div>
      <div class="filters-button" @click="state.filter = 'completed'">
        Completed
      </div>
    </div>

    <form @submit.prevent="addTodo">
      <input
        @input="(event : any) => (state.inputValue = event.target.value)"
        :value="state.inputValue"
      />
      <button type="submit">Add Todo</button>
    </form>

    <ul>
      <li v-for="(todo, index) in filterTodos" :key="todo.task">
        <TodoItem
          :task="todo.task"
          :isCompleted="todo.isCompleted"
          @deleteTodo="deleteTodo(index)"
          @updateTodoState="(newValue) => (todo.isCompleted = newValue)"
          @UpdateTodoText="(newValue) => (todo.task = newValue)"
        />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useMouse } from "@/hooks/useMouse";
import { computed, reactive } from "vue";
import TodoItem, { test } from "../components/TodoItem.vue";

interface Todo {
  task: string;
  isCompleted: boolean;
}

type Filter = "all" | "active" | "completed";

const state = reactive({
  counter: 0,
  filter: "all" as Filter,
  inputValue: "",
  todos: [
    {
      task: "First task",
      isCompleted: true,
    },
  ] as Todo[],
});

const { x, y } = useMouse();

function changeCounter(value: number) {
  state.counter = state.counter + value;
}

const filterTodos = computed((): Todo[] => {
  if (state.filter === "active") {
    return state.todos.filter((item) => !item.isCompleted);
  }

  if (state.filter === "completed") {
    return state.todos.filter((item) => item.isCompleted);
  }

  return state.todos;
});

function addTodo() {
  const newTodo = {
    task: state.inputValue,
    isCompleted: false,
  };
  state.todos.push(newTodo);
}

function deleteTodo(index: number) {
  state.todos.splice(index, 1);
  const data = test();
  console.log("data", data);

  state.inputValue = "";
}
</script>
