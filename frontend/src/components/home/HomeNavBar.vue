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
      class="home-nav-panel mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-[30px] px-4 py-3 sm:px-6"
    >
      <div class="flex min-w-0 items-center gap-3">
        <div class="home-logo-frame flex h-12 w-12 items-center justify-center overflow-hidden rounded-2xl">
          <img
            :src="siteLogo || '/logo.png'"
            :alt="siteName"
            class="h-full w-full object-contain p-2"
          />
        </div>

        <div class="min-w-0">
          <p class="truncate text-[11px] font-semibold uppercase tracking-[0.3em] text-[#f4d08b]/90">
            Gateway Console
          </p>
          <p class="truncate text-base font-semibold text-white sm:text-lg">{{ siteName }}</p>
        </div>
      </div>

      <div class="hidden items-center gap-8 lg:flex">
        <a
          v-for="item in navItems"
          :key="item.href"
          :href="item.href"
          class="text-sm font-medium text-slate-300/82 transition hover:text-[#f4d08b]"
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
          class="home-icon-button inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-200 transition hover:-translate-y-0.5 hover:text-white"
          title="Docs"
        >
          <Icon name="book" size="md" />
        </a>

        <button
          type="button"
          class="home-icon-button inline-flex h-11 w-11 items-center justify-center rounded-full text-slate-200 transition hover:-translate-y-0.5 hover:text-white"
          :title="isDark ? '切换为浅色模式' : '切换为深色模式'"
          @click="emit('toggleTheme')"
        >
          <Icon :name="isDark ? 'sun' : 'moon'" size="md" />
        </button>

        <router-link
          :to="isAuthenticated ? dashboardPath : '/login'"
          class="home-nav-cta home-glow-button group inline-flex items-center gap-3 rounded-full px-3 py-2 text-sm font-semibold text-[#10151d]"
        >
          <span
            v-if="isAuthenticated"
            class="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[#10151d] text-xs font-bold text-[#f4d08b]"
          >
            {{ userInitial || 'U' }}
          </span>
          <span>{{ isAuthenticated ? '进入控制台' : '登录' }}</span>
          <Icon name="arrowRight" size="sm" class="transition group-hover:translate-x-0.5" />
        </router-link>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.home-nav-panel {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(145deg, rgba(15, 31, 54, 0.78), rgba(9, 15, 26, 0.58));
  box-shadow:
    0 28px 90px rgba(4, 8, 24, 0.38),
    inset 0 1px 0 rgba(255, 255, 255, 0.14);
  backdrop-filter: blur(22px);
}

.home-logo-frame {
  border: 1px solid rgba(244, 208, 139, 0.24);
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.14), rgba(255, 255, 255, 0.03));
  box-shadow:
    0 14px 40px rgba(74, 168, 255, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

.home-icon-button {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
}

.home-icon-button:hover {
  border-color: rgba(244, 208, 139, 0.26);
  background: rgba(255, 255, 255, 0.08);
}

.home-nav-cta {
  border: 1px solid rgba(244, 208, 139, 0.3);
  background: linear-gradient(135deg, #f8d992, #d4a44c 55%, #7bbcff);
  box-shadow:
    0 18px 42px rgba(214, 168, 79, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.34);
}
</style>
