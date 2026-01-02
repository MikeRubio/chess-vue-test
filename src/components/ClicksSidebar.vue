<template>
  <aside class="lg:w-80 w-full bg-slate-800/60 border border-slate-700 rounded-2xl p-5 space-y-4">
    <div class="flex items-center justify-between gap-3">
      <div>
        <p class="text-xs uppercase text-slate-400">Sidebar</p>
        <h2 class="text-xl font-semibold">Click History</h2>
      </div>
      <button
        type="button"
        class="text-xs rounded-full px-3 py-1 border border-slate-700 text-slate-300 hover:bg-slate-700/50 transition disabled:opacity-40 disabled:cursor-not-allowed"
        :disabled="!hasHistory"
        @click="handleReset"
      >
        Reset
      </button>
    </div>

    <div class="rounded-xl border border-slate-700 bg-slate-900/60">
      <div class="flex items-center justify-between px-4 py-3 text-xs font-semibold text-slate-400 uppercase">
        <span>#</span>
        <span>Square</span>
      </div>
      <ol class="divide-y divide-slate-800 max-h-80 overflow-auto" aria-live="polite">
        <li v-if="!history.length" class="px-4 py-4 text-center text-slate-500 text-sm">
          No clicks yet. Tap/click the board to begin.
        </li>
        <li
          v-for="(square, idx) in history"
          :key="`${square}-${idx}`"
          class="flex items-center justify-between px-4 py-3 text-sm"
        >
          <span
            v-if="idx >= 1"
            class="font-semibold text-cyan-200"
          >
            {{ idx }}
          </span>
          <span class="font-medium" :class="square === lastSquare ? 'text-cyan-100' : ''">
            {{ moveLabel(square, idx) }}
          </span>
        </li>
      </ol>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useBoardStore } from '@/stores/board'

const boardStore = useBoardStore()
const { history, lastSquare, hasHistory } = storeToRefs(boardStore)

const handleReset = () => boardStore.reset()

const moveLabel = (square: string, idx: number) => {
  if (idx > 0) {
  const from = history.value[idx - 1]?.toUpperCase()
  return `${from} to ${square.toUpperCase()}`
  }
}
</script>
