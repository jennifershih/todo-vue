<script setup lang="ts">
import { useTemplateRef } from 'vue'
import ToDoForm from './components/ToDoForm.vue'
import ToDoItem from './components/ToDoItem.vue'
import { useTodos, type Filter } from './composables/useTodos'

const { items, filter, visible, summary, add, toggle, rename, remove, clearCompleted } = useTodos()
const listSummary = useTemplateRef<HTMLHeadingElement>('listSummary')

const filters: { value: Filter; label: string }[] = [
  { value: 'all', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'done', label: 'Completed' },
]

function onDelete(id: string) {
  remove(id)
  // Keep keyboard focus somewhere sensible after the item disappears.
  listSummary.value?.focus()
}
</script>

<template>
  <h1>To-Do List</h1>
  <ToDoForm @added="add" />

  <div class="filters btn-group stack-exception">
    <button
      v-for="f in filters"
      :key="f.value"
      type="button"
      class="btn btn__filter"
      :aria-pressed="filter === f.value"
      @click="filter = f.value"
    >
      <span class="visually-hidden">Show </span>{{ f.label
      }}<span class="visually-hidden"> tasks</span>
    </button>
  </div>

  <h2 id="list-summary" ref="listSummary" tabindex="-1">{{ summary }}</h2>
  <ul aria-labelledby="list-summary" class="stack-large">
    <li v-for="item in visible" :key="item.id">
      <ToDoItem
        :id="item.id"
        :label="item.label"
        :done="item.done"
        @toggled="toggle(item.id)"
        @deleted="onDelete(item.id)"
        @edited="rename(item.id, $event)"
      />
    </li>
  </ul>
  <p v-if="!items.length" class="empty">Nothing to do yet — add your first task above.</p>
  <button v-if="items.some((t) => t.done)" type="button" class="btn clear" @click="clearCompleted">
    Clear completed
  </button>
</template>
