<script setup lang="ts">
import Icon from '@/components/icons/Icon.vue'
import type { HomeFeature, HomeModelPill } from './types'

defineProps<{
  features: HomeFeature[]
  models: HomeModelPill[]
}>()
</script>

<template>
  <section id="capabilities" class="relative px-4 pb-6 pt-4 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <div class="grid gap-4 xl:grid-cols-3">
        <article
          v-for="feature in features"
          :key="feature.title"
          class="home-feature-card home-reveal home-hover-card group relative overflow-hidden rounded-[30px] p-6"
        >
          <div
            class="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/45 to-transparent opacity-70"
          />
          <div
            class="absolute -right-10 top-8 h-24 w-24 rounded-full blur-3xl transition duration-500 group-hover:scale-110"
            :style="{ background: `${feature.glow}30` }"
          />

          <div
            class="home-float inline-flex h-12 w-12 items-center justify-center rounded-[16px] border border-white/10 shadow-[0_16px_36px_rgba(8,14,36,0.2),inset_0_1px_0_rgba(255,255,255,0.18)]"
            :style="{ background: feature.iconBackground }"
          >
            <Icon :name="feature.icon" size="md" class="text-white" />
          </div>

          <h3 class="mt-5 text-[1.55rem] font-semibold tracking-[-0.06em] text-white">
            {{ feature.title }}
          </h3>
          <p class="mt-3 max-w-[28rem] text-[14px] leading-6 text-slate-300/78">
            {{ feature.description }}
          </p>
        </article>
      </div>

      <div class="home-model-panel home-reveal relative mt-5 overflow-hidden rounded-[34px] px-5 py-8 sm:px-7">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(244,208,139,0.14),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(74,168,255,0.12),transparent_26%)]" />
        <div class="relative z-10 text-center">
          <h2 class="text-[1.9rem] font-semibold tracking-[-0.08em] text-white sm:text-[2.3rem]">
            已支持的 AI 模型
          </h2>
          <p class="mt-2 text-sm text-slate-300/72 sm:text-[15px]">一个 API，覆盖多种能力选择</p>
        </div>

        <div class="relative z-10 mt-6 flex flex-wrap items-center justify-center gap-3">
          <article
            v-for="model in models"
            :key="model.name"
            class="home-model-card home-hover-card flex min-w-[210px] items-center gap-4 rounded-[20px] px-5 py-3.5 transition sm:min-w-[236px]"
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-2xl text-base font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.18)]"
              :style="{ background: model.color }"
            >
              {{ model.initial }}
            </div>

            <div class="min-w-0 flex-1">
              <div class="flex items-center gap-3">
                <h3 class="truncate text-[1.45rem] font-medium tracking-[-0.06em] text-white">
                  {{ model.name }}
                </h3>
                <span
                  v-if="model.status"
                  class="rounded-full border border-[#72eadf]/24 bg-[#72eadf]/14 px-3 py-1 text-xs font-semibold text-[#8ef5eb]"
                >
                  {{ model.status }}
                </span>
              </div>
            </div>
          </article>

          <article
            class="home-model-card home-hover-card flex min-w-[210px] items-center gap-4 rounded-[20px] px-5 py-3.5 text-slate-400 sm:min-w-[236px]"
          >
            <div
              class="flex h-10 w-10 items-center justify-center rounded-2xl bg-white/12 text-lg font-semibold text-white"
            >
              +
            </div>
            <div>
              <h3 class="text-[1.3rem] font-medium tracking-[-0.06em] text-white/88">更多系列模型</h3>
            </div>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.home-feature-card,
.home-model-panel {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: linear-gradient(145deg, rgba(15, 31, 54, 0.78), rgba(9, 15, 26, 0.58));
  box-shadow:
    0 24px 84px rgba(4, 10, 28, 0.28),
    inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(24px);
}

.home-model-card {
  border: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(18px);
}
</style>
