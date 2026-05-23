<template>
  <div v-if="homeContent" class="min-h-screen">
    <iframe
      v-if="isHomeContentUrl"
      :src="homeContent.trim()"
      class="h-screen w-full border-0"
      allowfullscreen
    ></iframe>
    <div v-else v-html="homeContent"></div>
  </div>

  <div v-else class="page-shell relative overflow-hidden">
    <div class="bg-glow glow-left" aria-hidden="true"></div>
    <div class="bg-glow glow-right" aria-hidden="true"></div>
    <div class="bg-glow glow-bottom" aria-hidden="true"></div>
    <div class="bg-ribbon ribbon-top" aria-hidden="true"></div>
    <div class="bg-ribbon ribbon-bottom" aria-hidden="true"></div>
    <div class="bg-grid" aria-hidden="true"></div>
    <div class="bg-particles" aria-hidden="true">
      <span
        v-for="dot in particles"
        :key="dot.id"
        class="particle"
      ></span>
    </div>

    <header class="relative z-30 px-4 pt-5 sm:px-6 lg:px-8">
      <nav class="nav-shell mx-auto flex max-w-7xl items-center justify-between gap-4">
        <div class="brand-group">
          <div class="brand-mark">
            <img :src="siteLogo || '/logo.png'" alt="Logo" class="h-full w-full object-contain" />
          </div>
          <div class="brand-copy">
            <p class="brand-name">{{ siteName }}</p>
            <p class="brand-sub">Premium AI Gateway & Enterprise Platform</p>
          </div>
        </div>

        <div class="nav-links hidden lg:flex">
          <a
            v-for="item in navItems"
            :key="item.label"
            :href="item.href"
            class="nav-link"
          >
            {{ item.label }}
          </a>
        </div>

        <div class="nav-actions">
          <LocaleSwitcher />

          <a
            v-if="docUrl"
            :href="docUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="nav-icon"
            :title="t('home.viewDocs')"
          >
            <Icon name="book" size="md" />
          </a>

          <button
            @click="toggleTheme"
            class="nav-icon"
            :title="isDark ? t('home.switchToLight') : t('home.switchToDark')"
          >
            <Icon v-if="isDark" name="sun" size="md" />
            <Icon v-else name="moon" size="md" />
          </button>

          <router-link
            v-if="isAuthenticated"
            :to="dashboardPath"
            class="nav-button"
          >
            <span class="nav-avatar">{{ userInitial || 'U' }}</span>
            <span>{{ t('home.dashboard') }}</span>
          </router-link>

          <router-link
            v-else
            to="/login"
            class="nav-button"
          >
            {{ t('home.login') }}
          </router-link>
        </div>
      </nav>
    </header>

    <main class="relative z-10">
      <section id="gateway" class="screen-shell first-screen px-4 sm:px-6 lg:px-8">
        <div class="page-container">
          <div class="hero-layout">
            <div class="hero-left">
              <div class="hero-side-label" aria-hidden="true">
                <span></span>
                <p>GATEWAY</p>
                <p>FOR LLM</p>
                <span></span>
              </div>

              <div class="hero-copy">
                <div class="hero-badge">
                  <span class="badge-dot"></span>
                  <span>更稳定 · 更快速 · 更智能</span>
                </div>

                <h1 class="hero-title">
                  大模型<span class="gradient-word">接口</span>网关
                </h1>

                <p class="hero-subtitle">
                  更好的价格，更好的稳定性，只需要将模型基址替换为：
                </p>

                <div class="endpoint-shell">
                  <code class="endpoint-value">{{ endpointUrl }}</code>
                  <button class="copy-button" @click="copyEndpoint">
                    <Icon :name="copiedEndpoint ? 'check' : 'copy'" size="sm" />
                  </button>
                </div>

                <div class="hero-actions">
                  <router-link
                    :to="isAuthenticated ? dashboardPath : '/login'"
                    class="cta-button primary"
                  >
                    <span>{{ isAuthenticated ? t('home.goToDashboard') : '获取密钥' }}</span>
                    <Icon name="arrowRight" size="md" :stroke-width="2" />
                  </router-link>
                </div>

                <p class="copy-feedback" :class="{ visible: copiedEndpoint }">
                  接口地址已复制
                </p>
              </div>
            </div>

            <div class="hero-right">
              <div class="gateway-orb">
                <div class="orb-halo halo-a"></div>
                <div class="orb-halo halo-b"></div>
                <div class="orb-ring ring-a"></div>
                <div class="orb-ring ring-b"></div>
                <div class="orb-ring ring-c"></div>
                <div class="orb-core"></div>
                <div class="orb-trace trace-a"></div>
                <div class="orb-trace trace-b"></div>
              </div>
            </div>
          </div>

          <div class="provider-row">
            <article
              v-for="card in gatewayCards"
              :key="card.title"
              class="provider-card"
              :class="{ stat: card.stat }"
            >
              <div class="provider-icon" :style="{ '--provider-accent': card.accent }">
                <span>{{ card.symbol }}</span>
              </div>
              <div class="provider-copy">
                <p class="provider-title">{{ card.title }}</p>
                <p class="provider-sub">{{ card.subtitle }}</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section id="enterprise" class="screen-shell second-screen px-4 sm:px-6 lg:px-8">
        <div class="page-container">
          <div class="enterprise-layout">
            <div class="enterprise-left">
              <div class="enterprise-badge">
                <span>企业级 <strong>AI</strong> 管理平台</span>
              </div>

              <h2 class="enterprise-title">
                让 <span class="gradient-word">AI</span> 为企业
                <br />
                创造最大价值
              </h2>

              <p class="enterprise-subtitle">
                统一管理 · 安全可控 · 高效协同 · 智能驱动
              </p>

              <div class="capability-icons">
                <article
                  v-for="item in capabilityIcons"
                  :key="item.title"
                  class="capability-item"
                >
                  <div class="capability-icon">
                    <Icon :name="item.icon" size="md" />
                  </div>
                  <p class="capability-title">{{ item.title }}</p>
                </article>
              </div>
            </div>

            <div class="enterprise-center">
              <div class="ai-cube-stage">
                <div
                  v-for="item in floatingInsights"
                  :key="item.title"
                  class="floating-insight"
                  :class="item.position"
                >
                  <div class="floating-insight-icon">
                    <Icon :name="item.icon" size="sm" />
                  </div>
                  <div>
                    <p class="floating-insight-title">{{ item.title }}</p>
                    <p class="floating-insight-text">{{ item.text }}</p>
                  </div>
                </div>

                <div class="cube-orbit orbit-one"></div>
                <div class="cube-orbit orbit-two"></div>
                <div class="cube-base base-one"></div>
                <div class="cube-base base-two"></div>
                <div class="cube-base base-three"></div>
                <div class="cube-main">
                  <div class="cube-face cube-front">AI</div>
                  <div class="cube-face cube-side"></div>
                  <div class="cube-face cube-top"></div>
                </div>

                <div class="permission-pill">
                  <Icon name="lock" size="sm" />
                  <span>企业专属 AI 账号与权限体系</span>
                </div>
              </div>
            </div>

            <div class="enterprise-right">
              <article
                v-for="panel in enterprisePanels"
                :key="panel.title"
                class="management-panel"
              >
                <div class="panel-head">
                  <p class="panel-title">{{ panel.title }}</p>
                  <span class="panel-more">···</span>
                </div>

                <div v-if="panel.type === 'departments'" class="panel-grid">
                  <div
                    v-for="item in panel.items"
                    :key="item.label"
                    class="panel-icon-card"
                  >
                    <div class="mini-icon" :style="{ '--mini-accent': item.accent }">
                      <span>{{ item.symbol }}</span>
                    </div>
                    <span>{{ item.label }}</span>
                  </div>
                </div>

                <div v-else-if="panel.type === 'avatars'" class="avatar-row">
                  <div class="avatar-stack">
                    <span v-for="avatar in panel.items" :key="avatar.label" class="avatar-chip">
                      {{ avatar.symbol }}
                    </span>
                  </div>
                  <p class="panel-inline-text">多角色 · 便捷协同</p>
                  <button class="panel-add">+</button>
                </div>

                <div v-else-if="panel.type === 'models'" class="model-row">
                  <div
                    v-for="item in panel.items"
                    :key="item.label"
                    class="model-chip"
                  >
                    <span class="model-mark" :style="{ '--mini-accent': item.accent }">{{ item.symbol }}</span>
                    <span>{{ item.label }}</span>
                  </div>
                </div>

                <div v-else class="usage-row">
                  <div>
                    <p class="usage-number">128,560</p>
                    <p class="usage-label">本月调用次数</p>
                  </div>
                  <div class="usage-chart">
                    <span></span>
                  </div>
                  <p class="usage-growth">↑ 18.7%</p>
                </div>
              </article>
            </div>
          </div>

        </div>
      </section>
    </main>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore, useAppStore } from '@/stores'
