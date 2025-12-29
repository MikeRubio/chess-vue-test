<script setup lang="ts">
import ChessBoard from '@/components/ChessBoard.vue'
import ClicksSidebar from '@/components/ClicksSidebar.vue'
</script>

<template>
  <main class="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center p-6">
    <header class="mb-6 text-center space-y-2">
      <p class="text-sm font-semibold text-sky-300 uppercase tracking-[0.2em]">Chessboard and a Sidebar</p>
    </header>

    <section class="w-full max-w-6xl flex flex-col gap-6 lg:flex-row">
      <div class="flex-1">
        <ChessBoard />
      </div>
      <ClicksSidebar />
    </section>
  </main>
</template>
