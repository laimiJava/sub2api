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
        class="home-cta-panel home-reveal relative overflow-hidden rounded-[42px] px-8 py-12 sm:px-10 sm:py-14 lg:px-14"
      >
        <div class="absolute -left-10 top-0 h-48 w-48 rounded-full bg-[#f4d08b]/20 blur-3xl" />
        <div class="absolute right-[-3rem] top-10 h-44 w-44 rounded-full bg-[#57c4ff]/18 blur-3xl" />
        <div class="absolute bottom-[-2rem] left-[36%] h-28 w-60 -translate-x-1/2 rounded-full bg-white/6 blur-3xl" />

        <div class="relative z-10 grid gap-12 lg:grid-cols-[1fr_auto] lg:items-center">
          <div class="max-w-3xl">
            <p class="text-[11px] font-semibold uppercase tracking-[0.34em] text-[#f4d08b]">
              Launch Now
            </p>
            <h2 class="mt-5 text-4xl font-semibold tracking-[-0.07em] text-white sm:text-5xl xl:text-[4.2rem] xl:leading-[0.95]">
              让你的产品从第一天开始，
              <span class="bg-gradient-to-r from-white via-[#f6dfaa] to-[#7fd1ff] bg-clip-text text-transparent">
                就具备稳定的模型接入体验
              </span>
            </h2>
            <p class="mt-6 max-w-2xl text-base leading-8 text-slate-300/82 sm:text-lg">
              保留现有业务逻辑，只替换模型基础地址，即可获得统一网关、成本优化、上游切换与可观测能力。
            </p>
          </div>

          <div class="relative z-10 flex flex-col gap-4 sm:flex-row lg:flex-col">
            <router-link
              :to="isAuthenticated ? dashboardPath : '/login'"
              class="home-cta-primary home-glow-button group inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-sm font-semibold text-[#10151d]"
            >
              <span>{{ isAuthenticated ? '进入控制台' : '登录' }}</span>
              <Icon
                name="arrowRight"
                size="sm"
                class="transition group-hover:translate-x-0.5"
              />
            </router-link>

            <a
              href="#hero"
              class="home-cta-secondary home-hover-card inline-flex items-center justify-center gap-3 rounded-full px-7 py-4 text-sm font-semibold text-white/95 transition"
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

<style scoped>
.home-cta-panel {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(145deg, rgba(15, 31, 54, 0.78), rgba(9, 15, 26, 0.58));
  box-shadow:
    0 34px 120px rgba(4, 10, 28, 0.34),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
}

.home-cta-primary {
  border: 1px solid rgba(244, 208, 139, 0.3);
  background: linear-gradient(135deg, #f8d992, #d4a44c 55%, #7bbcff);
  box-shadow:
    0 18px 42px rgba(214, 168, 79, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.34);
}

.home-cta-secondary {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
}
</style>
