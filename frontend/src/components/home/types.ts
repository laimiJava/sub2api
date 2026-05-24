export type HomeNavItem = {
  label: string
  href: string
}

export type HomeFeature = {
  title: string
  description: string
  icon: 'link' | 'users' | 'creditCard'
  glow: string
  iconBackground: string
}

export type HomeModelPill = {
  name: string
  initial: string
  color: string
  status?: string
}
