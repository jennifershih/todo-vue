import { beforeEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import App from '../../App.vue'

describe('App', () => {
  beforeEach(() => localStorage.clear())

  it('adds, completes and edits a task', async () => {
    const wrapper = mount(App, { attachTo: document.body })

    await wrapper.find('#new-todo-input').setValue('Write README')
    await wrapper.find('form').trigger('submit')
    expect(wrapper.text()).toContain('0 out of 1 items completed')

    await wrapper.find('input[type="checkbox"]').setValue(true)
    expect(wrapper.text()).toContain('1 out of 1 items completed')

    await wrapper
      .findAll('button')
      .find((b) => b.text().startsWith('Edit'))!
      .trigger('click')
    const editInput = wrapper.find('input[id^="edit-"]')
    await editInput.setValue('Write a better README')
    await wrapper.find('form.stack-small').trigger('submit')
    expect(wrapper.find('.checkbox-label').text()).toBe('Write a better README')
    wrapper.unmount()
  })

  it('closes the editor when saving an unchanged name', async () => {
    const wrapper = mount(App)
    await wrapper.find('#new-todo-input').setValue('Same')
    await wrapper.find('form').trigger('submit')
    await wrapper
      .findAll('button')
      .find((b) => b.text().startsWith('Edit'))!
      .trigger('click')
    await wrapper.find('form.stack-small').trigger('submit')
    expect(wrapper.find('input[id^="edit-"]').exists()).toBe(false)
  })
})
