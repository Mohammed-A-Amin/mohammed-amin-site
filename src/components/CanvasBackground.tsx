import { useEffect, useRef } from 'react'

type CanvasBackgroundProps = {
  theme: 'light' | 'dark'
}

type Star = {
  x: number
  y: number
  size: number
  alpha: number
  phase: number
  speed: number
}

type ShootingStar = {
  x: number
  y: number
  vx: number
  vy: number
  life: number
  maxLife: number
  length: number
}

type Constellation = {
  name: string
  points: Array<[number, number]>
  edges: Array<[number, number]>
}

type ActiveConstellation = {
  constellation: Constellation
  x: number
  y: number
  size: number
  startedAt: number
}

const CONSTELLATION_INTERVAL = 20000
const CONSTELLATION_DURATION = 5000

const constellations: Constellation[] = [
  {
    name: 'Orion',
    points: [
      [0.2, 0.14],
      [0.66, 0.1],
      [0.34, 0.44],
      [0.48, 0.47],
      [0.62, 0.5],
      [0.22, 0.86],
      [0.74, 0.82],
      [0.48, 0.68]
    ],
    edges: [[0, 2], [1, 4], [2, 3], [3, 4], [2, 5], [4, 6], [3, 7]]
  },
  {
    name: 'Ursa Major',
    points: [
      [0.08, 0.42],
      [0.24, 0.36],
      [0.42, 0.42],
      [0.58, 0.34],
      [0.7, 0.48],
      [0.86, 0.44],
      [0.92, 0.28]
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [4, 6]]
  },
  {
    name: 'Cassiopeia',
    points: [
      [0.08, 0.62],
      [0.28, 0.24],
      [0.5, 0.56],
      [0.72, 0.22],
      [0.92, 0.58]
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4]]
  },
  {
    name: 'Cygnus',
    points: [
      [0.5, 0.08],
      [0.5, 0.34],
      [0.5, 0.64],
      [0.5, 0.92],
      [0.16, 0.52],
      [0.84, 0.5]
    ],
    edges: [[0, 1], [1, 2], [2, 3], [4, 1], [1, 5]]
  },
  {
    name: 'Lyra',
    points: [
      [0.2, 0.1],
      [0.48, 0.34],
      [0.76, 0.42],
      [0.64, 0.78],
      [0.28, 0.68]
    ],
    edges: [[0, 1], [1, 2], [2, 3], [3, 4], [4, 1]]
  }
]

const randomBetween = (min: number, max: number) => min + Math.random() * (max - min)

const setCanvasSize = (canvas: HTMLCanvasElement, context: CanvasRenderingContext2D, dpr: number) => {
  const width = window.innerWidth
  const height = window.innerHeight

  canvas.width = Math.floor(width * dpr)
  canvas.height = Math.floor(height * dpr)
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  context.setTransform(dpr, 0, 0, dpr, 0, 0)
}

const drawBackground = (context: CanvasRenderingContext2D, theme: 'light' | 'dark') => {
  const width = window.innerWidth
  const height = window.innerHeight
  const gradient = context.createRadialGradient(width * 0.5, -height * 0.15, 0, width * 0.5, 0, height * 1.15)

  if (theme === 'dark') {
    gradient.addColorStop(0, '#171717')
    gradient.addColorStop(0.46, '#080808')
    gradient.addColorStop(1, '#020202')
  } else {
    gradient.addColorStop(0, '#ffffff')
    gradient.addColorStop(0.52, '#fbfbfb')
    gradient.addColorStop(1, '#f3f3f3')
  }

  context.clearRect(0, 0, width, height)
  context.fillStyle = gradient
  context.fillRect(0, 0, width, height)
}