import LocaleSwitcher from '@/components/common/LocaleSwitcher.vue'
import Icon from '@/components/icons/Icon.vue'

type Particle = { id: number }
type GatewayCard = {
  title: string
  subtitle: string
  symbol: string
  accent: string
  stat?: boolean
}
type CapabilityIcon = {
  title: string
  icon: 'shield' | 'users' | 'chart' | 'cloud'
}
type FloatingInsight = {
  title: string
  text: string
  icon: 'users' | 'cube' | 'chartBar' | 'shield'
  position: 'top-left' | 'bottom-left' | 'top-right' | 'bottom-right'
}
type PanelItem = {
  label: string
  symbol: string
  accent: string
}
type EnterprisePanel = {
  title: string
  type: 'departments' | 'avatars' | 'models' | 'usage'
  items: PanelItem[]
}

const { t } = useI18n()

const authStore = useAuthStore()
const appStore = useAppStore()

const siteName = computed(() => appStore.cachedPublicSettings?.site_name || appStore.siteName || 'LAIMI')
const siteLogo = computed(() => appStore.cachedPublicSettings?.site_logo || appStore.siteLogo || '')
const docUrl = computed(() => appStore.cachedPublicSettings?.doc_url || appStore.docUrl || '')
const homeContent = computed(() => appStore.cachedPublicSettings?.home_content || '')

