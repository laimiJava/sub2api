<script setup lang="ts">
import Icon from '@/components/icons/Icon.vue'

defineProps<{
  endpointUrl: string
  copiedEndpoint: boolean
  isAuthenticated: boolean
  dashboardPath: string
}>()

const emit = defineEmits<{
  copyEndpoint: []
}>()
</script>

<template>
  <section id="hero" class="relative overflow-hidden px-4 pt-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl pb-6 pt-6 xl:pb-8">
      <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem] lg:items-end">
        <div class="relative z-10 max-w-[1080px]">
          <div class="home-reveal relative">
            <div class="absolute -left-10 top-6 h-28 w-28 rounded-full bg-[#f4d08b]/14 blur-3xl" />
            <div class="absolute left-40 top-16 h-24 w-24 rounded-full bg-[#4aa8ff]/12 blur-3xl" />

            <div class="relative">
              <p
                class="home-hero-kicker inline-flex items-center rounded-full px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.34em]"
              >
                Gateway Matrix
              </p>
              <p class="mt-5 text-sm font-medium tracking-[0.28em] text-[#cfe8ff]/88 sm:text-[15px]">
                更稳定 · 更快速 · 更智能
              </p>
              <h1 class="home-hero-title relative mt-5 max-w-5xl text-white">
                <span class="home-hero-title-glow">大模型接口网关</span>
              </h1>
            </div>
          </div>

          <div class="home-reveal relative mt-5 max-w-3xl">
            <div class="absolute -inset-x-8 -top-4 h-20 rounded-full bg-[#4aa8ff]/8 blur-3xl" />
            <p class="relative text-[15px] leading-7 text-slate-300/84 sm:text-base">
              更好的价格，更好的稳定性，只需要将模型网址替换为:
            </p>
          </div>

          <div class="home-reveal mt-6 flex flex-wrap items-center gap-4 lg:pl-10 xl:pl-14">
            <div
              class="home-console-card w-full max-w-[min(100%,24rem)] rounded-[24px] px-3.5 py-3 sm:max-w-[27rem] sm:px-4 sm:py-3.5"
            >
              <div class="min-w-0">
                <p class="text-[11px] font-semibold uppercase tracking-[0.32em] text-[#f4d08b]/80">
                  API Endpoint
                </p>
                <code class="mt-2 block truncate text-sm font-medium text-white/96 sm:text-base">
                  {{ endpointUrl }}
                </code>
              </div>
            </div>

            <button
              type="button"
              class="home-copy-button home-glow-button inline-flex items-center justify-center gap-2 rounded-[20px] px-5 py-3 text-sm font-semibold text-[#10151d]"
              @click="emit('copyEndpoint')"
            >
              <Icon :name="copiedEndpoint ? 'check' : 'copy'" size="sm" />
              <span>{{ copiedEndpoint ? '已复制地址' : '复制地址' }}</span>
            </button>
          </div>

          <div class="home-reveal mt-6 flex flex-wrap gap-3">
            <router-link
              :to="isAuthenticated ? dashboardPath : '/login'"
              class="home-primary-button home-glow-button group inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-semibold text-[#10151d]"
            >
              <span>{{ isAuthenticated ? '进入控制台' : '开始使用' }}</span>
              <Icon
                name="arrowRight"
                size="sm"
                class="transition duration-300 group-hover:translate-x-0.5"
              />
            </router-link>

            <a
              href="#capabilities"
              class="home-secondary-button home-hover-card inline-flex items-center gap-3 rounded-full px-5 py-3 text-sm font-semibold text-white/94 transition"
            >
              <Icon name="sparkles" size="sm" />
              查看支持能力
            </a>
          </div>
        </div>

        <div class="home-reveal relative hidden lg:block">
          <div class="home-side-panel rounded-[32px] p-5">
            <div class="flex items-center justify-between">
              <div>
                <p class="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f4d08b]/80">
                  Dispatch
                </p>
                <p class="mt-2 text-lg font-semibold text-white">模型性能</p>
              </div>
              <span class="inline-flex h-2.5 w-2.5 rounded-full bg-[#77c7ff] shadow-[0_0_22px_rgba(119,199,255,0.9)]" />
            </div>

            <div class="mt-5 grid gap-3">
              <div class="home-side-card rounded-[22px] p-4">
                <p class="text-xs text-slate-400">可用性保障</p>
                <p class="mt-2 text-[2rem] font-semibold tracking-[-0.08em] text-white">99.9%</p>
              </div>
              <div class="home-side-card rounded-[22px] p-4">
                <p class="text-xs text-slate-400">平均响应</p>
                <p class="mt-2 text-[2rem] font-semibold tracking-[-0.08em] text-white">300ms</p>
              </div>
              <div class="home-side-card rounded-[22px] p-4">
                <p class="text-xs text-slate-400">支持模型</p>
                <p class="mt-2 text-[2rem] font-semibold tracking-[-0.08em] text-white">20+</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-hero-kicker {
  border: 1px solid rgba(244, 208, 139, 0.2);
  color: #ffe3a8;
  background: linear-gradient(135deg, rgba(244, 208, 139, 0.12), rgba(74, 168, 255, 0.08));
  box-shadow:
    0 0 24px rgba(244, 208, 139, 0.08),
    inset 0 1px 0 rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(18px);
}

.home-hero-title {
  font-size: clamp(3.5rem, 7.8vw, 7.3rem);
  line-height: 0.9;
  letter-spacing: -0.12em;
  font-weight: 800;
}

.home-hero-title-glow {
  display: inline-block;
  padding-right: 0.08em;
  background: linear-gradient(135deg, #ffffff 0%, #f6dfaa 36%, #7ecbff 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  text-shadow:
    0 0 30px rgba(244, 208, 139, 0.12),
    0 0 48px rgba(74, 168, 255, 0.1);
}

.home-console-card,
.home-side-panel {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(145deg, rgba(15, 31, 54, 0.78), rgba(9, 15, 26, 0.58));
  box-shadow:
    0 24px 84px rgba(4, 10, 28, 0.32),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(24px);
}

.home-side-card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.04);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.06);
}

.home-copy-button,
.home-primary-button {
  border: 1px solid rgba(244, 208, 139, 0.3);
  background: linear-gradient(135deg, #f8d992, #d4a44c 55%, #7bbcff);
  box-shadow:
    0 18px 42px rgba(214, 168, 79, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.34);
}

.home-secondary-button {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
}
</style>
