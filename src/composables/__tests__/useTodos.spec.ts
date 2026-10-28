import { beforeEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { useTodos } from '../useTodos'

describe('useTodos', () => {
  beforeEach(() => localStorage.clear())

  it('adds trimmed items and ignores blanks', () => {
    const todos = useTodos()
    todos.add('  Buy milk ')
    todos.add('   ')
    expect(todos.items.value.map((t) => t.label)).toEqual(['Buy milk'])
  })

  it('toggles, renames and removes', () => {
    const todos = useTodos()
    todos.add('a')
    const id = todos.items.value[0]!.id
    todos.toggle(id)
    todos.rename(id, 'b')
    expect(todos.items.value[0]).toMatchObject({ label: 'b', done: true })
    todos.rename(id, '  ')
    expect(todos.items.value[0]!.label).toBe('b')
    todos.remove(id)
    expect(todos.items.value).toEqual([])
  })

  it('filters and summarizes', () => {
    const todos = useTodos()
    todos.add('a')
    todos.add('b')
    todos.toggle(todos.items.value[0]!.id)
    expect(todos.summary.value).toBe('1 out of 2 items completed')
    todos.filter.value = 'active'
    expect(todos.visible.value.map((t) => t.label)).toEqual(['b'])
    todos.filter.value = 'done'
    expect(todos.visible.value.map((t) => t.label)).toEqual(['a'])
    todos.clearCompleted()
    expect(todos.items.value.map((t) => t.label)).toEqual(['b'])
  })

  it('remembers items between visits', async () => {
    useTodos().add('persisted')
    await nextTick()
    expect(useTodos().items.value.map((t) => t.label)).toEqual(['persisted'])
  })
})