const isHomeContentUrl = computed(() => {
  const content = homeContent.value.trim()
  return content.startsWith('http://') || content.startsWith('https://')
})

const isDark = ref(document.documentElement.classList.contains('dark'))
const copiedEndpoint = ref(false)
let copyTimer: number | undefined

const isAuthenticated = computed(() => authStore.isAuthenticated)
const isAdmin = computed(() => authStore.isAdmin)
const dashboardPath = computed(() => (isAdmin.value ? '/admin/dashboard' : '/dashboard'))
const userInitial = computed(() => {
  const user = authStore.user
  if (!user || !user.email) return ''
  return user.email.charAt(0).toUpperCase()
})

const endpointUrl = computed(() => {
  if (typeof window === 'undefined') return 'https://your-domain.com/v1/responses'
  return `${window.location.origin}/v1/responses`
})

const particles: Particle[] = Array.from({ length: 16 }, (_, index) => ({ id: index + 1 }))

const navItems = [
  { label: '首页', href: '#gateway' },
  { label: '团队管理', href: '#enterprise' },
  { label: '模型中心', href: '#enterprise' },
  { label: '用量管理', href: '#enterprise' }
] as const

const gatewayCards: GatewayCard[] = [
  { title: '99.99%', subtitle: '可用性保障', symbol: '⌂', accent: '#8f9bff', stat: true },
  { title: 'GPT', subtitle: 'OpenAI', symbol: '◎', accent: '#10b981' },
  { title: 'Claude', subtitle: 'Anthropic', symbol: '✺', accent: '#fb923c' },
  { title: 'Gemini', subtitle: 'Google', symbol: '✦', accent: '#7b61ff' },
  { title: 'DeepSeek', subtitle: 'DeepSeek', symbol: '◔', accent: '#5b8cff' },
  { title: '300ms', subtitle: '平均响应时间', symbol: '⚡', accent: '#8f9bff', stat: true }
] as const

const capabilityIcons: CapabilityIcon[] = [
  { title: '安全可控', icon: 'shield' },
  { title: '权限精细', icon: 'users' },
  { title: '用量透明', icon: 'chart' },
  { title: '高效协同', icon: 'cloud' }
]

const floatingInsights: FloatingInsight[] = [
  { title: '员工高效使用', text: '多角色接入，便捷协同', icon: 'users', position: 'top-left' },
  { title: '模型灵活调用', text: '多模型接入，按需选择', icon: 'cube', position: 'bottom-left' },
  { title: '企业安全保障', text: '账号权限管控，数据隔离', icon: 'shield', position: 'top-right' },
  { title: '数据驱动决策', text: '用量可视化，洞察优化', icon: 'chartBar', position: 'bottom-right' }
] as const

const enterprisePanels: EnterprisePanel[] = [
  {
    title: '部门管理',
    type: 'departments',
    items: [
      { label: '研发部', symbol: '▣', accent: '#4f7dff' },
      { label: '研发部', symbol: '</>', accent: '#16c4c9' },
      { label: '市场部', symbol: '▥', accent: '#ff8b4f' },
      { label: '运营部', symbol: '◫', accent: '#8d63ff' }
    ]
  },
  {
    title: '员工使用',
    type: 'avatars',
    items: [
      { label: 'A', symbol: '👨', accent: '#7b61ff' },
      { label: 'B', symbol: '👩', accent: '#5b8cff' },
      { label: 'C', symbol: '🧑', accent: '#7b61ff' },
      { label: 'D', symbol: '👨', accent: '#5b8cff' }
    ]
  },
  {
    title: '模型中心',
    type: 'models',
    items: [
      { label: 'GPT-4o', symbol: '◎', accent: '#0ea5a4' },
      { label: 'Claude 3.5', symbol: '✺', accent: '#fb923c' },
      { label: 'Gemini 1.5', symbol: '✦', accent: '#7b61ff' },
      { label: 'DeepSeek V2', symbol: '◔', accent: '#5b8cff' }
    ]
  },
  {
    title: '用量概览',
    type: 'usage',
    items: []
  }
]

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

<style scoped>
.page-shell {
  --primary: #6c63ff;
  --primary-2: #7b61ff;
  --primary-3: #5b8cff;
  --bg-soft: #f7f8ff;
  --bg-soft-2: #eef2ff;
  --bg-soft-3: #f3f5ff;
  --text-main: #10183f;
  --text-soft: rgba(16, 24, 40, 0.65);
  --text-faint: #8b97bb;
  --glass: rgba(255, 255, 255, 0.52);
  --glass-strong: rgba(255, 255, 255, 0.74);
  --border: rgba(255, 255, 255, 0.52);
  --shadow: 0 10px 40px rgba(123, 97, 255, 0.08);

  min-height: 100vh;
  background:
    radial-gradient(circle at 12% 14%, rgba(91, 140, 255, 0.15), transparent 26%),
    radial-gradient(circle at 84% 12%, rgba(123, 97, 255, 0.16), transparent 28%),
    radial-gradient(circle at 78% 68%, rgba(123, 97, 255, 0.12), transparent 22%),
    linear-gradient(180deg, var(--bg-soft) 0%, var(--bg-soft-2) 46%, var(--bg-soft-3) 100%);
  color: var(--text-main);
  font-family: "Microsoft YaHei", "PingFang SC", "Segoe UI", sans-serif;
}

