<script setup lang="ts">
import { onMounted, ref, useTemplateRef } from 'vue'

const props = defineProps<{ id: string; label: string }>()
const emit = defineEmits<{ edited: [label: string]; cancelled: [] }>()

const newLabel = ref(props.label)
const input = useTemplateRef<HTMLInputElement>('input')

function onSubmit() {
  const text = newLabel.value.trim()
  // Saving an empty or unchanged name simply closes the form.
  if (text && text !== props.label) emit('edited', text)
  else emit('cancelled')
}

onMounted(() => input.value?.focus())
</script>

<template>
  <form class="stack-small" @submit.prevent="onSubmit" @keydown.esc="emit('cancelled')">
    <div>
      <label :for="`edit-${id}`" class="edit-label">Edit name for &quot;{{ label }}&quot;</label>
      <input :id="`edit-${id}`" ref="input" v-model="newLabel" type="text" autocomplete="off" />
    </div>
    <div class="btn-group">
      <button type="button" class="btn" @click="emit('cancelled')">
        Cancel <span class="visually-hidden">editing {{ label }}</span>
      </button>
      <button type="submit" class="btn btn__primary">
        Save <span class="visually-hidden">edit for {{ label }}</span>
      </button>
    </div>
  </form>
</template>

<style scoped>
.edit-label {
  font-family: Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #0b0c0c;
  display: block;
  margin-bottom: 5px;
}
input {
  display: inline-block;
  margin-top: 0.4rem;
  width: 100%;
  min-height: 4.4rem;
  padding: 0.4rem 0.8rem;
  border: 2px solid #565656;
}
form {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
}
form > * {
  flex: 0 0 100%;
}
</style>
