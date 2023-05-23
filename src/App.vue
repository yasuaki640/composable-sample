<script setup lang="ts">
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

type Belonging = {
  id: string;
  name: string;
};

const belongings = ref<Belonging[]>([]);
fetch(import.meta.env.VITE_API_DOMAIN + "/belongings")
  .then((res) => res.json())
  .then((json) => {
    belongings.value = json;
  });

const removeBelonging = (id: string) => {
  belongings.value = belongings.value.filter((t) => t.id !== id);
};

const nameInput = ref("");

const addBelonging = () => {
  belongings.value.push({
    id: uuidv4(),
    name: nameInput.value
  });
  nameInput.value = "";
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
    <div id="add-todo-pane">
      <input v-model="nameInput" type="text" />
      <button @click="addBelonging">add</button>
    </div>
  </main>
</template>