const drawMilkyWay = (context: CanvasRenderingContext2D, theme: 'light' | 'dark') => {
  const width = window.innerWidth
  const height = window.innerHeight
  const isDark = theme === 'dark'
  const bandAngle = -0.32
  const centerX = width * 0.5
  const centerY = height * 0.5
  const dots = Math.min(Math.floor((width * height) / 740), 2600)

  context.clearRect(0, 0, width, height)
  context.save()
  context.translate(centerX, centerY)
  context.rotate(bandAngle)

  const bandHeight = Math.min(height * 0.54, 520)
  const bandGradient = context.createLinearGradient(0, -bandHeight / 2, 0, bandHeight / 2)
  if (isDark) {
    bandGradient.addColorStop(0, 'rgba(255, 255, 255, 0)')
    bandGradient.addColorStop(0.28, 'rgba(255, 255, 255, 0.026)')
    bandGradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.072)')
    bandGradient.addColorStop(0.72, 'rgba(255, 255, 255, 0.026)')
    bandGradient.addColorStop(1, 'rgba(255, 255, 255, 0)')
  } else {
    bandGradient.addColorStop(0, 'rgba(0, 0, 0, 0)')
    bandGradient.addColorStop(0.34, 'rgba(0, 0, 0, 0.012)')
    bandGradient.addColorStop(0.5, 'rgba(0, 0, 0, 0.032)')
    bandGradient.addColorStop(0.66, 'rgba(0, 0, 0, 0.012)')
    bandGradient.addColorStop(1, 'rgba(0, 0, 0, 0)')
  }

  context.fillStyle = bandGradient
  context.fillRect(-width * 0.9, -bandHeight / 2, width * 1.8, bandHeight)

  for (let index = 0; index < dots; index += 1) {
    const along = randomBetween(-width * 0.62, width * 0.62)
    const spread = (Math.random() - 0.5) * height * randomBetween(0.05, 0.28)
    const randomDrift = Math.random() < 0.14 ? randomBetween(-height * 0.34, height * 0.34) : 0
    const x = along
    const y = spread + randomDrift
    const size = randomBetween(0.18, 0.64)
    const alpha = isDark ? randomBetween(0.08, 0.34) : randomBetween(0.04, 0.16)

    context.beginPath()
    context.arc(x, y, size, 0, Math.PI * 2)
    context.fillStyle = isDark ? `rgba(255, 255, 255, ${alpha})` : `rgba(0, 0, 0, ${alpha})`
    context.fill()
  }

  context.restore()
}

const createStars = () => {
  const count = Math.min(Math.floor((window.innerWidth * window.innerHeight) / 3300), 470)

  return Array.from({ length: count }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    size: randomBetween(0.42, 1.18),
    alpha: randomBetween(0.36, 0.9),
    phase: randomBetween(0, Math.PI * 2),
    speed: randomBetween(0.012, 0.032)
  }))
}

const createShootingStar = (): ShootingStar => ({
  x: randomBetween(-90, window.innerWidth * 0.72),
  y: randomBetween(18, window.innerHeight * 0.56),
  vx: randomBetween(2.4, 4.1),
  vy: randomBetween(0.95, 1.9),
  life: 0,
  maxLife: randomBetween(132, 178),
  length: randomBetween(170, 260)
})

const createConstellation = (): ActiveConstellation => {
  const width = window.innerWidth
  const height = window.innerHeight
  const size = Math.min(randomBetween(210, 360), width * 0.48, height * 0.42)
  const constellation = constellations[Math.floor(Math.random() * constellations.length)]

  return {
    constellation,
    x: randomBetween(width * 0.08, Math.max(width * 0.1, width - size - width * 0.08)),
    y: randomBetween(height * 0.12, Math.max(height * 0.16, height - size - height * 0.22)),
    size,
    startedAt: performance.now()
  }
}

const drawStar = (context: CanvasRenderingContext2D, star: Star, theme: 'light' | 'dark', frame: number) => {
  const twinkle = 0.65 + Math.sin(star.phase + frame * star.speed) * 0.35
  const alpha = star.alpha * twinkle * (theme === 'dark' ? 0.88 : 0.42)

  context.beginPath()
  context.arc(star.x, star.y, star.size, 0, Math.PI * 2)
  context.fillStyle = theme === 'dark' ? `rgba(255, 255, 255, ${alpha})` : `rgba(0, 0, 0, ${alpha})`
  context.fill()
}

const drawShootingStar = (
  context: CanvasRenderingContext2D,
  star: ShootingStar,
  theme: 'light' | 'dark'
) => {
  const progress = star.life / star.maxLife
  const age = Math.sin(Math.PI * Math.min(progress, 1))
  const alpha = age * (theme === 'dark' ? 0.9 : 0.42)
  const magnitude = Math.hypot(star.vx, star.vy)
  const tailX = star.x - (star.vx / magnitude) * star.length * age
  const tailY = star.y - (star.vy / magnitude) * star.length * age
  const gradient = context.createLinearGradient(star.x, star.y, tailX, tailY)
  const head = theme === 'dark' ? '255, 255, 255' : '0, 0, 0'

  gradient.addColorStop(0, `rgba(${head}, ${alpha})`)
  gradient.addColorStop(0.18, `rgba(${head}, ${alpha * 0.55})`)
  gradient.addColorStop(1, `rgba(${head}, 0)`)

  context.save()
  context.lineCap = 'round'
  context.lineWidth = 1.65
  context.strokeStyle = gradient
  context.beginPath()
  context.moveTo(star.x, star.y)
  context.lineTo(tailX, tailY)
  context.stroke()

  context.beginPath()
  context.arc(star.x, star.y, 1.6, 0, Math.PI * 2)
  context.fillStyle = `rgba(${head}, ${Math.min(alpha + 0.18, 0.95)})`
  context.fill()
  context.restore()
}