.page-container {
  width: 100%;
  max-width: 1440px;
  margin: 0 auto;
}

.bg-glow,
.bg-ribbon,
.bg-grid,
.bg-particles {
  pointer-events: none;
  position: absolute;
}

.bg-glow {
  border-radius: 999px;
  filter: blur(80px);
}

.glow-left {
  top: -8%;
  left: -10%;
  width: 28rem;
  height: 28rem;
  background: rgba(91, 140, 255, 0.2);
}

.glow-right {
  top: 0;
  right: -10%;
  width: 34rem;
  height: 34rem;
  background: rgba(123, 97, 255, 0.2);
}

.glow-bottom {
  left: 24%;
  bottom: -10%;
  width: 40rem;
  height: 18rem;
  background: rgba(171, 186, 255, 0.2);
}

.bg-ribbon {
  border-radius: 999px;
  filter: blur(8px);
  opacity: 0.6;
}

.ribbon-top {
  top: 20%;
  right: 6%;
  width: 24rem;
  height: 7rem;
  background: linear-gradient(90deg, transparent, rgba(123, 97, 255, 0.14), rgba(91, 140, 255, 0.18), transparent);
  transform: rotate(-16deg);
  animation: ribbonDrift 20s ease-in-out infinite;
}

.ribbon-bottom {
  left: 6%;
  bottom: 16%;
  width: 26rem;
  height: 8rem;
  background: linear-gradient(90deg, transparent, rgba(91, 140, 255, 0.14), rgba(123, 97, 255, 0.16), transparent);
  transform: rotate(12deg);
  animation: ribbonDrift 18s ease-in-out infinite reverse;
}

.bg-grid {
  inset: 0;
  background-image:
    linear-gradient(rgba(153, 164, 214, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(153, 164, 214, 0.08) 1px, transparent 1px);
  background-size: 58px 58px;
  mask-image: linear-gradient(180deg, rgba(0, 0, 0, 0.32), transparent 84%);
}

.bg-particles {
  inset: 0;
}

.particle {
  position: absolute;
  width: 0.32rem;
  height: 0.32rem;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 12px rgba(123, 97, 255, 0.3);
  animation: particleFloat 10s ease-in-out infinite;
}

.particle:nth-child(1) { top: 10%; left: 12%; animation-delay: 0s; }
.particle:nth-child(2) { top: 18%; left: 28%; animation-delay: 1s; }
.particle:nth-child(3) { top: 22%; right: 16%; animation-delay: 2s; }
.particle:nth-child(4) { top: 34%; right: 28%; animation-delay: 3s; }
.particle:nth-child(5) { top: 45%; left: 8%; animation-delay: 1.5s; }
.particle:nth-child(6) { top: 52%; left: 44%; animation-delay: 2.6s; }
.particle:nth-child(7) { top: 62%; right: 12%; animation-delay: 0.8s; }
.particle:nth-child(8) { top: 74%; left: 18%; animation-delay: 2.2s; }
.particle:nth-child(9) { top: 82%; right: 24%; animation-delay: 3.4s; }
.particle:nth-child(10) { top: 88%; left: 62%; animation-delay: 1.2s; }
.particle:nth-child(11) { top: 14%; right: 42%; animation-delay: 2.8s; }
.particle:nth-child(12) { top: 56%; right: 46%; animation-delay: 1.8s; }
.particle:nth-child(13) { top: 68%; left: 72%; animation-delay: 2.9s; }
.particle:nth-child(14) { top: 92%; right: 14%; animation-delay: 0.7s; }
.particle:nth-child(15) { top: 28%; left: 56%; animation-delay: 1.9s; }
.particle:nth-child(16) { top: 40%; right: 6%; animation-delay: 2.4s; }

.nav-shell,
.endpoint-shell,
.provider-card,
.enterprise-badge,
.capability-item,
.floating-insight,
.permission-pill,
.management-panel,
.bottom-feature-band {
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.8), rgba(255, 255, 255, 0.36));
  border: 1px solid var(--border);
  box-shadow: var(--shadow);
  backdrop-filter: blur(20px);
}

.nav-shell {
  padding: 0.95rem 1rem;
  border-radius: 999px;
}

.brand-group {
  display: flex;
  align-items: center;
  gap: 0.85rem;
}

.brand-mark {
  width: 2.95rem;
  height: 2.95rem;
  border-radius: 1rem;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.96), 0 12px 24px rgba(116, 129, 193, 0.12);
  overflow: hidden;
}

.brand-name {
  font-size: 1.7rem;
  line-height: 1;
  font-weight: 800;
  letter-spacing: -0.05em;
  color: #18244e;
}

.brand-sub {
  margin-top: 0.26rem;
  font-size: 0.76rem;
  color: var(--text-soft);
}

.nav-links {
  flex: 1;
  justify-content: center;
  gap: 0.35rem;
}

.nav-link {
  padding: 0.72rem 1rem;
  border-radius: 999px;
  font-size: 0.92rem;
  font-weight: 600;
  color: var(--text-soft);
  transition: all 0.28s ease;
}

