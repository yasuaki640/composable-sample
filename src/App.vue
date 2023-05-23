<script setup lang="ts">
import { useEditBelongings } from "@/hooks/useEditBelongings";

// prettier-ignore
const {
  loading,
  belongings,
  removeBelonging,
  nameInput,
  appendBelonging,
  submitEdit
} = useEditBelongings();
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
        <button @click="appendBelonging">add</button>
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
