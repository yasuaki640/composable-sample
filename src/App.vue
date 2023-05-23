<script setup lang="ts">
import { ref } from "vue";

type Belonging = {
  id: number;
  name: string;
};

const belongings = ref<Belonging[]>([]);
fetch(import.meta.env.VITE_API_DOMAIN + "/belongings")
  .then((res) => res.json())
  .then((json) => {
    belongings.value = json;
  });

const removeBelonging = (id: number) => {
  belongings.value = belongings.value.filter((t) => t.id !== id);
};
</script>

<template>
  <main>
    <h1>Vue3 Composable Sample</h1>
    <h2>旅行の持ち物 一括編集</h2>
    <ul>
      <li v-for="belonging in belongings" :key="belonging.id">
        {{ belonging.name }}
        <button @click="removeBelonging(belonging.id)">remove</button>
      </li>
    </ul>
  </main>
</template>