.nav-link:hover {
  color: var(--primary);
  background: rgba(255, 255, 255, 0.52);
}

.nav-actions {
  display: flex;
  align-items: center;
  gap: 0.65rem;
}

.nav-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.8rem;
  height: 2.8rem;
  border-radius: 999px;
  color: var(--text-soft);
  background: rgba(255, 255, 255, 0.42);
  border: 1px solid rgba(255, 255, 255, 0.7);
  transition: all 0.28s ease;
}

.nav-icon:hover {
  color: var(--primary);
  background: rgba(255, 255, 255, 0.76);
  transform: translateY(-1px);
}

.nav-button,
.cta-button {
  position: relative;
  overflow: hidden;
}

.nav-button {
  display: inline-flex;
  align-items: center;
  gap: 0.72rem;
  min-height: 2.85rem;
  padding: 0.35rem 0.55rem 0.35rem 1rem;
  border-radius: 999px;
  font-size: 0.94rem;
  font-weight: 700;
  color: #fff;
  background: linear-gradient(135deg, var(--primary), var(--primary-2) 48%, var(--primary-3));
  box-shadow: 0 18px 34px rgba(111, 110, 255, 0.24);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.nav-button::before,
.cta-button.primary::before {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(120deg, transparent 16%, rgba(255, 255, 255, 0.28) 42%, transparent 70%);
  transform: translateX(-120%);
  transition: transform 0.7s ease;
}

.nav-button:hover::before,
.cta-button.primary:hover::before {
  transform: translateX(120%);
}

.nav-button:hover,
.cta-button.primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 22px 40px rgba(111, 110, 255, 0.28);
}

.nav-avatar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.95rem;
  height: 1.95rem;
  border-radius: 999px;
  color: var(--primary);
  background: rgba(255, 255, 255, 0.94);
  font-size: 0.82rem;
  font-weight: 800;
}

.screen-shell {
  min-height: 100vh;
  padding-top: 140px;
  padding-bottom: 140px;
}

.first-screen {
  display: flex;
  align-items: center;
}

.hero-layout {
  display: grid;
  grid-template-columns: 42% 58%;
  gap: 40px;
  align-items: center;
}

.hero-left {
  display: grid;
  grid-template-columns: 72px minmax(0, 1fr);
  gap: 1.3rem;
  align-items: center;
}

.hero-copy {
  padding-left: 28px;
}

.hero-side-label {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  color: #8897be;
  letter-spacing: 0.35em;
  font-size: 0.88rem;
}

.hero-side-label span {
  display: block;
  width: 1px;
  height: 5rem;
  background: linear-gradient(180deg, transparent, rgba(136, 151, 190, 0.65), transparent);
}

.hero-side-label p {
  writing-mode: vertical-rl;
}

.hero-badge,
.enterprise-badge {
  display: inline-flex;
  align-items: center;
  gap: 0.65rem;
  min-height: 2.85rem;
  padding: 0 1.25rem;
  border-radius: 999px;
  color: var(--primary);
  font-size: 0.94rem;
  font-weight: 700;
}

.badge-dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 999px;
  background: linear-gradient(135deg, var(--primary-2), var(--primary-3));
  box-shadow: 0 0 0 8px rgba(123, 97, 255, 0.1);
}

.hero-title,
.enterprise-title {
  margin-top: 1.65rem;
  font-size: 72px;
  line-height: 1.05;
  font-weight: 900;
  letter-spacing: -0.08em;
  color: #151e46;
}

.hero-title {
  max-width: 620px;
  margin-left: auto;
  margin-right: auto;
}

.enterprise-title {
  max-width: 420px;
}

.gradient-word,
.enterprise-badge strong {
  background: linear-gradient(135deg, var(--primary), var(--primary-2), var(--primary-3));
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-subtitle,
.enterprise-subtitle {
  margin-top: 1.25rem;
  max-width: 560px;
  font-size: 20px;
  line-height: 1.7;
  font-weight: 600;
  color: rgba(16, 24, 40, 0.65);
}

.hero-subtitle {
  margin-left: auto;
  margin-right: auto;
}

.enterprise-description {
  display: none;
}

.endpoint-shell {
  display: flex;
  align-items: center;
  gap: 0.85rem;
  width: min(100%, 560px);
  margin-top: 1.85rem;
  height: 72px;
  padding: 0 12px 0 24px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.55);
  border: 1px solid rgba(255, 255, 255, 0.7);
  box-shadow: 0 10px 40px rgba(123, 97, 255, 0.08);
  backdrop-filter: blur(20px);
}

.endpoint-value {
  display: block;
  flex: 1;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  font-size: clamp(1rem, 2vw, 1.2rem);
  font-weight: 700;
  color: #1c2954;
}

.copy-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  flex-shrink: 0;
  border-radius: 999px;
  color: var(--primary);
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.96), rgba(236, 241, 255, 0.82));
  border: 1px solid rgba(255, 255, 255, 0.86);
  box-shadow: 0 12px 26px rgba(118, 130, 194, 0.12);
  transition: transform 0.28s ease;
}

.copy-button:hover {
  transform: translateY(-1px) scale(1.02);
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 0;
  margin-top: 1.6rem;
  width: min(100%, 560px);
  justify-content: center;
}

