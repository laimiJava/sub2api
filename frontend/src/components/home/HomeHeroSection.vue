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
    <div class="mx-auto max-w-7xl pb-4 pt-4 xl:pb-6">
      <div class="grid gap-6 lg:grid-cols-[minmax(0,1fr)_17rem] lg:items-end xl:grid-cols-[minmax(0,1fr)_18rem]">
        <div class="relative z-10 max-w-[1080px]">
          <div class="home-reveal relative">
            <div class="absolute -left-10 top-6 h-28 w-28 rounded-full bg-[#5d69ff]/14 blur-3xl" />
            <div class="absolute left-36 top-20 h-24 w-24 rounded-full bg-[#54bfff]/10 blur-3xl" />

            <p
              class="mb-3 inline-flex items-center rounded-full border border-[#8fa4ff]/16 bg-[linear-gradient(180deg,rgba(135,149,255,0.16),rgba(82,192,255,0.08))] px-4 py-2 text-[12px] font-semibold tracking-[0.28em] text-[#dbe3ff] shadow-[0_0_30px_rgba(104,122,255,0.12)] backdrop-blur-xl"
            >
              更稳定 更快速 更智能
            </p>

            <h1
              class="relative text-[clamp(3.1rem,7.2vw,7rem)] font-semibold leading-[0.84] tracking-[-0.12em] text-white"
            >
              <span class="text-white/96">大模型</span>
              <span
                class="mx-[0.06em] bg-[linear-gradient(92deg,#ffffff_0%,#d5ddff_18%,#8ca2ff_52%,#67c8ff_100%)] bg-clip-text text-transparent"
              >
                接口
              </span>
              <span class="text-white">网关</span>
            </h1>
          </div>

          <div class="home-reveal relative mt-4 max-w-3xl">
            <div class="absolute -inset-x-8 -top-4 h-20 rounded-full bg-[#6776ff]/10 blur-3xl" />
            <p class="relative text-[15px] leading-7 text-slate-300/82 sm:text-base">
              更好的价格，更好的稳定性，只需要将模型基址替换为:
            </p>
          </div>

          <div
            class="home-reveal mt-4 rounded-[28px] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-4 shadow-[0_20px_64px_rgba(6,12,30,0.28)] backdrop-blur-2xl"
          >
            <div class="flex flex-col gap-3 lg:flex-row lg:items-center">
              <div class="min-w-0 flex-1">
                <p class="mb-2 text-[11px] font-semibold uppercase tracking-[0.32em] text-slate-400">
                  接入地址
                </p>
                <code class="block truncate text-sm font-medium text-white/96 sm:text-base">
                  {{ endpointUrl }}
                </code>
              </div>

              <button
                type="button"
                class="home-glow-button inline-flex items-center justify-center gap-2 rounded-full border border-white/12 bg-white/[0.09] px-5 py-3 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_12px_34px_rgba(69,86,255,0.16)] backdrop-blur-xl"
                @click="emit('copyEndpoint')"
              >
                <Icon :name="copiedEndpoint ? 'check' : 'copy'" size="sm" />
                <span>{{ copiedEndpoint ? '已复制' : '复制地址' }}</span>
              </button>
            </div>
          </div>

          <div class="home-reveal mt-4 flex flex-wrap gap-3">
            <router-link
              :to="isAuthenticated ? dashboardPath : '/login'"
              class="home-glow-button group relative inline-flex items-center gap-3 overflow-hidden rounded-full border border-white/14 bg-[linear-gradient(180deg,rgba(255,255,255,0.34),rgba(255,255,255,0.06))] px-6 py-3 text-sm font-semibold text-white shadow-[0_18px_60px_rgba(65,87,255,0.24),inset_0_1px_0_rgba(255,255,255,0.36)] backdrop-blur-2xl"
            >
              <span class="absolute inset-[1px] rounded-full bg-[linear-gradient(135deg,rgba(114,124,255,0.88),rgba(74,205,255,0.44))]" />
              <span class="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-white/60 to-transparent" />
              <span class="relative z-10">{{ isAuthenticated ? '进入控制台' : '开始使用' }}</span>
              <Icon
                name="arrowRight"
                size="sm"
                class="relative z-10 transition duration-300 group-hover:translate-x-0.5"
              />
            </router-link>

            <a
              href="#capabilities"
              class="home-hover-card inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-semibold text-white/94 backdrop-blur-xl transition hover:bg-white/[0.08]"
            >
              <Icon name="sparkles" size="sm" />
              直接查看支持模型
            </a>
          </div>
        </div>

        <div class="home-reveal relative hidden lg:block">
          <div class="rounded-[30px] border border-white/10 bg-white/[0.04] p-4 shadow-[0_20px_64px_rgba(4,10,28,0.22)] backdrop-blur-2xl">
            <div class="flex items-center justify-between">
              <span class="text-[11px] font-semibold uppercase tracking-[0.28em] text-slate-400">
                全球调度
              </span>
              <span class="inline-flex h-2.5 w-2.5 rounded-full bg-[#77c7ff] shadow-[0_0_22px_rgba(119,199,255,0.9)]" />
            </div>
            <div class="mt-3 space-y-3">
              <div class="rounded-[20px] border border-white/8 bg-[#0a1023]/82 p-4">
                <p class="text-xs text-slate-400">可用性保障</p>
                <p class="mt-2 text-[2rem] font-semibold tracking-[-0.08em] text-white">99%</p>
              </div>
              <div class="rounded-[20px] border border-white/8 bg-[#0a1023]/82 p-4">
                <p class="text-xs text-slate-400">平均响应时间</p>
                <p class="mt-2 text-[2rem] font-semibold tracking-[-0.08em] text-white">300ms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
