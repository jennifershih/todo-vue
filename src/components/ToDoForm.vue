<script setup lang="ts">
import { ref } from 'vue'

const emit = defineEmits<{ added: [label: string] }>()
const label = ref('')

function onSubmit() {
  const text = label.value.trim()
  if (!text) return
  emit('added', text)
  label.value = ''
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <h2 class="label-wrapper">
      <label for="new-todo-input" class="label__lg">What needs to be done?</label>
    </h2>
    <input id="new-todo-input" v-model="label" type="text" autocomplete="off" class="input__lg" />
    <button type="submit" class="btn btn__primary btn__lg">Add</button>
  </form>
</template>
