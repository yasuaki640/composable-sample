<script setup lang="ts">
import { ref } from "vue";
import { v4 as uuidv4 } from "uuid";

type Belonging = {
  id: string;
  name: string;
};

const loading = ref(false);

const belongings = ref<Belonging[]>([]);
loading.value = true;
fetch(import.meta.env.VITE_API_DOMAIN + "/belongings")
  .then((res) => res.json())
  .then((json) => {
    belongings.value = json;
  })
  .catch((e) => {
    alert(e);
  })
  .finally(() => {
    loading.value = false;
  });

const removeBelonging = (id: string) => {
  belongings.value = belongings.value.filter((t) => t.id !== id);
};

const nameInput = ref("");

const addBelonging = () => {
  if (!nameInput.value) {
    return;
  }

  belongings.value.push({
    id: uuidv4(),
    name: nameInput.value
  });
  nameInput.value = "";
};

const submitEdit = () => {
  const json = JSON.stringify(belongings.value, null, 2);
  alert("Submitted belonging list is below : \n" + json);
  location.reload();
};
</script>

<template>
  <main>
    <h1>Vue3 Composable Sample</h1>
    <h2>旅行の持ち物 一括編集</h2>
    <section v-if="loading">Loading...</section>
    <section v-else>
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
      <div id="submit-button">
        <button @click="submitEdit">submit</button>
      </div>
    </section>
  </main>
</template>

<style scoped>
#submit-button {
  padding: 10px;
}
</style>
