<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useAuthStore, useAppStore } from '@/stores'
import HomeCapabilitySection from '@/components/home/HomeCapabilitySection.vue'
import HomeCtaSection from '@/components/home/HomeCtaSection.vue'
import HomeHeroSection from '@/components/home/HomeHeroSection.vue'
import HomeNavBar from '@/components/home/HomeNavBar.vue'
import type { HomeFeature, HomeModelPill, HomeNavItem } from '@/components/home/types'
import { useHomeExperience } from '@/composables/home/useHomeExperience'

const authStore = useAuthStore()
const appStore = useAppStore()
const { rootRef } = useHomeExperience()

const isDark = ref(document.documentElement.classList.contains('dark'))
const copiedEndpoint = ref(false)
let copyTimer: number | undefined

const siteName = computed(
  () => appStore.cachedPublicSettings?.site_name || appStore.siteName || 'Sub2API'
)
const siteLogo = computed(() => appStore.cachedPublicSettings?.site_logo || appStore.siteLogo || '')
const docUrl = computed(() => appStore.cachedPublicSettings?.doc_url || appStore.docUrl || '')
const homeContent = computed(() => appStore.cachedPublicSettings?.home_content || '')

const isHomeContentUrl = computed(() => {
  const content = homeContent.value.trim()
  return content.startsWith('http://') || content.startsWith('https://')
})

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const dashboardPath = computed(() => (isAdmin.value ? '/admin/dashboard' : '/dashboard'))
const userInitial = computed(() => authStore.user?.email?.charAt(0).toUpperCase() || '')
const endpointUrl = computed(() => 'www.laimiai.top')

const navItems: HomeNavItem[] = [
  { label: '首页', href: '#hero' },
  { label: '能力', href: '#capabilities' },
  { label: '开始接入', href: '#launch' }
]

const features: HomeFeature[] = [
  {
    title: '一键接入',
    description: '获取一个 API 密钥，即可调用所有已接入的 AI 模型，无需分别申请。',
    icon: 'link',
    glow: '#4d7dff',
    iconBackground: 'linear-gradient(180deg, rgba(71,121,255,0.96), rgba(48,93,224,0.96))'
  },
  {
    title: '稳定可靠',
    description: '智能调度多个上游账号，自动切换和负载均衡，告别频繁报错。',
    icon: 'users',
    glow: '#27d3c0',
    iconBackground: 'linear-gradient(180deg, rgba(38,196,183,0.96), rgba(17,149,139,0.96))'
  },
  {
    title: '用多少付多少',
    description: '按实际使用量计费，支持设置配额上限，团队用量一目了然。',
    icon: 'creditCard',
    glow: '#ad5cff',
    iconBackground: 'linear-gradient(180deg, rgba(171,86,255,0.96), rgba(130,54,227,0.96))'
  }
]

const models: HomeModelPill[] = [
  {
    name: 'Claude',
    initial: 'C',
    color: 'linear-gradient(180deg, #ff9838 0%, #ff7a1a 100%)',
    status: '已支持'
  },
  {
    name: 'GPT',
    initial: 'G',
    color: 'linear-gradient(180deg, #2ec85d 0%, #1ea948 100%)',
    status: '已支持'
  },
  {
    name: 'Gemini',
    initial: 'G',
    color: 'linear-gradient(180deg, #4c8dff 0%, #306df0 100%)',
    status: '已支持'
  },
  {
    name: 'Antigravity',
    initial: 'A',
    color: 'linear-gradient(180deg, #ff467b 0%, #dd2664 100%)',
    status: '已支持'
  }
]

const backgroundStars = Array.from({ length: 36 }, (_, index) => ({
  id: index + 1,
  left: `${(index * 13) % 100}%`,
  top: `${(index * 19) % 100}%`,
  size: `${1 + (index % 3)}px`,
  delay: `${(index % 7) * 0.7}s`,
  duration: `${5 + (index % 5)}s`,
  opacity: 0.28 + (index % 4) * 0.14
}))