.cta-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.7rem;
  width: 220px;
  height: 64px;
  border-radius: 999px;
  font-size: 1rem;
  font-weight: 700;
  transition: transform 0.3s ease, box-shadow 0.3s ease, background 0.3s ease;
}

.cta-button.primary {
  color: #fff;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0) 42%),
    linear-gradient(135deg, var(--primary), var(--primary-2) 48%, var(--primary-3));
  box-shadow:
    0 10px 40px rgba(123, 97, 255, 0.16),
    inset 0 1px 0 rgba(255, 255, 255, 0.24);
}

.cta-button.secondary {
  display: none;
}

.copy-feedback {
  margin-top: 0.85rem;
  min-height: 1.25rem;
  color: transparent;
  font-size: 0.9rem;
  font-weight: 600;
  transition: color 0.24s ease;
}

.copy-feedback.visible {
  color: var(--primary);
}

.hero-right {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.gateway-orb {
  position: relative;
  width: min(100%, 760px);
  height: min(75vh, 760px);
  transform: translateX(2%);
}

.orb-halo,
.orb-ring,
.orb-core,
.orb-trace {
  position: absolute;
  border-radius: 50%;
}

.orb-halo {
  background: radial-gradient(circle, rgba(255, 255, 255, 0.98), rgba(224, 232, 255, 0.58) 52%, rgba(174, 188, 255, 0.18) 76%, transparent 100%);
  filter: blur(1px);
}

.halo-a {
  inset: 2%;
}

.halo-b {
  inset: 12%;
}

.orb-ring {
  border-style: solid;
  border-color: rgba(255, 255, 255, 0.72);
  box-shadow: inset 0 0 22px rgba(255, 255, 255, 0.78), 0 0 36px rgba(123, 97, 255, 0.12);
}

.ring-a {
  inset: 2%;
  border-width: 1px;
  transform: rotate(12deg);
}

.ring-b {
  inset: 12%;
  border-width: 10px;
  border-left-color: rgba(91, 140, 255, 0.44);
  border-right-color: rgba(123, 97, 255, 0.5);
  border-top-color: rgba(255, 255, 255, 0.9);
  border-bottom-color: rgba(255, 255, 255, 0.3);
  transform: rotate(-26deg);
}

.ring-c {
  inset: 22%;
  border-width: 16px;
  border-left-color: rgba(255, 255, 255, 0.94);
  border-right-color: rgba(123, 97, 255, 0.22);
  border-top-color: rgba(255, 255, 255, 0.82);
  border-bottom-color: rgba(91, 140, 255, 0.18);
  transform: rotate(18deg);
}

.orb-core {
  inset: 29%;
  background:
    radial-gradient(circle at 50% 44%, rgba(255, 255, 255, 0.98), rgba(237, 242, 255, 0.82) 42%, rgba(197, 210, 255, 0.5) 66%, rgba(160, 177, 255, 0.22) 82%, rgba(255, 255, 255, 0) 100%);
  box-shadow:
    inset 0 0 56px rgba(255, 255, 255, 0.9),
    0 0 80px rgba(123, 97, 255, 0.18),
    0 28px 64px rgba(123, 136, 192, 0.12);
}

.orb-core::before,
.orb-core::after {
  content: "";
  position: absolute;
  border-radius: 50%;
}

.orb-core::before {
  inset: 18%;
  background: radial-gradient(circle at 50% 50%, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0) 72%);
}

.orb-core::after {
  top: 14%;
  right: 18%;
  width: 20%;
  height: 8%;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.84), rgba(255, 255, 255, 0));
  filter: blur(1px);
}

.orb-trace {
  border: 1px solid rgba(255, 255, 255, 0.5);
  border-radius: 999px;
}

.trace-a {
  width: 36%;
  height: 12%;
  left: 18%;
  bottom: 18%;
  transform: rotate(-20deg);
}

.trace-b {
  width: 42%;
  height: 16%;
  right: 8%;
  bottom: 8%;
  transform: rotate(20deg);
}

.provider-row {
  display: grid;
  grid-template-columns: repeat(6, minmax(0, 1fr));
  gap: 32px;
  margin-top: 1.8rem;
}

.provider-card {
  min-height: 220px;
  padding: 24px 20px;
  border-radius: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: transform 0.28s ease, box-shadow 0.28s ease;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.72), rgba(255, 255, 255, 0.34));
}

.provider-card:hover,
.capability-item:hover,
.management-panel:hover,
.floating-insight:hover {
  transform: translateY(-4px);
}

.provider-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3.35rem;
  height: 3.35rem;
  border-radius: 1.2rem;
  color: var(--provider-accent);
  background: radial-gradient(circle at 30% 20%, rgba(255, 255, 255, 0.98), rgba(255, 255, 255, 0.62));
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.94), 0 12px 26px rgba(121, 135, 195, 0.12);
  font-size: 1.2rem;
  font-weight: 900;
}

.provider-title {
  margin-top: 1rem;
  font-size: 1.02rem;
  font-weight: 800;
  color: #1a2854;
}

.provider-sub {
  margin-top: 0.28rem;
  font-size: 0.84rem;
  color: var(--text-soft);
}

