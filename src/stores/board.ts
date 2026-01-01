import { defineStore } from 'pinia'
import { type SquareId } from '@/lib/board'

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
