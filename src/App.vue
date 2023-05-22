<script setup lang="ts">
import { ref } from "vue";

const todos = ref<string[]>([]);
fetch(import.meta.env.VITE_API_DOMAIN + "/todos")
  .then((res) => res.json())
  .then((json) => {
    todos.value = json;
  });
</script>

<template>
  <main>
    <h1>Vue3 Composable Sample</h1>
    <h2>Todo 一括編集</h2>
    <ul>
      <template v-for="todo in todos" :key="todo">
        <div class="todo-item">
          <li>{{ todo }}</li>
          &nbsp;
          <button>delete</button>
        </div>
      </template>
    </ul>
  </main>
</template>

<style scoped>
.todo-item {
  display: flex;
}
</style>
