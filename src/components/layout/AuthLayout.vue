<template>
  <div class="relative flex min-h-screen items-center justify-center overflow-hidden p-4">
    <!-- Background -->
    <div
      class="absolute inset-0 bg-zinc-50 dark:bg-zinc-950 transition-colors duration-300 z-0"
    ></div>

    <!-- Fine Noise Grain Overlay -->
    <div class="noise-overlay z-0"></div>

    <!-- Interactive Canvas Waves -->
    <canvas ref="canvasRef" class="absolute inset-0 pointer-events-none z-0"></canvas>

    <!-- Decorative Elements -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden z-0">
      <!-- Monochrome Gradient Orbs -->
      <div
        class="absolute -right-40 -top-40 h-80 w-80 rounded-full bg-zinc-300/10 dark:bg-zinc-800/10 blur-3xl"
      ></div>
      <div
        class="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-zinc-400/10 dark:bg-zinc-900/10 blur-3xl"
      ></div>

      <!-- Grid Pattern -->
      <div
        class="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.012)_1px,transparent_1px)] dark:bg-[linear-gradient(rgba(255,255,255,0.008)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.008)_1px,transparent_1px)] bg-[size:64px_64px]"
      ></div>
    </div>

    <!-- Content Container -->
    <div class="relative z-10 w-full max-w-md">
      <!-- Logo/Brand (with Staggered Entry) -->
      <div class="mb-8 text-center animate-fade-in-up" style="animation-delay: 100ms;">
        <!-- Custom Logo or Default Logo -->
        <template v-if="settingsLoaded">
          <div
            class="logo-container mb-4 inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/80 shadow-md shadow-zinc-500/5 backdrop-blur-sm transition-transform duration-500 hover:scale-110 hover:rotate-3"
          >
            <img :src="siteLogo || '/logo.png'" alt="Logo" class="h-full w-full object-contain" />
          </div>
          <h1 class="text-gradient mb-2 text-3xl font-bold tracking-tight">
            {{ siteName }}
          </h1>
          <p class="text-sm text-zinc-500 dark:text-zinc-400">
            {{ siteSubtitle }}
          </p>
        </template>
      </div>

      <!-- Card Container (with 3D Parallax Tilt and Staggered Entry) -->
      <div
        ref="cardRef"
        @mousemove="handleCardMouseMove"
        @mouseleave="handleCardMouseLeave"
        class="login-card border border-zinc-200/50 dark:border-zinc-800/50 bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md rounded-2xl p-8 shadow-[0_8px_30px_rgb(0,0,0,0.02)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.15)] animate-fade-in-up"
        style="animation-delay: 250ms; transform-style: preserve-3d; will-change: transform; transition: transform 0.15s ease-out;"
      >
        <slot />
      </div>

      <!-- Footer Links (Staggered Entry) -->
      <div class="mt-6 text-center text-sm animate-fade-in-up" style="animation-delay: 400ms;">
        <slot name="footer" />
      </div>

      <!-- Copyright (Staggered Entry) -->
      <div class="mt-8 text-center text-xs text-zinc-400 dark:text-zinc-500 animate-fade-in-up" style="animation-delay: 500ms;">
        &copy; {{ currentYear }} {{ siteName }}. All rights reserved.
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useAppStore } from '@/stores'
import { sanitizeUrl } from '@/utils/url'

const appStore = useAppStore()

