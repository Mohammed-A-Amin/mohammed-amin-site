import { useEffect, useRef } from 'react'
import * as THREE from 'three'

type WaveStrip = {
  geometry: THREE.BufferGeometry
  positions: Float32Array
  line: THREE.Line
  baseZ: number
  phase: number
  amplitude: number
}

type ThreeBackgroundProps = {
  theme: 'light' | 'dark'
}

export default function ThreeBackground({ theme }: ThreeBackgroundProps) {
  const mountRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const mount = mountRef.current
    if (!mount) return

    const isLight = theme === 'light'
    const scene = new THREE.Scene()
    scene.fog = new THREE.FogExp2(isLight ? '#cde8ff' : '#020913', isLight ? 0.02 : 0.032)

    const camera = new THREE.PerspectiveCamera(48, mount.clientWidth / mount.clientHeight, 0.1, 220)
    camera.position.set(0, 1.2, 19)

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.6))
    renderer.setSize(mount.clientWidth, mount.clientHeight)
    renderer.outputColorSpace = THREE.SRGBColorSpace
    mount.appendChild(renderer.domElement)

    const isMobile = mount.clientWidth < 800

    const starsCount = isMobile ? 1500 : 3000
    const starsPositions = new Float32Array(starsCount * 3)
    for (let index = 0; index < starsCount; index += 1) {
      const stride = index * 3
      starsPositions[stride] = (Math.random() - 0.5) * 95
      starsPositions[stride + 1] = (Math.random() - 0.5) * 56
      starsPositions[stride + 2] = (Math.random() - 0.5) * 90
    }

    const starsGeometry = new THREE.BufferGeometry()
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(starsPositions, 3))

    const starsMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(isLight ? '#56a8ff' : '#78cfff'),
      size: isMobile ? 0.032 : 0.04,
      transparent: true,
      opacity: isLight ? 0.32 : 0.4,
      depthWrite: false,
      blending: THREE.AdditiveBlending
    })

    const stars = new THREE.Points(starsGeometry, starsMaterial)
    stars.position.z = -18
    scene.add(stars)

    const waveGroup = new THREE.Group()
    waveGroup.position.set(0, -2, -5.8)
    waveGroup.rotation.x = -0.15
    scene.add(waveGroup)

    const stripCount = isMobile ? 24 : 34
    const pointsPerStrip = isMobile ? 120 : 180
    const waveWidth = isMobile ? 32 : 44

    const waveStrips: WaveStrip[] = []

    for (let stripIndex = 0; stripIndex < stripCount; stripIndex += 1) {
      const positions = new Float32Array(pointsPerStrip * 3)
      const geometry = new THREE.BufferGeometry()
      geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))

      const material = new THREE.LineBasicMaterial({
        color: new THREE.Color(isLight ? '#60b7ff' : '#53b8ff'),
        transparent: true,
        opacity: (isLight ? 0.035 : 0.05) + (stripIndex / stripCount) * (isLight ? 0.11 : 0.16),
        blending: THREE.AdditiveBlending
      })

      const line = new THREE.Line(geometry, material)
      waveGroup.add(line)

      waveStrips.push({
        geometry,
        positions,
        line,
        baseZ: -8 + stripIndex * 0.52,
        phase: stripIndex * 0.37,
        amplitude: 0.85 + stripIndex * 0.014
      })
    }

    const nodeCount = isMobile ? 135 : 210
    const nodePositions = new Float32Array(nodeCount * 3)
    for (let index = 0; index < nodeCount; index += 1) {
      const stride = index * 3
      nodePositions[stride] = (Math.random() - 0.5) * 60
      nodePositions[stride + 1] = (Math.random() - 0.5) * 28
      nodePositions[stride + 2] = (Math.random() - 0.5) * 48 - 8
    }

    const nodeGeometry = new THREE.BufferGeometry()
    nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3))

    const nodeMaterial = new THREE.PointsMaterial({
      color: new THREE.Color(isLight ? '#5bb8ff' : '#7bd3ff'),
      size: isMobile ? 0.07 : 0.09,
      transparent: true,
      opacity: isLight ? 0.34 : 0.42,
      blending: THREE.AdditiveBlending,
      depthWrite: false
    })

    const networkNodes = new THREE.Points(nodeGeometry, nodeMaterial)
    networkNodes.position.z = -6
    scene.add(networkNodes)

    const lineSegments: number[] = []
    const threshold = 8.5
    for (let sourceIndex = 0; sourceIndex < nodeCount; sourceIndex += 1) {
      const strideA = sourceIndex * 3
      const ax = nodePositions[strideA]
      const ay = nodePositions[strideA + 1]
      const az = nodePositions[strideA + 2]

      for (let targetIndex = sourceIndex + 1; targetIndex < nodeCount; targetIndex += 1) {
        const strideB = targetIndex * 3
        const bx = nodePositions[strideB]
        const by = nodePositions[strideB + 1]
        const bz = nodePositions[strideB + 2]

        const dx = ax - bx
        const dy = ay - by
        const dz = az - bz
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (distance < threshold && Math.random() < 0.25) {
          lineSegments.push(ax, ay, az, bx, by, bz)
        }
      }
    }

    const networkLineGeometry = new THREE.BufferGeometry()
    networkLineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(lineSegments, 3))

    const networkLineMaterial = new THREE.LineBasicMaterial({
      color: new THREE.Color(isLight ? '#66b8ff' : '#4babff'),
      transparent: true,
      opacity: isLight ? 0.08 : 0.12,
      blending: THREE.AdditiveBlending
    })

    const networkLines = new THREE.LineSegments(networkLineGeometry, networkLineMaterial)
    networkLines.position.z = -6
    scene.add(networkLines)

    const pointer = { x: 0, y: 0 }
    const cameraTarget = new THREE.Vector3(0, 1.2, 19)

    const onPointerMove = (event: PointerEvent) => {
      pointer.x = (event.clientX / window.innerWidth) * 2 - 1
      pointer.y = -((event.clientY / window.innerHeight) * 2 - 1)
    }

    const updateWave = (time: number) => {
      waveStrips.forEach((strip) => {
        const { positions, geometry, phase, baseZ, amplitude } = strip

        for (let pointIndex = 0; pointIndex < pointsPerStrip; pointIndex += 1) {
          const stride = pointIndex * 3
          const progress = pointIndex / (pointsPerStrip - 1)
          const x = -waveWidth / 2 + progress * waveWidth

          const y =
            Math.sin(x * 0.52 + phase + time * 0.85) * amplitude +
            Math.sin(time * 0.6 + phase * 1.2) * 0.36

          const z =
            baseZ +
            Math.cos(x * 0.28 + phase * 0.75 + time * 0.5) * 0.95 +
            (progress - 0.5) * 2.2

          positions[stride] = x
          positions[stride + 1] = y
          positions[stride + 2] = z
        }

        geometry.attributes.position.needsUpdate = true
      })
    }

    const clock = new THREE.Clock()
    let frame = 0

    const animate = () => {
      const elapsed = clock.getElapsedTime()

      updateWave(elapsed)

      waveGroup.rotation.z = Math.sin(elapsed * 0.16) * 0.08
      networkNodes.rotation.y = elapsed * 0.03
      networkLines.rotation.y = elapsed * 0.03
      stars.rotation.y = elapsed * 0.01
      stars.rotation.x = Math.sin(elapsed * 0.08) * 0.04

      cameraTarget.x = pointer.x * 1.1
      cameraTarget.y = 1.2 + pointer.y * 0.62
      camera.position.lerp(cameraTarget, 0.025)
      camera.lookAt(0, -0.1, -7.6)

      renderer.render(scene, camera)
      frame = window.requestAnimationFrame(animate)
    }

    const onResize = () => {
      if (!mount) return
      camera.aspect = mount.clientWidth / mount.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(mount.clientWidth, mount.clientHeight)
    }

    window.addEventListener('resize', onResize)
    window.addEventListener('pointermove', onPointerMove)
    animate()

    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)

      starsGeometry.dispose()
      starsMaterial.dispose()
      scene.remove(stars)

      waveStrips.forEach((strip) => {
        strip.geometry.dispose()
        ;(strip.line.material as THREE.Material).dispose()
      })
      scene.remove(waveGroup)

      nodeGeometry.dispose()
      nodeMaterial.dispose()
      networkLineGeometry.dispose()
      networkLineMaterial.dispose()
      scene.remove(networkNodes)
      scene.remove(networkLines)

      renderer.dispose()
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement)
      }
    }
  }, [theme])

  return <div className="three-bg" ref={mountRef} aria-hidden />
}
