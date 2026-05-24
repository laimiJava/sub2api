<script setup lang="ts">
import Icon from '@/components/icons/Icon.vue'

defineProps<{
  isAuthenticated: boolean
  dashboardPath: string
}>()
</script>

<template>
  <section id="launch" class="relative px-4 pb-28 pt-16 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div
        class="home-reveal relative overflow-hidden rounded-[42px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.07),rgba(255,255,255,0.025))] px-8 py-12 shadow-[0_34px_120px_rgba(4,10,28,0.34),inset_0_1px_0_rgba(255,255,255,0.08)] backdrop-blur-2xl sm:px-10 sm:py-14 lg:px-14"
      >
        <div class="absolute -left-10 top-0 h-48 w-48 rounded-full bg-[#5f6dff]/28 blur-3xl" />
        <div class="absolute right-[-3rem] top-10 h-44 w-44 rounded-full bg-[#57c4ff]/18 blur-3xl" />
        <div class="absolute bottom-[-2rem] left-[36%] h-28 w-60 -translate-x-1/2 rounded-full bg-white/6 blur-3xl" />

        <div class="relative z-10 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div class="max-w-3xl">
            <p class="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#93a8ff]">
              立即启用
            </p>
            <h2 class="mt-5 text-4xl font-semibold tracking-[-0.07em] text-white sm:text-5xl xl:text-[4.4rem] xl:leading-[0.95]">
              让你的产品从第一天开始，
              <span class="bg-gradient-to-r from-white via-[#d6dfff] to-[#7fd1ff] bg-clip-text text-transparent">
                就具备稳定的模型接入体验
              </span>
            </h2>
            <p class="mt-6 max-w-2xl text-base leading-8 text-slate-300/82 sm:text-lg">
              保留现有业务逻辑，只替换模型基址，即可获得统一网关、价格优化、上游切换与可观测能力。
            </p>
          </div>

          <div class="relative z-10 flex flex-col gap-4 sm:flex-row lg:flex-col">
            <router-link
              :to="isAuthenticated ? dashboardPath : '/login'"
              class="home-glow-button group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full border border-white/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.22),rgba(255,255,255,0.06))] px-7 py-4 text-sm font-semibold text-white shadow-[0_22px_80px_rgba(72,86,255,0.34),inset_0_1px_0_rgba(255,255,255,0.35)] backdrop-blur-2xl"
            >
              <span class="absolute inset-[1px] rounded-full bg-[linear-gradient(135deg,rgba(104,117,255,0.9),rgba(74,205,255,0.44))]" />
              <span class="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/65 to-transparent" />
              <span class="relative z-10">{{ isAuthenticated ? '进入控制台' : '立即接入' }}</span>
              <Icon
                name="arrowRight"
                size="sm"
                class="relative z-10 transition group-hover:translate-x-0.5"
              />
            </router-link>

            <a
              href="#hero"
              class="home-hover-card inline-flex items-center justify-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-7 py-4 text-sm font-semibold text-white/95 backdrop-blur-xl transition hover:bg-white/[0.08]"
            >
              <Icon name="arrowUp" size="sm" />
              回到顶部
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