function toggleTheme() {
  isDark.value = !isDark.value
  document.documentElement.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

async function copyEndpoint() {
  try {
    await navigator.clipboard.writeText(endpointUrl.value)
    copiedEndpoint.value = true
    window.clearTimeout(copyTimer)
    copyTimer = window.setTimeout(() => {
      copiedEndpoint.value = false
    }, 1800)
  } catch {
    copiedEndpoint.value = false
  }
}

function initTheme() {
  const savedTheme = localStorage.getItem('theme')
  if (
    savedTheme === 'dark' ||
    (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)
  ) {
    isDark.value = true
    document.documentElement.classList.add('dark')
  }
}

onMounted(() => {
  initTheme()
  authStore.checkAuth()

  if (!appStore.publicSettingsLoaded) {
    appStore.fetchPublicSettings()
  }
})
</script>

<template>
  <div v-if="homeContent" class="min-h-screen">
    <iframe
      v-if="isHomeContentUrl"
      :src="homeContent.trim()"
      class="h-screen w-full border-0"
      allowfullscreen
    />
    <div v-else v-html="homeContent" />
  </div>

  <div
    v-else
    ref="rootRef"
    class="relative min-h-screen overflow-hidden bg-[#060816] text-white"
  >
    <div class="absolute inset-0 overflow-hidden">
      <div
        class="home-ambient absolute -left-24 top-8 h-[36rem] w-[36rem] rounded-full bg-[radial-gradient(circle,rgba(93,102,255,0.48),transparent_62%)] blur-3xl"
        data-parallax="135"
      />
      <div
        class="home-ambient absolute right-[-6rem] top-[-3rem] h-[38rem] w-[38rem] rounded-full bg-[radial-gradient(circle,rgba(98,194,255,0.22),transparent_58%)] blur-3xl"
        data-parallax="155"
      />
      <div
        class="home-ambient absolute bottom-[-12rem] left-1/2 h-[42rem] w-[42rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(122,102,255,0.21),transparent_58%)] blur-3xl"
        data-parallax="90"
      />
      <div
        class="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_24%),radial-gradient(circle_at_20%_24%,rgba(95,107,255,0.12),transparent_22%),radial-gradient(circle_at_76%_18%,rgba(87,194,255,0.08),transparent_18%),linear-gradient(180deg,#0d1020_0%,#090d19_28%,#060814_100%)]"
      />
      <div
        class="absolute inset-0 opacity-[0.2]"
        style="background-image: linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px); background-size: 72px 72px; mask-image: radial-gradient(circle at center, black 38%, transparent 86%);"
      />
      <div class="home-noise absolute inset-0 opacity-[0.12]" />
      <div class="pointer-events-none absolute inset-0">
        <span
          v-for="star in backgroundStars"
          :key="star.id"
          class="home-star absolute rounded-full bg-white"
          :style="{
            left: star.left,
            top: star.top,
            width: star.size,
            height: star.size,
            opacity: `${star.opacity}`,
            animationDelay: star.delay,
            animationDuration: star.duration
          }"
        />
      </div>
      <div
        class="absolute left-[12%] top-[22%] h-px w-[18rem] rotate-[24deg] bg-gradient-to-r from-transparent via-white/18 to-transparent blur-sm"
      />
      <div
        class="absolute bottom-[24%] right-[8%] h-px w-[16rem] -rotate-[18deg] bg-gradient-to-r from-transparent via-[#67bfff]/28 to-transparent blur-sm"
      />
    </div>

    <HomeNavBar
      :site-name="siteName"
      :site-logo="siteLogo"
      :doc-url="docUrl"
      :nav-items="navItems"
      :is-dark="isDark"
      :is-authenticated="isAuthenticated"
      :dashboard-path="dashboardPath"
      :user-initial="userInitial"
      @toggle-theme="toggleTheme"
    />

    <main class="relative z-10">
      <HomeHeroSection
        :endpoint-url="endpointUrl"
        :copied-endpoint="copiedEndpoint"
        :is-authenticated="isAuthenticated"
        :dashboard-path="dashboardPath"
        @copy-endpoint="copyEndpoint"
      />

      <HomeCapabilitySection :features="features" :models="models" />

      <HomeCtaSection
        :is-authenticated="isAuthenticated"
        :dashboard-path="dashboardPath"
      />
    </main>
  </div>
</template>

<style scoped>
.home-noise {
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180' viewBox='0 0 180 180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.15' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='180' height='180' filter='url(%23n)' opacity='0.55'/%3E%3C/svg%3E");
  mix-blend-mode: soft-light;
}

.home-star {
  box-shadow: 0 0 14px rgba(255, 255, 255, 0.22);
  animation-name: twinkle;
  animation-timing-function: ease-in-out;
  animation-iteration-count: infinite;
}

.home-ambient {
  animation: ambientDrift 16s ease-in-out infinite;
}

@keyframes twinkle {
  0%,
  100% {
    opacity: 0.18;
    transform: scale(1);
  }

  50% {
    opacity: 0.92;
    transform: scale(1.6);
  }
}

@keyframes ambientDrift {
  0%,
  100% {
    transform: translate3d(0, 0, 0);
  }

  50% {
    transform: translate3d(0, -14px, 0);
  }
}
</style>
