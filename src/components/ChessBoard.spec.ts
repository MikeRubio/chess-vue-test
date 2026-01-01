import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import { nextTick } from 'vue'
import ChessBoard from './ChessBoard.vue'
import { useBoardStore } from '@/stores/board'

describe('ChessBoard', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('renders 64 squares and highlights only the last one clicked', async () => {
    const pinia = createPinia()
    setActivePinia(pinia)

    const wrapper = mount(ChessBoard, {
      global: {
        plugins: [pinia],
      },
    })

    const store = useBoardStore()
    const buttons = wrapper.findAll('button')
    expect(buttons).toHaveLength(64)

    await buttons[0]?.trigger('click')
    await nextTick()

    expect(store.lastSquare).toBe('a8')
    expect(buttons[0]?.classes()).toContain('bg-board-highlight')
    expect(store.history).toEqual(['a8'])

    await buttons[1]?.trigger('click')
    await nextTick()

    expect(store.lastSquare).toBe('b8')
    expect(buttons[1]?.classes()).toContain('bg-board-highlight')
    expect(buttons[0]?.classes()).not.toContain('bg-board-highlight')
    expect(store.history).toEqual(['a8', 'b8'])

    await buttons[1]?.trigger('click')
    await nextTick()

    expect(store.history).toEqual(['a8', 'b8'])
  })
})