const drawConstellation = (
  context: CanvasRenderingContext2D,
  active: ActiveConstellation,
  theme: 'light' | 'dark',
  now: number
) => {
  const elapsed = now - active.startedAt
  if (elapsed < 0 || elapsed > CONSTELLATION_DURATION) return

  const fadeIn = Math.min(elapsed / 1100, 1)
  const fadeOut = Math.min((CONSTELLATION_DURATION - elapsed) / 1400, 1)
  const alpha = Math.max(0, Math.min(fadeIn, fadeOut))
  const color = theme === 'dark' ? '255, 255, 255' : '0, 0, 0'
  const points = active.constellation.points.map(([x, y]) => ({
    x: active.x + x * active.size,
    y: active.y + y * active.size
  }))

  context.save()
  context.lineCap = 'round'
  context.lineJoin = 'round'
  context.shadowColor = `rgba(${color}, ${alpha * 0.3})`
  context.shadowBlur = 12
  context.strokeStyle = `rgba(${color}, ${alpha * (theme === 'dark' ? 0.34 : 0.16)})`
  context.lineWidth = 1.1

  active.constellation.edges.forEach(([from, to]) => {
    const start = points[from]
    const end = points[to]
    context.beginPath()
    context.moveTo(start.x, start.y)
    context.lineTo(end.x, end.y)
    context.stroke()
  })

  points.forEach((point, index) => {
    const isAnchor = index === 0 || index === points.length - 1 || index === Math.floor(points.length / 2)
    const radius = isAnchor ? 2.1 : 1.35
    const glow = isAnchor ? 0.72 : 0.48

    context.beginPath()
    context.arc(point.x, point.y, radius, 0, Math.PI * 2)
    context.fillStyle = `rgba(${color}, ${alpha * glow})`
    context.fill()

    context.beginPath()
    context.arc(point.x, point.y, radius * 3.2, 0, Math.PI * 2)
    context.fillStyle = `rgba(${color}, ${alpha * 0.045})`
    context.fill()
  })

  context.restore()
}

export default function CanvasBackground({ theme }: CanvasBackgroundProps) {
  const backgroundRef = useRef<HTMLCanvasElement | null>(null)
  const milkyWayRef = useRef<HTMLCanvasElement | null>(null)
  const starsRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const backgroundCanvas = backgroundRef.current
    const milkyWayCanvas = milkyWayRef.current
    const starsCanvas = starsRef.current
    if (!backgroundCanvas || !milkyWayCanvas || !starsCanvas) return

    const backgroundContext = backgroundCanvas.getContext('2d')
    const milkyWayContext = milkyWayCanvas.getContext('2d')
    const starsContext = starsCanvas.getContext('2d')
    if (!backgroundContext || !milkyWayContext || !starsContext) return

    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let stars: Star[] = []
    let shootingStars: ShootingStar[] = []
    let activeConstellation: ActiveConstellation | null = null
    let lastConstellationAt = performance.now() - CONSTELLATION_INTERVAL + 24000
    let frame = 0
    let animationFrame = 0

    const resize = () => {
      setCanvasSize(backgroundCanvas, backgroundContext, dpr)
      setCanvasSize(milkyWayCanvas, milkyWayContext, dpr)
      setCanvasSize(starsCanvas, starsContext, dpr)
      drawBackground(backgroundContext, theme)
      drawMilkyWay(milkyWayContext, theme)
      stars = createStars()
      shootingStars = prefersReducedMotion ? [] : [createShootingStar()]
    }

    const animate = () => {
      frame += 1
      starsContext.clearRect(0, 0, window.innerWidth, window.innerHeight)

      stars.forEach((star) => drawStar(starsContext, star, theme, frame))

      if (!prefersReducedMotion) {
        const now = performance.now()
        if (!activeConstellation && now - lastConstellationAt >= CONSTELLATION_INTERVAL) {
          activeConstellation = createConstellation()
          lastConstellationAt = now
        }

        if (activeConstellation) {
          drawConstellation(starsContext, activeConstellation, theme, now)
          if (now - activeConstellation.startedAt > CONSTELLATION_DURATION) {
            activeConstellation = null
          }
        }

        if (frame % 390 === 0 && shootingStars.length < 1) {
          shootingStars.push(createShootingStar())
        }

        shootingStars = shootingStars.filter((star) => {
          star.life += 1
          star.x += star.vx
          star.y += star.vy
          drawShootingStar(starsContext, star, theme)

          return (
            star.life < star.maxLife &&
            star.x < window.innerWidth + star.length &&
            star.y < window.innerHeight + star.length
          )
        })
      }

      animationFrame = window.requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
    }
  }, [theme])

  return (
    <div className="canvas-bg" aria-hidden>
      <canvas className="background-canvas" ref={backgroundRef} />
      <canvas className="milky-way-canvas" ref={milkyWayRef} />
      <canvas className="stars-canvas" ref={starsRef} />
    </div>
  )
}
