<script setup lang="ts">
import { computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board'
import { boardFiles, boardRanks, type BoardFile, type BoardRank, type SquareId } from '@/lib/board'

type Square = {
  id: SquareId
  file: BoardFile
  rank: BoardRank
  fileIndex: number
  isLight: boolean
}

const squares = computed<Square[]>(() =>
  boardRanks.flatMap((rank) =>
    boardFiles.map((file, fileIndex) => {
      const squareId = `${file}${rank}` as SquareId
      const isLight = ((fileIndex + 1) + rank) % 2 === 1
      return {
        id: squareId,
        file,
        rank,
        fileIndex,
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

const coordinateLabel = (square: Square): string => {
  const showRank = square.fileIndex === 0
  const showFile = square.rank === 1

  if (showRank && showFile) {
    return `${square.rank} ${square.file}`
  }

  if (showRank) {
    return `${square.rank}`
  }

  if (showFile) {
    return `${square.file}`
  }

  return ''
}
</script>

<template>
  <div class="relative overflow-hidden shadow-2xl ring-1 ring-slate-800 bg-slate-800/40">
    <div class="grid grid-cols-8 aspect-square w-full">
      <button
        v-for="square in squares"
        :key="square.id"
        type="button"
        @click="handleSquareClick(square.id)"
        class="relative flex items-center justify-center text-lg font-semibold transition"
                :class="[
          isLastClicked(square.id)
            ? 'bg-board-highlight text-slate-900'
            : [
                square.isLight ? 'bg-board-light text-slate-900' : 'bg-board-dark text-slate-500',
                'hover:brightness-110',
              ],
        ]"

        :aria-pressed="isLastClicked(square.id)"
        :aria-label="`Square ${square.id}`"
      >
        <span
          v-if="coordinateLabel(square)"
          class="pointer-events-none absolute bottom-1 left-1 text-xl font-semibold select-none"
          :class="
            isLastClicked(square.id)
              ? 'text-board-dark'
              : square.isLight
                ? 'text-board-dark'
                : 'text-board-light'
          "
        >
          {{ coordinateLabel(square) }}
        </span>
      </button>
    </div>
  </div>
</template>
