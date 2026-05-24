<script setup lang="ts">
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue'
import Icon from '@/components/icons/Icon.vue'
import type { HomeNavItem } from './types'

defineProps<{
  siteName: string
  siteLogo: string
  docUrl: string
  navItems: HomeNavItem[]
  isDark: boolean
  isAuthenticated: boolean
  dashboardPath: string
  userInitial: string
}>()

const emit = defineEmits<{
  toggleTheme: []
}>()
</script>

<template>
  <header class="sticky top-0 z-50 px-4 pt-4 sm:px-6 lg:px-8">
    <nav
      class="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[30px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.1),rgba(255,255,255,0.04))] px-4 py-3 shadow-[0_28px_90px_rgba(4,8,24,0.28),inset_0_1px_0_rgba(255,255,255,0.14)] backdrop-blur-2xl supports-[backdrop-filter]:bg-white/[0.05] sm:px-6"
    >
      <div class="flex min-w-0 items-center gap-3">
        <div
          class="flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.18),rgba(255,255,255,0.05))] shadow-[0_14px_40px_rgba(87,97,255,0.2),inset_0_1px_0_rgba(255,255,255,0.25)]"
        >
          <img
            :src="siteLogo || '/logo.png'"
            :alt="siteName"
            class="h-full w-full object-contain p-2"
          />
        </div>

        <div class="min-w-0">
          <p class="truncate text-[11px] font-semibold uppercase tracking-[0.3em] text-slate-400">
            AI 网关
          </p>
          <p class="truncate text-base font-semibold text-white sm:text-lg">{{ siteName }}</p>
        </div>
      </div>

      <div class="hidden items-center gap-8 lg:flex">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="text-sm font-medium text-slate-300/82 transition hover:text-white"
        >
          {{ item.label }}
        </a>
      </div>

      <div class="flex items-center gap-2 sm:gap-3">
        <div class="hidden sm:block">
          <LocaleSwitcher />
        </div>

        <a
          v-if="docUrl"
          :href="docUrl"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/[0.1] hover:text-white"
          title="文档"
        >
          <Icon name="book" size="md" />
        </a>

        <button
          type="button"
          class="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/[0.06] text-slate-200 transition hover:-translate-y-0.5 hover:bg-white/[0.1] hover:text-white"
          :title="isDark ? '切换为浅色模式' : '切换为深色模式'"
          @click="emit('toggleTheme')"
        >
          <Icon :name="isDark ? 'sun' : 'moon'" size="md" />
        </button>

        <router-link
          :to="isAuthenticated ? dashboardPath : '/login'"
          class="home-glow-button group inline-flex items-center gap-3 rounded-full border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.14),rgba(255,255,255,0.05))] px-3 py-2 text-sm font-semibold text-white shadow-[0_16px_60px_rgba(74,85,255,0.28),inset_0_1px_0_rgba(255,255,255,0.22)] backdrop-blur-xl"
        >
          <span
            v-if="isAuthenticated"
            class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-xs font-bold text-slate-950"
          >
            {{ userInitial || 'U' }}
          </span>
          <span>{{ isAuthenticated ? '控制台' : '立即接入' }}</span>
          <Icon name="arrowRight" size="sm" class="transition group-hover:translate-x-0.5" />
        </router-link>
      </div>
    </nav>
  </header>
</template>