.provider-card.stat .provider-title {
  font-size: 1.46rem;
  color: var(--primary);
}

.enterprise-layout {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 32px;
  align-items: center;
}

.enterprise-center,
.enterprise-right {
  position: relative;
}

.capability-icons {
  display: flex;
  flex-wrap: wrap;
  gap: 32px;
  margin-top: 2rem;
}

.capability-item {
  width: 160px;
  min-height: 160px;
  padding: 24px 20px;
  border-radius: 28px;
  text-align: center;
  transition: transform 0.28s ease;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.68), rgba(255, 255, 255, 0.3));
}

.capability-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  border-radius: 1rem;
  color: var(--primary);
  background: rgba(255, 255, 255, 0.8);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.92), 0 12px 24px rgba(123, 136, 193, 0.1);
}

.capability-title {
  margin-top: 0.85rem;
  font-size: 1rem;
  font-weight: 700;
  color: #1c2953;
}

.ai-cube-stage {
  position: relative;
  min-height: 620px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.floating-insight,
.permission-pill {
  position: absolute;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.95rem 1rem;
  border-radius: 1.55rem;
  transition: transform 300ms ease, box-shadow 300ms ease;
}

.top-left { top: 16%; left: 0; }
.bottom-left { bottom: 18%; left: 0; }
.top-right { top: 18%; right: 0; }
.bottom-right { bottom: 20%; right: 0; }

.floating-insight-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.4rem;
  height: 2.4rem;
  border-radius: 999px;
  color: var(--primary);
  background: rgba(255, 255, 255, 0.88);
}

.floating-insight-title {
  font-size: 0.95rem;
  font-weight: 800;
  color: #1f2d58;
}

.floating-insight-text {
  margin-top: 0.12rem;
  font-size: 0.78rem;
  color: var(--text-soft);
}

.cube-orbit,
.cube-base,
.cube-main {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}

.cube-orbit {
  border: 1px dashed rgba(123, 97, 255, 0.28);
  border-radius: 50%;
}

.orbit-one {
  top: 15%;
  width: 19rem;
  height: 8rem;
}

.orbit-two {
  top: 24%;
  width: 24rem;
  height: 10rem;
}

.cube-base {
  border-radius: 50%;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.94), rgba(123, 97, 255, 0.28) 56%, rgba(255, 255, 255, 0) 100%);
  box-shadow: inset 0 0 20px rgba(255, 255, 255, 0.7), 0 0 30px rgba(123, 97, 255, 0.16);
}

.base-one {
  top: 48%;
  width: 26rem;
  height: 7rem;
}

.base-two {
  top: 53%;
  width: 20rem;
  height: 5.8rem;
}

.base-three {
  top: 58%;
  width: 14rem;
  height: 4rem;
}

.cube-main {
  top: 18%;
  width: 70%;
  max-width: 320px;
  aspect-ratio: 1 / 1;
  transform-style: preserve-3d;
  transform: translateX(-50%) rotate(-14deg) skewY(-2deg);
  animation: cubeDrift 12s ease-in-out infinite;
}

.cube-face {
  position: absolute;
  inset: 0;
  border-radius: 1.7rem;
  background:
    linear-gradient(145deg, rgba(255, 255, 255, 0.16), rgba(255, 255, 255, 0) 44%),
    linear-gradient(135deg, rgba(130, 109, 255, 0.92), rgba(91, 140, 255, 0.8));
  border: 1px solid rgba(255, 255, 255, 0.54);
  box-shadow:
    inset 0 0 30px rgba(255, 255, 255, 0.32),
    inset 0 -12px 24px rgba(69, 88, 175, 0.2),
    0 24px 50px rgba(123, 97, 255, 0.22);
}

.cube-front {
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.96);
  font-size: 4rem;
  font-weight: 900;
  letter-spacing: -0.08em;
}

.cube-side {
  transform: translateX(3.1rem) translateY(0.8rem) scale(0.9);
  opacity: 0.62;
}

.cube-top {
  transform: translateY(-1.8rem) scale(0.88);
  opacity: 0.52;
}

.permission-pill {
  left: 50%;
  bottom: 10%;
  transform: translateX(-50%);
  color: var(--primary);
  font-size: 1rem;
  font-weight: 700;
  min-width: 320px;
  justify-content: center;
}

.enterprise-right {
  display: grid;
  gap: 24px;
}

.management-panel {
  min-height: 180px;
  padding: 24px;
  border-radius: 28px;
  transition: transform 300ms ease, box-shadow 300ms ease;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.76), rgba(255, 255, 255, 0.34));
}

.management-panel:nth-child(2) {
  transform: translateX(10px);
}

.management-panel:nth-child(4) {
  transform: translateX(18px);
}

.panel-head {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel-title {
  font-size: 1rem;
  font-weight: 800;
  color: #1c2954;
}

.panel-more {
  color: var(--text-faint);
  letter-spacing: 0.16em;
}

.panel-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 1rem;
}

.panel-icon-card {
  text-align: center;
}

.mini-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.55rem;
  height: 2.55rem;
  border-radius: 0.95rem;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.94), rgba(244, 246, 255, 0.74));
  color: var(--mini-accent);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.92), 0 10px 20px rgba(123, 136, 193, 0.08);
  margin-bottom: 0.45rem;
  font-size: 1rem;
  font-weight: 800;
}

