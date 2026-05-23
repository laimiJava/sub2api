<template>
  <div class="page-shell">
    <!-- Background elements -->
    <div class="grid-bg" aria-hidden="true"></div>
    <div class="halo halo-gold" aria-hidden="true"></div>
    <div class="halo halo-blue" aria-hidden="true"></div>
    <div class="data-line line-a" aria-hidden="true"></div>
    <div class="data-line line-b" aria-hidden="true"></div>
    
    <!-- Canvas for interactive waves -->
    <canvas ref="canvasRef" class="canvas-waves" aria-hidden="true"></canvas>

    <!-- Left Brand Column (Desktop only) -->
    <section class="brand-area reveal-left">
      <header class="brand-head">
        <div class="logo-wrap" aria-label="Sub2API Logo">
          <svg viewBox="0 0 72 72" role="img">
            <defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#f6d58b"/><stop offset=".55" stop-color="#4aa8ff"/><stop offset="1" stop-color="#edf4ff"/></linearGradient></defs>
            <path d="M36 6 62 21v30L36 66 10 51V21L36 6Z" fill="rgba(255,255,255,.05)" stroke="url(#g)" stroke-width="2.4"/>
            <path d="M23 45V28l13-8 13 8v17" fill="none" stroke="url(#g)" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>
            <circle cx="36" cy="36" r="6" fill="url(#g)"/>
          </svg>
        </div>
        <div>
          <p class="eyebrow">LAIMI GATEWAY SERVICE</p>
          <h1>{{ siteName }}</h1>
        </div>
      </header>

      <div class="hero-copy">
        <p class="badge">订阅转 API 数字化升级方案</p>
        <h2>企业及AI管理平台</h2>
        <p>让用户像使用水电一样使用ai。统一接入与转换多种第三方订阅与平台接口，集中控制限额、调用日志、缓存与成本审计，为您的 AI 业务提供极速、稳定的网络与模型调用能力。</p>
      </div>

      <div class="selling-points">
        <article>
          <span class="icon icon-model"></span>
          <h3>多链接一键转换</h3>
          <p>自动将各种格式的订阅链接转换为统一的标准 OpenAI API 格式。</p>
        </article>
        <article>
          <span class="icon icon-auth"></span>
          <h3>智能缓存与分发</h3>
          <p>自定义缓存策略，大幅降低重复调用延迟，提升业务响应速度。</p>
        </article>
        <article>
          <span class="icon icon-safe"></span>
          <h3>额度与安全审计</h3>
          <p>细粒度控制密钥额度与到期时间，留存每一次 API 请求的流控日志。</p>
        </article>
      </div>

      <section class="cockpit" aria-label="API 运行驾驶舱">
        <div class="cockpit-head">
          <div>
            <span>LAIMI 运行驾驶舱</span>
            <strong>今日网关运行概览</strong>
          </div>
          <em>安全运行中</em>
        </div>
        <div class="metrics">
          <article>
            <span>今日转换量</span>
            <strong>186,420</strong>
            <small>较昨日 +15.4%</small>
          </article>
          <article>
            <span>响应耗时</span>
            <strong>125 ms</strong>
            <small>智能路由加速</small>
          </article>
          <article>
            <span>运行节点</span>
            <strong>8 个</strong>
            <small>状态全部正常</small>
          </article>
        </div>
        <div class="cockpit-grid">
          <div class="panel">
            <div class="panel-title">
              <b>7日请求趋势</b>
              <span>调用量</span>
            </div>
            <div class="bars">
              <i style="--h:42%"></i>
              <i style="--h:58%"></i>
              <i style="--h:48%"></i>
              <i style="--h:72%"></i>
              <i style="--h:64%"></i>
              <i style="--h:82%"></i>
              <i style="--h:90%"></i>
            </div>
          </div>
          <div class="panel">
            <div class="panel-title">
              <b>通道使用排行</b>
              <span>本月</span>
            </div>
            <ul class="rank">
              <li><span>营销中心</span><b>32%</b></li>
              <li><span>客户服务部</span><b>26%</b></li>
              <li><span>数据分析组</span><b>18%</b></li>
            </ul>
          </div>
        </div>
      </section>
    </section>

    <!-- Right Credentials Column -->
    <section class="login-area reveal-right">
      <div class="mobile-logo-header">
        <div class="logo-container inline-flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900/80 shadow-md">
          <img :src="siteLogo || '/logo.png'" alt="Logo" class="h-full w-full object-contain" />
        </div>
        <h1 class="text-xl font-bold tracking-tight mt-2 text-white">{{ siteName }}</h1>
        <p class="text-xs text-zinc-400 mt-1">{{ siteSubtitle }}</p>
      </div>

      <div
        ref="cardRef"
        @mousemove="handleCardMouseMove"
        @mouseleave="handleCardMouseLeave"
        class="login-card"
        style="transform-style: preserve-3d; will-change: transform; transition: transform 0.15s ease-out;"
      >
        <slot />
      </div>

      <div class="footer-links">
        <slot name="footer" />
      </div>

      <div class="copyright">
        &copy; {{ currentYear }} {{ siteName }}. All rights reserved.
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useAppStore } from '@/stores'
import { sanitizeUrl } from '@/utils/url'

