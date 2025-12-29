<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardStore, type SquareId } from '@/stores/board'

const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'] as const
const ranks = [8, 7, 6, 5, 4, 3, 2, 1]

type Square = {
  id: SquareId
  isLight: boolean
}

const squares = computed<Square[]>(() =>
  ranks.flatMap((rank) =>
    files.map((file, fileIndex) => {
      const squareId = `${file}${rank}` as SquareId
      const isLight = ((fileIndex + 1) + rank) % 2 === 1
      return {
        id: squareId,
        isLight,
      }
    }),
  ),
)

const boardStore = useBoardStore()
const { lastSquare } = storeToRefs(boardStore)

const handleSquareClick = (squareId: SquareId) => {
  boardStore.recordClick(squareId)
}

const isLastClicked = (squareId: SquareId) => lastSquare.value === squareId

</script>

<template>
  <div class="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-slate-800 bg-slate-800/40">
    <div class="grid grid-cols-8 aspect-square w-full">
      <button
        v-for="square in squares"
        :key="square.id"
        type="button"
        @click="handleSquareClick(square.id)"
        class="relative flex items-center justify-center text-lg font-semibold transition"
        :class="[
          square.isLight ? 'bg-amber-100 text-slate-900' : 'bg-slate-700 text-slate-100',
          isLastClicked(square.id)
            ? 'ring-4 ring-cyan-400 ring-inset shadow-[0_0_25px_rgba(34,211,238,0.45)]'
            : 'hover:brightness-110 focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:outline-none',
        ]"
        :aria-pressed="isLastClicked(square.id)"
        :aria-label="`Square ${square.id}`"
      >
        <span class="sr-only">Square {{ square.id }}</span>
        <span
          v-if="isLastClicked(square.id)"
          class="absolute left-2 top-2 inline-flex h-7 items-center justify-center rounded-full bg-slate-900/80 px-2 text-xs font-bold text-cyan-100"
        >
          Last
        </span>
        <span class="pointer-events-none text-sm font-medium text-slate-300">{{ square.id }}</span>
      </button>
    </div>
  </div>
</template>
