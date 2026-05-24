import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'
import { hover } from 'motion'

type Cleanup = () => void

gsap.registerPlugin(ScrollTrigger)

export function useHomeExperience() {
  const rootRef = ref<HTMLElement | null>(null)
  const lenisRef = ref<Lenis | null>(null)

  const cleanups: Cleanup[] = []
  let rafId = 0

  const setupLenis = () => {
    const lenis = new Lenis({
      duration: 1.22,
      smoothWheel: true,
      syncTouch: false,
      touchMultiplier: 1.05
    })

    lenisRef.value = lenis

    const onFrame = (time: number) => {
      lenis.raf(time)
      rafId = window.requestAnimationFrame(onFrame)
    }

    rafId = window.requestAnimationFrame(onFrame)
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.lagSmoothing(0)

    cleanups.push(() => {
      window.cancelAnimationFrame(rafId)
      lenis.destroy()
      lenisRef.value = null
    })
  }

  const setupScrollReveal = (root: HTMLElement) => {
    const revealElements = root.querySelectorAll<HTMLElement>('.home-reveal')
    revealElements.forEach((element, index) => {
      gsap.set(element, {
        y: 36,
        opacity: 0,
        filter: 'blur(12px)'
      })

      const tween = gsap.to(element, {
        y: 0,
        opacity: 1,
        filter: 'blur(0px)',
        duration: 1.05,
        delay: index % 3 === 0 ? 0 : 0.03,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: element,
          start: 'top 84%',
          once: true
        }
      })

      cleanups.push(() => {
        tween.scrollTrigger?.kill()
        tween.kill()
      })
    })
  }

  const setupParallax = (root: HTMLElement) => {
    const parallax = root.querySelectorAll<HTMLElement>('[data-parallax]')
    parallax.forEach((element) => {
      const distance = Number(element.dataset.parallax ?? 60)
      const tween = gsap.fromTo(
        element,
        { y: distance * 0.35 },
        {
          y: distance * -0.35,
          ease: 'none',
          scrollTrigger: {
            trigger: element,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.8
          }
        }
      )

      cleanups.push(() => {
        tween.scrollTrigger?.kill()
        tween.kill()
      })
    })
  }

  const setupAmbientMotion = (root: HTMLElement) => {
    const ambientTargets = root.querySelectorAll<HTMLElement>('.home-ambient')
    ambientTargets.forEach((element, index) => {
      const tween = gsap.to(element, {
        y: -18 - index * 5,
        x: index % 2 === 0 ? 8 : -8,
        duration: 8 + index * 1.2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      })

      cleanups.push(() => tween.kill())
    })
  }

  const setupHoverAndFloat = (root: HTMLElement) => {
    const hoverTargets = root.querySelectorAll<HTMLElement>('.home-hover-card, .home-glow-button')
    hoverTargets.forEach((element) => {
      const stopHover = hover(element, () => {
        const isButton = element.classList.contains('home-glow-button')
        const startShadow = window.getComputedStyle(element).boxShadow
        const hoverShadow = isButton
          ? '0 28px 90px rgba(84, 97, 255, 0.42), inset 0 1px 0 rgba(255,255,255,0.24)'
          : '0 30px 96px rgba(5, 12, 34, 0.34), inset 0 1px 0 rgba(255,255,255,0.1)'

        const animation = element.animate(
          [
            {
              transform: 'translateY(0px) scale(1)',
              boxShadow: startShadow,
              borderColor: 'rgba(255,255,255,0.1)'
            },
            {
              transform: isButton ? 'translateY(-4px) scale(1.012)' : 'translateY(-8px) scale(1.012)',
              boxShadow: hoverShadow,
              borderColor: 'rgba(154,173,255,0.34)'
            }
          ],
          {
            duration: 320,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
            fill: 'forwards'
          }
        )

        return () => {
          animation.cancel()
          element.animate(
            [
              {
                transform: window.getComputedStyle(element).transform,
                boxShadow: window.getComputedStyle(element).boxShadow,
                borderColor: window.getComputedStyle(element).borderColor
              },
              {
                transform: 'translateY(0px) scale(1)',
                boxShadow: startShadow,
                borderColor: 'rgba(255,255,255,0.1)'
              }
            ],
            {
              duration: 320,
              easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
              fill: 'forwards'
            }
          )
        }
      })

      cleanups.push(stopHover)
    })

    const floatingTargets = root.querySelectorAll<HTMLElement>('.home-float')
    floatingTargets.forEach((element, index) => {
      const tween = gsap.to(element, {
        y: -8 - (index % 3) * 3,
        duration: 3.6 + index * 0.18,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: index * 0.12
      })

      cleanups.push(() => tween.kill())
    })
  }

  onMounted(() => {
    const root = rootRef.value
    if (!root) return

    setupLenis()
    setupScrollReveal(root)
    setupParallax(root)
    setupAmbientMotion(root)
    setupHoverAndFloat(root)
  })

  onBeforeUnmount(() => {
    cleanups.splice(0).forEach((cleanup) => cleanup())
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill())
  })

  return {
    rootRef
  }
}
