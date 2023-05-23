<script setup lang="ts">
import { ref } from "vue";

type Todo = {
  id: number;
  title: string;
  done: boolean;
};

const todos = ref<Todo[]>([]);
fetch(import.meta.env.VITE_API_DOMAIN + "/todos")
  .then((res) => res.json())
  .then((json) => {
    todos.value = json;
  });

const makeDone = (id: number) => {
  const target = todos.value.find((t) => t.id === id);
  if (target) {
    target.done = true;
  }
};
</script>

<template>
  <main>
    <h1>Vue3 Composable Sample</h1>
    <h2>Todo 一括編集</h2>
    <ul>
      <template v-for="todo in todos" :key="todo.id">
        <li :class="{ 'done-todo': todo.done }">
          {{ todo.title }} <button v-if="!todo.done" @click="makeDone(todo.id)">done</button>
        </li>
      </template>
    </ul>
  </main>
</template>

<style scoped>
.done-todo {
  text-decoration: line-through;
}
</style>
