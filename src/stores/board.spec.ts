import { describe, it, expect, beforeEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useBoardStore, type SquareId } from './board'

describe('board store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('records clicks and updates the last square', () => {
    const store = useBoardStore()
    const first: SquareId = 'a1'
    const second: SquareId = 'b2'

    store.recordClick(first)
    expect(store.history).toEqual([first])
    expect(store.lastSquare).toBe(first)

    store.recordClick(second)
    expect(store.history).toEqual([first, second])
    expect(store.lastSquare).toBe(second)
  })

  it('does not log back-to-back duplicates', () => {
    const store = useBoardStore()

    store.recordClick('c3')
    store.recordClick('c3')
    store.recordClick('c3')

    expect(store.history).toEqual(['c3'])
    expect(store.lastSquare).toBe('c3')
  })

  it('resets history and the last square clicked', () => {
    const store = useBoardStore()
    store.recordClick('c3')
    store.recordClick('d4')

    store.reset()

    expect(store.history).toEqual([])
    expect(store.lastSquare).toBeNull()
    expect(store.hasHistory).toBe(false)
  })
})
