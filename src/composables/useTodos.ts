import { computed, ref, watch } from 'vue'

export interface Todo {
  id: string
  label: string
  done: boolean
}

export type Filter = 'all' | 'active' | 'done'

const STORAGE_KEY = 'todo-vue:items'

function load(): Todo[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved) as Todo[]
  } catch {
    // Storage can be unavailable (private mode) or hold bad data; start fresh.
  }
  return []
}

/** To-do items with filtering, kept in localStorage between visits. */
export function useTodos() {
  const items = ref<Todo[]>(load())
  const filter = ref<Filter>('all')

  watch(
    items,
    (value) => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
      } catch {
        // Ignore: the list still works for this session.
      }
    },
    { deep: true },
  )

  const visible = computed(() => {
    if (filter.value === 'active') return items.value.filter((t) => !t.done)
    if (filter.value === 'done') return items.value.filter((t) => t.done)
    return items.value
  })

  const summary = computed(() => {
    const done = items.value.filter((t) => t.done).length
    return `${done} out of ${items.value.length} items completed`
  })

  function add(label: string) {
    const text = label.trim()
    if (!text) return
    items.value.push({ id: crypto.randomUUID(), label: text, done: false })
  }

  function toggle(id: string) {
    const item = items.value.find((t) => t.id === id)
    if (item) item.done = !item.done
  }

  function rename(id: string, label: string) {
    const item = items.value.find((t) => t.id === id)
    const text = label.trim()
    if (item && text) item.label = text
  }

  function remove(id: string) {
    items.value = items.value.filter((t) => t.id !== id)
  }

  function clearCompleted() {
    items.value = items.value.filter((t) => !t.done)
  }

  return { items, filter, visible, summary, add, toggle, rename, remove, clearCompleted }
}