const siteName = computed(() => appStore.siteName || 'Sub2API')
const siteLogo = computed(() => sanitizeUrl(appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const siteSubtitle = computed(() => appStore.cachedPublicSettings?.site_subtitle || 'Subscription to API Conversion Platform')
const settingsLoaded = computed(() => appStore.publicSettingsLoaded)

const currentYear = computed(() => new Date().getFullYear())

// 3D Parallax Tilt logic
const cardRef = ref<HTMLElement | null>(null)
const handleCardMouseMove = (e: MouseEvent) => {
  const card = cardRef.value
  if (!card) return
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left - rect.width / 2
  const y = e.clientY - rect.top - rect.height / 2
  
  // Calculate tilt angle (max 3 degrees for subtle effect)
  const tiltX = (y / (rect.height / 2)) * -3
  const tiltY = (x / (rect.width / 2)) * 3
  
  card.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`
}

const handleCardMouseLeave = () => {
  const card = cardRef.value
  if (!card) return
  card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`
}

// Canvas configuration and logic
const canvasRef = ref<HTMLCanvasElement | null>(null)
let animationId = 0
let handleResize: () => void

const mouse = { x: 0, y: 0, tx: 0, ty: 0 }
const handleMouseMove = (e: MouseEvent) => {
  mouse.tx = e.clientX
  mouse.ty = e.clientY
}

onMounted(() => {
  appStore.fetchPublicSettings()

  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('2d')
  if (!ctx) return

  const resize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
  }
  handleResize = resize
  window.addEventListener('resize', handleResize)
  resize()

  window.addEventListener('mousemove', handleMouseMove)

  mouse.tx = mouse.x = window.innerWidth / 2
  mouse.ty = mouse.y = window.innerHeight / 2

  // 4 beautiful intersecting waves
  const waves = [
    {
      amplitude: 55,
      frequency: 0.0012,
      speed: 0.007,
      phase: 0,
      color: {
        light: 'rgba(0, 0, 0, 0.015)',
        dark: 'rgba(255, 255, 255, 0.025)'
      }
    },
    {
      amplitude: 40,
      frequency: 0.002,
      speed: -0.005,
      phase: Math.PI / 4,
      color: {
        light: 'rgba(0, 0, 0, 0.012)',
        dark: 'rgba(255, 255, 255, 0.018)'
      }
    },
    {
      amplitude: 65,
      frequency: 0.0008,
      speed: 0.004,
      phase: Math.PI / 2,
      color: {
        light: 'rgba(0, 0, 0, 0.008)',
        dark: 'rgba(255, 255, 255, 0.012)'
      }
    },
    {
      amplitude: 25,
      frequency: 0.003,
      speed: -0.008,
      phase: Math.PI / 1.5,
      color: {
        light: 'rgba(0, 0, 0, 0.006)',
        dark: 'rgba(255, 255, 255, 0.008)'
      }
    }
  ]

  let waveLoadFactor = 0

  const animate = () => {
    const w = canvas.width
    const h = canvas.height
    ctx.clearRect(0, 0, w, h)

    // Wave smooth fade-in reveal on load
    if (waveLoadFactor < 1) {
      waveLoadFactor += 0.015
    }

    mouse.x += (mouse.tx - mouse.x) * 0.04
    mouse.y += (mouse.ty - mouse.y) * 0.04

    const isDark = document.documentElement.classList.contains('dark')

    waves.forEach((wave) => {
      ctx.beginPath()
      ctx.strokeStyle = isDark ? wave.color.dark : wave.color.light
      ctx.lineWidth = 1

      for (let x = 0; x < w; x++) {
        const mouseDistance = Math.abs(x - mouse.x)
        const influence = Math.max(0, 1 - mouseDistance / 450)
        const dy = (mouse.y - h / 2) * influence * 0.18

        const y =
          h * 0.5 +
          dy +
          Math.sin(x * wave.frequency + wave.phase) * wave.amplitude * waveLoadFactor

        if (x === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      }

      ctx.stroke()
      wave.phase += wave.speed
    })

    animationId = requestAnimationFrame(animate)
  }

  animate()
})

onUnmounted(() => {
  if (handleResize) {
    window.removeEventListener('resize', handleResize)
  }
  window.removeEventListener('mousemove', handleMouseMove)
  cancelAnimationFrame(animationId)
})
</script>

<style scoped>
.text-gradient {
  @apply bg-gradient-to-r from-zinc-900 via-zinc-800 to-zinc-900 dark:from-zinc-100 dark:via-zinc-300 dark:to-zinc-100 bg-clip-text text-transparent;
}

/* Subtle Film Noise Overlay */
.noise-overlay {
  position: absolute;
  inset: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.015;
  pointer-events: none;
}
.dark .noise-overlay {
  opacity: 0.025;
}

/* Staggered transition Entry Animation */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(16px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in-up {
  opacity: 0;
  animation: fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

.logo-container:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(9, 9, 11, 0.05);
}
.dark .logo-container:hover {
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(250, 250, 250, 0.05);
}
</style>