const appStore = useAppStore()

const siteName = computed(() => appStore.siteName || 'LAIMI')
const siteLogo = computed(() => sanitizeUrl(appStore.siteLogo || '', { allowRelative: true, allowDataUrl: true }))
const siteSubtitle = computed(() => appStore.cachedPublicSettings?.site_subtitle || 'Subscription to API Conversion Platform')

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
        light: 'rgba(255, 255, 255, 0.02)',
        dark: 'rgba(255, 255, 255, 0.025)'
      }
    },
    {
      amplitude: 40,
      frequency: 0.002,
      speed: -0.005,
      phase: Math.PI / 4,
      color: {
        light: 'rgba(255, 255, 255, 0.015)',
        dark: 'rgba(255, 255, 255, 0.018)'
      }
    },
    {
      amplitude: 65,
      frequency: 0.0008,
      speed: 0.004,
      phase: Math.PI / 2,
      color: {
        light: 'rgba(255, 255, 255, 0.01)',
        dark: 'rgba(255, 255, 255, 0.012)'
      }
    },
    {
      amplitude: 25,
      frequency: 0.003,
      speed: -0.008,
      phase: Math.PI / 1.5,
      color: {
        light: 'rgba(255, 255, 255, 0.006)',
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

    waves.forEach((wave) => {
      ctx.beginPath()
      ctx.strokeStyle = wave.color.dark
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
.page-shell {
  --black: #070b12;
  --blue: #0b1d35;
  --gold: #f4d08b;
  --gold2: #d2a34d;
  --tech: #4aa8ff;
  --silver: #c7d2df;
  --muted: #8797aa;
  --glass: rgba(12, 24, 42, 0.64);
  --border: rgba(255, 255, 255, 0.14);
  --shadow: 0 30px 90px rgba(0, 0, 0, 0.46);

  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(380px, 0.8fr);
  gap: 48px;
  min-height: 100vh;
  padding: 56px clamp(24px, 5vw, 84px);
  overflow-x: hidden;
  overflow-y: auto;
  color: #eef5ff;
  background: radial-gradient(circle at 18% 16%, rgba(244, 208, 139, 0.16), transparent 30%),
              radial-gradient(circle at 86% 28%, rgba(74, 168, 255, 0.17), transparent 30%),
              linear-gradient(135deg, var(--black), #081529 52%, #04070d);
  font-family: "Microsoft YaHei", "PingFang SC", "Segoe UI", Arial, sans-serif;
  z-index: 1;
}

/* Background elements */
.grid-bg {
  position: fixed;
  inset: 0;
  background-image: linear-gradient(rgba(255, 255, 255, 0.045) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(255, 255, 255, 0.045) 1px, transparent 1px);
  background-size: 52px 52px;
  mask-image: radial-gradient(circle at center, #000, transparent 78%);
  pointer-events: none;
  z-index: 0;
}

.canvas-waves {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  opacity: 0.8;
}

.halo, .data-line {
  position: fixed;
  z-index: 0;
  pointer-events: none;
}

.halo {
  width: 360px;
  height: 360px;
  border-radius: 50%;
  filter: blur(66px);
  opacity: 0.38;
}

.halo-gold {
  left: -120px;
  top: 100px;
  background: rgba(214, 168, 79, 0.58);
}

.halo-blue {
  right: -120px;
  bottom: 70px;
  background: rgba(74, 168, 255, 0.5);
}

.data-line {
  width: 430px;
  height: 1px;
  background: linear-gradient(90deg, transparent, rgba(244, 208, 139, 0.68), transparent);
  animation: stream 7s linear infinite;
}

.line-a {
  top: 22%;
  right: 18%;
  transform: rotate(-18deg);
}

.line-b {
  left: 7%;
  bottom: 18%;
  animation-delay: 2.8s;
  transform: rotate(-18deg);
}

/* Brand area */
.brand-area {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 920px;
  text-align: left;
}

.brand-head {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 40px;
}

.logo-wrap {
  display: grid;
  place-items: center;
  width: 72px;
  height: 72px;
  border: 1px solid rgba(244, 208, 139, 0.28);
  border-radius: 22px;
  background: linear-gradient(145deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.025));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.14), 0 18px 44px rgba(0, 0, 0, 0.36);
}

.logo-wrap svg {
  width: 50px;
  height: 50px;
}

.eyebrow {
  margin: 0 0 8px;
  color: var(--gold);
  font-size: 12px;
  letter-spacing: 0.18em;
  font-weight: 600;
}

.brand-head h1 {
  margin: 0;
  font-size: clamp(22px, 2.2vw, 32px);
  letter-spacing: 0.03em;
  font-weight: 700;
  color: #fff;
}

.badge {
  display: inline-flex;
  margin: 0 0 18px;
  padding: 9px 14px;
  color: #ffe3a8;
  border: 1px solid rgba(244, 208, 139, 0.25);
  border-radius: 999px;
  background: rgba(244, 208, 139, 0.08);
  align-self: flex-start;
  font-size: 13px;
}

.hero-copy h2 {
  margin: 0;
  max-width: 760px;
  font-size: clamp(32px, 4vw, 54px);
  line-height: 1.15;
  letter-spacing: -0.02em;
  font-weight: 800;
  background: linear-gradient(135deg, #fff, #e8edf5 35%, #f4d08b 76%, #fff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-copy p {
  max-width: 720px;
  margin: 18px 0 0;
  color: var(--silver);
  font-size: clamp(14px, 1.1vw, 16px);
  line-height: 1.8;
}

/* Selling points */
.selling-points {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
  margin: 28px 0;
}

.selling-points article {
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  background: linear-gradient(150deg, rgba(255, 255, 255, 0.07), rgba(255, 255, 255, 0.015));
  backdrop-filter: blur(16px);
}

.icon {
  position: relative;
  display: block;
  width: 34px;
  height: 34px;
  margin-bottom: 13px;
  border: 1px solid rgba(74, 168, 255, 0.24);
  border-radius: 12px;
  background: rgba(74, 168, 255, 0.12);
}

.icon::before, .icon::after {
  content: "";
  position: absolute;
}

.icon-model::before {
  inset: 9px;
  border: 2px solid var(--gold);
  border-radius: 50%;
}

.icon-model::after {
  left: 16px;
  top: 5px;
  width: 2px;
  height: 24px;
  background: var(--tech);
  transform: rotate(45deg);
}

.icon-auth::before {
  left: 9px;
  top: 8px;
  width: 16px;
  height: 18px;
  border: 2px solid var(--gold);
  border-radius: 4px;
}

.icon-auth::after {
  left: 14px;
  top: 4px;
  width: 8px;
  height: 10px;
  border: 2px solid var(--tech);
  border-bottom: 0;
  border-radius: 8px 8px 0 0;
}

.icon-safe::before {
  left: 8px;
  top: 7px;
  width: 18px;
  height: 20px;
  background: linear-gradient(135deg, rgba(244, 208, 139, 0.95), rgba(74, 168, 255, 0.48));
  clip-path: polygon(50% 0, 88% 18%, 78% 75%, 50% 100%, 22% 75%, 12% 18%);
}

.selling-points h3 {
  margin: 0 0 7px;
  font-size: 15px;
  font-weight: 600;
  color: #fff;
}

.selling-points p {
  margin: 0;
  color: #9dadc0;
  font-size: 13px;
  line-height: 1.55;
}

/* Cockpit Panel */
.cockpit {
  max-width: 760px;
  padding: 24px;
  border-radius: 30px;
  border: 1px solid var(--border);
  background: linear-gradient(145deg, rgba(15, 31, 54, 0.78), rgba(9, 15, 26, 0.58));
  box-shadow: var(--shadow), inset 0 1px 0 rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(24px);
}

.cockpit-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 18px;
}

.cockpit-head span {
  color: #8fa2b7;
  font-size: 12px;
}

.cockpit-head strong {
  display: block;
  margin-top: 6px;
  font-size: 20px;
  font-weight: 700;
  color: #fff;
}

.cockpit-head em {
  padding: 8px 12px;
  color: #dbf6ff;
  font-style: normal;
  font-size: 12px;
  border: 1px solid rgba(74, 168, 255, 0.28);
  border-radius: 999px;
  background: rgba(74, 168, 255, 0.1);
}

.metrics {
  display: flex;
  gap: 14px;
  margin-bottom: 16px;
}

.metrics article {
  flex: 1;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.09);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.045);
  text-align: left;
}

.metrics span {
  color: #8fa2b7;
  font-size: 12px;
}

.metrics strong {
  display: block;
  margin: 8px 0 5px;
  font-size: clamp(20px, 2vw, 26px);
  font-weight: 700;
  color: #fff;
}

.metrics small {
  color: #52d6a3;
  font-size: 12px;
}

.cockpit-grid {
  display: flex;
  gap: 16px;
}

.panel {
  flex: 1;
  min-height: 168px;
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  border-radius: 20px;
  background: rgba(3, 9, 18, 0.34);
  text-align: left;
}

.panel-title {
  display: flex;
  justify-content: space-between;
  margin-bottom: 18px;
}

.panel-title b {
  font-size: 14px;
  font-weight: 600;
  color: #fff;
}

.panel-title span {
  color: #8fa2b7;
  font-size: 12px;
}

.bars {
  display: flex;
  align-items: end;
  gap: 11px;
  height: 100px;
}

.bars i {
  flex: 1;
  height: var(--h);
  min-height: 24px;
  border-radius: 999px 999px 4px 4px;
  background: linear-gradient(180deg, var(--gold), rgba(74, 168, 255, 0.74));
  box-shadow: 0 0 18px rgba(74, 168, 255, 0.2);
}

.rank {
  display: grid;
  gap: 14px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.rank li {
  display: flex;
  justify-content: space-between;
  padding-bottom: 12px;
  color: #cbd7e4;
  font-size: 13px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.08);
}

.rank b {
  color: var(--gold);
}

/* Credentials Column / Login Area */
.login-area {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mobile-logo-header {
  display: none;
  text-align: center;
  margin-bottom: 24px;
}

.login-card {
  width: min(100%, 470px);
  padding: clamp(24px, 4vw, 40px);
  border-radius: 34px;
  border: 1px solid var(--border);
  background: linear-gradient(145deg, rgba(15, 31, 54, 0.78), rgba(9, 15, 26, 0.58));
  box-shadow: var(--shadow), inset 0 1px 0 rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(24px);
}

.footer-links {
  margin-top: 22px;
  display: flex;
  justify-content: center;
  color: #d7e1ed;
  font-size: 14px;
}

.copyright {
  margin-top: 30px;
  color: #91a4b7;
  font-size: 12px;
  text-align: center;
}

/* Animations */
.reveal-left, .reveal-right {
  opacity: 0;
  animation: fade 0.85s ease forwards;
}

.reveal-right {
  animation-delay: 0.15s;
}

@keyframes fade {
  from {
    opacity: 0;
    transform: translateY(22px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes stream {
  from {
    opacity: 0;
    transform: translateX(-160px) rotate(-18deg);
  }
  30%, 70% {
    opacity: 0.75;
  }
  to {
    opacity: 0;
    transform: translateX(220px) rotate(-18deg);
  }
}

/* Responsive Queries */
@media (max-width: 1024px) {
  .page-shell {
    grid-template-columns: 1fr;
    gap: 34px;
    padding: 40px 20px;
  }
  
  .brand-area {
    display: none; /* Hide brand area on tablet/mobile and show mobile-logo-header */
  }

  .mobile-logo-header {
    display: block;
  }

  .login-area {
    place-items: center;
  }
}

@media (max-width: 480px) {
  .page-shell {
    padding: 24px 12px;
  }

  .login-card {
    padding: 24px 16px;
    border-radius: 24px;
  }
}
</style>