.panel-icon-card span,
.model-chip span,
.panel-inline-text,
.usage-label {
  font-size: 0.85rem;
  color: var(--text-soft);
}

.avatar-row,
.usage-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.8rem;
  margin-top: 1rem;
}

.avatar-stack {
  display: flex;
}

.avatar-chip {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.1rem;
  height: 2.1rem;
  border-radius: 999px;
  margin-left: -0.3rem;
  background: rgba(255, 255, 255, 0.92);
  box-shadow: 0 6px 16px rgba(123, 136, 193, 0.12);
}

.avatar-chip:first-child {
  margin-left: 0;
}

.panel-add {
  width: 2rem;
  height: 2rem;
  border-radius: 999px;
  color: var(--primary);
  background: rgba(255, 255, 255, 0.88);
  box-shadow: 0 8px 18px rgba(123, 136, 193, 0.08);
}

.model-row {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1rem;
}

.model-chip {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
}

.model-mark {
  color: var(--mini-accent);
  font-size: 1rem;
  font-weight: 800;
}

.usage-number {
  font-size: 2rem;
  font-weight: 800;
  color: #1d2954;
}

.usage-chart {
  width: 6rem;
  height: 2.2rem;
  position: relative;
}

.usage-chart span {
  position: absolute;
  inset: 0;
  border-bottom: 3px solid transparent;
  border-radius: 999px;
  background:
    radial-gradient(circle at 10% 70%, transparent 0.35rem, transparent 0.36rem),
    linear-gradient(135deg, transparent 6%, rgba(91, 140, 255, 0.85) 30%, rgba(123, 97, 255, 0.9) 62%, rgba(91, 140, 255, 0.76) 100%);
  clip-path: polygon(0 78%, 16% 56%, 32% 68%, 48% 42%, 64% 58%, 80% 30%, 100% 10%, 100% 100%, 0 100%);
}

.usage-growth {
  color: #22b573;
  font-size: 1rem;
  font-weight: 700;
}

@keyframes cubeDrift {
  0%, 100% {
    transform: translateX(-50%) rotate(-14deg) skewY(-2deg) translateY(0);
  }
  50% {
    transform: translateX(-50%) rotate(-12deg) skewY(-2deg) translateY(-10px);
  }
}

@keyframes ribbonDrift {
  0%, 100% {
    transform: translate3d(0, 0, 0) rotate(-16deg);
  }
  50% {
    transform: translate3d(16px, -8px, 0) rotate(-12deg);
  }
}

@keyframes particleFloat {
  0%, 100% {
    opacity: 0.38;
    transform: translateY(0);
  }
  50% {
    opacity: 0.95;
    transform: translateY(-8px);
  }
}

@media (max-width: 1279px) {
  .hero-layout,
  .enterprise-layout {
    grid-template-columns: 1fr;
  }

  .hero-right {
    order: -1;
  }

  .provider-row {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .enterprise-center {
    order: 2;
  }

  .enterprise-right {
    order: 3;
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 1023px) {
  .hero-left {
    grid-template-columns: 1fr;
  }

  .hero-side-label {
    display: none;
  }

  .ai-cube-stage {
    min-height: 50rem;
  }
}

@media (max-width: 767px) {
  .nav-shell {
    border-radius: 2rem;
    padding: 0.9rem 1rem;
  }

  .brand-name {
    font-size: 1.35rem;
  }

  .brand-sub {
    display: none;
  }

  .nav-icon {
    width: 2.55rem;
    height: 2.55rem;
  }

  .nav-button {
    min-height: 2.65rem;
    padding-left: 0.85rem;
    font-size: 0.88rem;
  }

  .hero-title,
  .enterprise-title {
    font-size: clamp(2.5rem, 12vw, 4.3rem);
  }

  .hero-subtitle,
  .enterprise-subtitle {
    font-size: 1.05rem;
  }

  .endpoint-shell {
    border-radius: 1.55rem;
    padding: 0.85rem;
  }

  .endpoint-value {
    font-size: 0.94rem;
  }

  .copy-button {
    width: 2.8rem;
    height: 2.8rem;
  }

  .hero-actions {
    gap: 0.8rem;
  }

  .cta-button {
    width: 220px;
    height: 64px;
  }

  .gateway-orb {
    width: min(100%, 24rem);
  }

  .capability-item {
    width: 160px;
  }

  .top-left,
  .bottom-left,
  .top-right,
  .bottom-right {
    position: static;
  }

  .ai-cube-stage {
    display: grid;
    gap: 1rem;
    min-height: auto;
  }

  .cube-orbit,
  .cube-base,
  .cube-main,
  .permission-pill {
    position: static;
    left: auto;
    transform: none;
  }

  .cube-main {
    margin: 0 auto;
  }

  .cube-orbit,
  .cube-base {
    display: none;
  }

  .permission-pill {
    min-width: 0;
    justify-content: center;
  }

  .enterprise-right,
  .provider-row {
    grid-template-columns: 1fr;
  }

  .panel-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  .management-panel,
  .provider-card {
    border-radius: 1.55rem;
  }
}
</style>
