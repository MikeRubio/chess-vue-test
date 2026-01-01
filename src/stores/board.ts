import { defineStore } from 'pinia'

export type SquareId =
  `${'a' | 'b' | 'c' | 'd' | 'e' | 'f' | 'g' | 'h'}${1 | 2 | 3 | 4 | 5 | 6 | 7 | 8}`

export const useBoardStore = defineStore('board', {
  state: () => ({
    history: [] as SquareId[],
    lastSquare: null as SquareId | null,
  }),
  getters: {
    hasHistory: (state) => state.history.length > 0,
  },
  actions: {
    recordClick(square: SquareId) {
      if (this.lastSquare === square) return
      this.history.push(square)
      this.lastSquare = square
    },
    reset() {
      this.history = []
      this.lastSquare = null
    },
  },
})
