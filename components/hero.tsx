"use client"

import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { ArrowRight, BadgeCheck, Gauge, Layers, MessageCircle, ShieldCheck, ZoomIn, ZoomOut } from "lucide-react"
import * as THREE from "three"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"
import { useI18n } from "@/components/i18n-provider"
import { useTheme } from "next-themes"

const HERO_MODEL_PATH = "/models/serop-vertical-tank.glb"

// ── Intro animation variants ───────────────────────────
const _EASE: [number, number, number, number] = [0.16, 1, 0.3, 1]

const productIntro = {
  hidden:   { opacity: 0, y: 90, scale: 1.12 },
  visible:  { opacity: 1, y: 0,  scale: 1,     transition: { duration: 1.3, ease: _EASE } },
}

const titleReveal = {
  hidden:   { opacity: 0, y: 45, filter: "blur(10px)" },
  visible:  { opacity: 1, y: 0,  filter: "blur(0px)",  transition: { delay: 0.75, duration: 0.9, ease: _EASE } },
}

const staggerContainer = {
  hidden:   {},
  visible:  { transition: { staggerChildren: 0.12, delayChildren: 1.55 } },
}

const staggerItem = {
  hidden:   { opacity: 0, y: 28, filter: "blur(8px)"  },
  visible:  { opacity: 1, y: 0,  filter: "blur(0px)", transition: { duration: 0.7, ease: _EASE } },
}

const PARTICLES = [
  { x: 8,  y: 12, s: 2,   d: 6,   delay: 0   },
  { x: 18, y: 70, s: 1.5, d: 8,   delay: 1.2 },
  { x: 32, y: 35, s: 2.5, d: 7,   delay: 2.4 },
  { x: 55, y: 20, s: 1.5, d: 5,   delay: 0.8 },
  { x: 72, y: 55, s: 2,   d: 9,   delay: 3.1 },
  { x: 85, y: 80, s: 1,   d: 6,   delay: 1.6 },
  { x: 92, y: 30, s: 2,   d: 7,   delay: 2.0 },
  { x: 45, y: 88, s: 1.5, d: 8,   delay: 0.4 },
  { x: 62, y: 72, s: 1,   d: 5.5, delay: 3.8 },
  { x: 25, y: 50, s: 2.5, d: 7.5, delay: 1.9 },
  { x: 78, y: 15, s: 1.5, d: 6.5, delay: 2.7 },
  { x: 42, y: 60, s: 2,   d: 8.5, delay: 0.6 },
]

/* ═══════════════════════════════════════════
   Three.js Model
═══════════════════════════════════════════ */
/* Focus zones keyed by Y hit position */
const FOCUS_ZONES: Array<{ minY: number; label: string }> = [
  { minY:  1.3, label: "Pressure Relief System"  },
  { minY:  0.1, label: "Upper Vessel Body"        },
  { minY: -1.1, label: "Lower Vessel Body"        },
  { minY: -99,  label: "Drain & Base Assembly"    },
]

function TankModel({
  loadingText,
  errorText,
  isDark,
}: {
  loadingText: string
  errorText: string
  isDark: boolean
}) {
  const canvasRef  = useRef<HTMLCanvasElement>(null)
  const lightRef   = useRef<HTMLDivElement>(null)
  const [modelStatus, setModelStatus] = useState<"loading" | "loaded" | "error">("loading")
  const [zoomLevel,   setZoomLevel]   = useState(50)
  const [lensFlash,   setLensFlash]   = useState<{ x: number; y: number } | null>(null)
  const [focusZone,   setFocusZone]   = useState<string | null>(null)
  const zoomRef = useRef(50)

  /* Camera state — lerped every frame, never causes re-renders */
  const cam = useRef({
    posY: 0.02, posZ: 14.5, fov: 24, lookY: 0,
    tPosY: 0.02, tPosZ: 14.5, tFov: 24, tLookY: 0,
    focused: false,
  })
  const drag = useRef({
    active: false, lastX: 0, lastY: 0,
    startX: 0, startY: 0, startTime: 0,
    rotY: 0, rotX: 0, lastT: 0,
  })

  const handleZoomChange = (val: number) => {
    zoomRef.current = val
    setZoomLevel(val)
    const c = cam.current
    if (!c.focused) {
      c.tFov  = 30 - (val / 100) * 11
      c.tPosZ = 16 - (val / 100) * 4
    }
  }

  const exitFocus = () => {
    const c = cam.current
    c.focused = false
    c.tFov   = 24
    c.tPosZ  = 14.5
    c.tPosY  = 0.02
    c.tLookY = 0
    setZoomLevel(50)
    setFocusZone(null)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8))
    renderer.outputColorSpace = THREE.SRGBColorSpace
    renderer.shadowMap.enabled = true
    renderer.shadowMap.type = THREE.PCFShadowMap

    const scene    = new THREE.Scene()
    const cs       = cam.current
    const camera   = new THREE.PerspectiveCamera(cs.fov, 1, 0.1, 100)
    camera.position.set(0.12, cs.posY, cs.posZ)
    camera.lookAt(0, cs.lookY, 0)

    const modelRoot = new THREE.Group()
    scene.add(modelRoot)

    scene.add(new THREE.AmbientLight(isDark ? "#e8f4ff" : "#f0f8ff", isDark ? 1.7 : 2.0))
    const keyLight = new THREE.DirectionalLight("#ffffff", isDark ? 5.0 : 4.4)
    keyLight.position.set(3.4, 5.8, 4.6)
    keyLight.castShadow = true
    scene.add(keyLight)
    const softFill = new THREE.DirectionalLight(isDark ? "#b9eaff" : "#d0efff", 2.2)
    softFill.position.set(-4.8, 2.2, 2.6)
    scene.add(softFill)
    const rimLight = new THREE.DirectionalLight("#1c8cff", isDark ? 2.8 : 1.8)
    rimLight.position.set(-4.5, 1.8, -4.2)
    scene.add(rimLight)
    const bounce = new THREE.DirectionalLight("#4488ff", 0.9)
    bounce.position.set(0, -5, 2)
    scene.add(bounce)

    const raycaster = new THREE.Raycaster()
    let disposed    = false
    let frame       = 0
    let loaded: THREE.Object3D | null = null

    const fitModel = (obj: THREE.Object3D) => {
      const box    = new THREE.Box3().setFromObject(obj)
      const size   = box.getSize(new THREE.Vector3())
      const center = box.getCenter(new THREE.Vector3())
      const scale  = size.y > 0 ? 5.8 / size.y : 1
      obj.scale.setScalar(scale)
      obj.position.set(-center.x * scale, -center.y * scale, -center.z * scale)
      obj.rotation.y = -0.05
    }

    const dracoLoader = new DRACOLoader()
    dracoLoader.setDecoderPath("/draco/")
    const gltfLoader  = new GLTFLoader()
    gltfLoader.setDRACOLoader(dracoLoader)

    gltfLoader.load(
      HERO_MODEL_PATH,
      (gltf) => {
        if (disposed) return
        gltf.scene.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.castShadow    = true
            child.receiveShadow = true
            child.frustumCulled = false
            const mats = Array.isArray(child.material) ? child.material : [child.material]
            const cloned = mats.map((m) => {
              const c = m.clone()
              if ("envMapIntensity" in c) c.envMapIntensity = 1.5
              if ("roughness" in c && typeof c.roughness === "number")
                c.roughness = Math.min(c.roughness + 0.04, 0.55)
              if ("metalness" in c && typeof c.metalness === "number")
                c.metalness = Math.max(c.metalness, 0.25)
              return c
            })
            child.material = Array.isArray(child.material) ? cloned : cloned[0]
          }
        })
        fitModel(gltf.scene)
        modelRoot.add(gltf.scene)
        loaded = gltf.scene
        setModelStatus("loaded")
      },
      undefined,
      () => { if (!disposed) setModelStatus("error") },
    )

    const ds = drag.current

    const resize = () => {
      const p = canvas.parentElement
      const w = Math.max(p?.clientWidth  ?? 1, 1)
      const h = Math.max(p?.clientHeight ?? 1, 1)
      renderer.setSize(w, h, false)
      camera.aspect = w / h
      camera.updateProjectionMatrix()
    }

    const render = (ts = performance.now()) => {
      const t  = ts / 1000
      const dt = ds.lastT > 0 ? Math.min(t - ds.lastT, 0.05) : 0.016
      ds.lastT = t

      /* Smooth camera lerp — position, FOV, lookAt */
      const lf = 0.075
      cs.posY  += (cs.tPosY  - cs.posY)  * lf
      cs.posZ  += (cs.tPosZ  - cs.posZ)  * lf
      cs.fov   += (cs.tFov   - cs.fov)   * lf
      cs.lookY += (cs.tLookY - cs.lookY) * lf
      camera.position.set(0.12, cs.posY, cs.posZ)
      camera.fov = cs.fov
      camera.updateProjectionMatrix()
      camera.lookAt(0, cs.lookY, 0)

      if (loaded) {
        if (!ds.active) {
          ds.rotY += dt * (cs.focused ? 0.35 : 0.72)
          ds.rotX *= 0.94
        }
        modelRoot.rotation.y = ds.rotY
        modelRoot.rotation.x = ds.rotX + Math.sin(t * 0.42) * 0.012
        modelRoot.position.y = Math.sin(t * 0.65) * 0.02

        if (lightRef.current) {
          const x = 50 + Math.sin(ds.rotY - 0.63) * 42
          const y = 8  + Math.sin(ds.rotY * 0.5)  * 6
          lightRef.current.style.background =
            `radial-gradient(ellipse 80% 35% at ${x.toFixed(1)}% ${y.toFixed(1)}%, rgba(49,92,255,0.18), transparent 60%)`
        }
      }

      renderer.render(scene, camera)
      frame = requestAnimationFrame(render)
    }

    /* ── Pointer interaction ── */
    const onPointerDown = (e: PointerEvent) => {
      ds.active    = true
      ds.lastX     = e.clientX; ds.lastY  = e.clientY
      ds.startX    = e.clientX; ds.startY = e.clientY
      ds.startTime = performance.now()
      try { canvas.setPointerCapture(e.pointerId) } catch (_) {}
    }

    const onPointerMove = (e: PointerEvent) => {
      if (!ds.active) return
      ds.rotY += (e.clientX - ds.lastX) * 0.008
      ds.rotX  = Math.max(-0.45, Math.min(0.45, ds.rotX + (e.clientY - ds.lastY) * 0.008))
      ds.lastX = e.clientX; ds.lastY = e.clientY
    }

    const onPointerUp = (e: PointerEvent) => {
      const elapsed = performance.now() - ds.startTime
      const dist    = Math.hypot(e.clientX - ds.startX, e.clientY - ds.startY)

      if (elapsed < 250 && dist < 10) {
        if (cs.focused) {
          /* Any click while focused → exit focus */
          cs.focused = false
          cs.tFov    = 24
          cs.tPosZ   = 14.5
          cs.tPosY   = 0.02
          cs.tLookY  = 0
          setZoomLevel(50)
          setFocusZone(null)
        } else if (loaded) {
          /* Raycast to find exact hit point on model */
          const rect = canvas.getBoundingClientRect()
          const nx   = ((e.clientX - rect.left) / rect.width)  * 2 - 1
          const ny   = -((e.clientY - rect.top) / rect.height) * 2 + 1
          raycaster.setFromCamera(new THREE.Vector2(nx, ny), camera)
          const hits = raycaster.intersectObjects([modelRoot], true)

          if (hits.length > 0) {
            const hitY    = hits[0].point.y
            cs.focused    = true
            cs.tFov       = 19
            cs.tPosZ      = 9.5
            cs.tPosY      = hitY        /* pan camera to hit height */
            cs.tLookY     = hitY        /* look at hit height */
            const zone    = FOCUS_ZONES.find(z => hitY >= z.minY)?.label ?? "Vessel Section"
            setFocusZone(zone)
            setLensFlash({ x: e.clientX - rect.left, y: e.clientY - rect.top })
            setTimeout(() => setLensFlash(null), 700)
          }
        }
      }
      ds.active = false
    }

    canvas.addEventListener("pointerdown",   onPointerDown)
    canvas.addEventListener("pointermove",   onPointerMove)
    canvas.addEventListener("pointerup",     onPointerUp)
    canvas.addEventListener("pointercancel", onPointerUp)

    const onWheel = (e: WheelEvent) => {
      e.preventDefault()
      const delta = e.deltaY > 0 ? -5 : 5
      const next = Math.max(0, Math.min(100, zoomRef.current + delta))
      handleZoomChange(next)
    }
    canvas.addEventListener("wheel", onWheel, { passive: false })

    resize()
    window.addEventListener("resize", resize)
    render()

    return () => {
      disposed = true
      window.removeEventListener("resize", resize)
      cancelAnimationFrame(frame)
      canvas.removeEventListener("pointerdown",   onPointerDown)
      canvas.removeEventListener("pointermove",   onPointerMove)
      canvas.removeEventListener("pointerup",     onPointerUp)
      canvas.removeEventListener("pointercancel", onPointerUp)
      canvas.removeEventListener("wheel",         onWheel)
      dracoLoader.dispose()
      renderer.dispose()
      scene.traverse((obj) => {
        if (obj instanceof THREE.Mesh) {
          obj.geometry.dispose()
          const mats = Array.isArray(obj.material) ? obj.material : [obj.material]
          mats.forEach((m) => m.dispose())
        }
      })
    }
  }, [isDark])

  return (
    <div className="relative h-full w-full select-none">
      {/* Dynamic light glow — position updated every frame from animation loop */}
      <div ref={lightRef} className="pointer-events-none absolute inset-0 hidden dark:block" />
      <canvas
        ref={canvasRef}
        className="h-full w-full touch-none cursor-grab active:cursor-grabbing"
        aria-label="Interactive 3D SEROP COMP pressure vessel"
      />

      {/* Zoom slider — vertical, right edge */}
      <div className="absolute right-2 top-1/2 z-20 flex -translate-y-1/2 flex-col items-center gap-2">
        <button
          onClick={() => handleZoomChange(Math.min(100, zoomLevel + 20))}
          className="grid size-7 place-items-center rounded-full border border-[#315cff]/30 bg-white/80 text-[#315cff] shadow-sm backdrop-blur transition hover:scale-110 hover:bg-white dark:border-white/15 dark:bg-white/[0.07] dark:text-white/70 dark:hover:bg-white/12"
          aria-label="Zoom in"
        >
          <ZoomIn className="size-3" />
        </button>
        <div className="relative flex h-28 w-8 items-center justify-center overflow-visible">
          <input
            type="range"
            min="0"
            max="100"
            value={zoomLevel}
            onChange={(e) => handleZoomChange(Number(e.target.value))}
            className="w-28 cursor-pointer accent-[#315cff]"
            style={{ transform: "rotate(90deg)" }}
            aria-label="Zoom level"
          />
        </div>
        <button
          onClick={() => handleZoomChange(Math.max(0, zoomLevel - 20))}
          className="grid size-7 place-items-center rounded-full border border-[#315cff]/30 bg-white/80 text-[#315cff] shadow-sm backdrop-blur transition hover:scale-110 hover:bg-white dark:border-white/15 dark:bg-white/[0.07] dark:text-white/70 dark:hover:bg-white/12"
          aria-label="Zoom out"
        >
          <ZoomOut className="size-3" />
        </button>
      </div>

      {/* Focus zone badge — animated in/out */}
      <AnimatePresence>
        {focusZone && (
          <motion.div
            key="focus-badge"
            initial={{ opacity: 0, y: 10, scale: 0.94 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{    opacity: 0, y: 8,  scale: 0.94 }}
            transition={{ duration: 0.32, ease: [0.16, 1, 0.3, 1] }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          >
            <div className="flex items-center gap-2.5 rounded-full border border-[#315cff]/35 bg-white/92 px-5 py-2.5 shadow-lg shadow-[#315cff]/10 backdrop-blur dark:bg-[#06111f]/88">
              <span className="size-1.5 animate-pulse rounded-full bg-[#315cff]" />
              <span className="font-mono text-[9px] font-bold uppercase tracking-[0.25em] text-[#315cff] dark:text-[#7cadff]">
                {focusZone}
              </span>
              <span className="h-3 w-px bg-[#315cff]/22" />
              <span className="font-mono text-[8px] uppercase tracking-[0.14em] text-[#526173] dark:text-white/38">
                Inspecting
              </span>
            </div>
            <button
              onClick={exitFocus}
              className="font-mono text-[8px] uppercase tracking-[0.15em] text-[#526173]/60 transition hover:text-[#315cff] dark:text-white/28 dark:hover:text-white/55"
            >
              click anywhere · exit focus
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click ripple */}
      {lensFlash && (
        <div
          className="pointer-events-none absolute animate-ping rounded-full border-2 border-[#315cff] bg-[#315cff]/15"
          style={{ left: lensFlash.x - 28, top: lensFlash.y - 28, width: 56, height: 56 }}
        />
      )}

      {modelStatus !== "loaded" && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 rounded-full border border-border/40 bg-background/70 px-4 py-2 font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground backdrop-blur">
          {modelStatus === "loading" ? loadingText : errorText}
        </div>
      )}
    </div>
  )
}

/* ═══════════════════════════════════════════
   Spec Badge — theme-aware
═══════════════════════════════════════════ */
function SpecBadge({
  icon: Icon,
  label,
  sub,
  className,
  delay = 0,
  reduced = false,
}: {
  icon: React.ElementType
  label: string
  sub?: string
  className?: string
  delay?: number
  reduced?: boolean
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={reduced ? {} : { delay, duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      className={`flex items-center gap-2.5 rounded-2xl border border-[#315cff]/22 bg-white/85 px-4 py-2.5 shadow-lg shadow-[#315cff]/08 backdrop-blur dark:bg-[#06111f]/85 dark:shadow-[#315cff]/10 ${className ?? ""}`}
    >
      <div className="grid size-8 place-items-center rounded-xl border border-[#315cff]/25 bg-[#315cff]/10">
        <Icon className="size-4 text-[#315cff] dark:text-[#5c7cff]" />
      </div>
      <div>
        <div className="font-mono text-[10px] font-bold uppercase tracking-[0.15em] text-[#0b1728] dark:text-white/75">
          {label}
        </div>
        {sub && (
          <div className="font-mono text-[8px] uppercase tracking-[0.1em] text-[#526173] dark:text-white/35">
            {sub}
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════
   Main Hero — Full-immersion product section
   Intentionally distinct from HeroCinematic:
   • Light/dark mode (vs always-dark cinematic)
   • Dominant 3D interactive model
   • Giant engineering-style spec numbers
   • Wider, more commanding typography
═══════════════════════════════════════════ */
export function HeroMain() {
  const { locale, dict } = useI18n()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  const prefersReduced = useReducedMotion()
  const init = prefersReduced ? (false as const) : ("hidden" as const)

  const isAr   = locale === "ar"

  /* ── Combo-360 mascot: appear → spin → disappear cycle ── */
  const [combo360, setCombo360] = useState(false)
  useEffect(() => {
    let t: ReturnType<typeof setTimeout>
    const cycle = () => {
      setCombo360(true)
      t = setTimeout(() => {
        setCombo360(false)
        t = setTimeout(cycle, 20000)
      }, 7500)
    }
    t = setTimeout(cycle, 3000)
    return () => clearTimeout(t)
  }, [])
  const isDark = mounted ? resolvedTheme === "dark" : false

  return (
    <section
      className="relative isolate min-h-screen overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* ── LIGHT background ── */}
      <div className="absolute inset-0 dark:hidden">
        <div className="absolute inset-0 bg-[#eef9ff]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_65%_at_72%_50%,rgba(120,220,255,0.55),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_18%_45%,rgba(255,255,255,0.90),transparent_62%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(118deg,#fbfdff_0%,#eaf8ff_30%,#ccf1ff_70%,#eef9ff_100%)] opacity-80" />
        <div className="absolute inset-0 opacity-[0.042] [background-image:linear-gradient(rgba(49,92,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(49,92,255,1)_1px,transparent_1px)] [background-size:58px_58px]" />
      </div>

      {/* ── DARK background ── */}
      <div className="absolute inset-0 hidden dark:block">
        <div className="absolute inset-0 bg-[#06111f]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_65%_75%_at_72%_50%,rgba(0,120,255,0.18),transparent_58%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_55%_50%_at_18%_45%,rgba(49,92,255,0.10),transparent_58%)]" />
        <div className="absolute inset-0 opacity-[0.038] [background-image:linear-gradient(rgba(255,255,255,1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,1)_1px,transparent_1px)] [background-size:58px_58px]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_100%_100%_at_50%_50%,transparent_38%,rgba(2,9,20,0.55)_100%)]" />
      </div>

      {/* Scanline overlay (dark only) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-[0.025] hidden dark:block">
        <div className="absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-[#00a7ff] to-transparent animate-scan" />
      </div>

      {/* Floating particles (dark only) */}
      {PARTICLES.map((p) => (
        <div
          key={p.x * 100 + p.y}
          className="pointer-events-none absolute hidden rounded-full bg-[#00a7ff] animate-particle dark:block"
          style={{
            width:  `${p.s}px`,
            height: `${p.s}px`,
            left:   `${p.x}%`,
            top:    `${p.y}%`,
            animationDuration: `${p.d}s`,
            animationDelay:    `${p.delay}s`,
            opacity: 0,
          }}
        />
      ))}


      {/* ── Grid: left text | right 3D model ── */}
      <div className="relative z-10 mx-auto grid min-h-screen max-w-[1440px] grid-cols-1 items-center gap-0 px-6 pb-10 pt-20 sm:px-10 lg:grid-cols-[1fr_1.45fr] lg:px-14">

        {/* ════════════════════════════
            LEFT: engineering text column
        ════════════════════════════ */}
        <div className="relative z-20 lg:pt-4 lg:pb-16">

          {/* Engineering-style rule + label (replaces pill badge) */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: -18 }}
            animate={{ opacity: 1, x: 0 }}
            transition={prefersReduced ? {} : { delay: 0.5, duration: 0.8, ease: _EASE }}
            className="mb-8 flex items-center gap-3"
          >
            <div className="h-px w-10 bg-[#315cff]/55 dark:bg-[#315cff]/50" />
            <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-[#315cff]/65 dark:text-[#5c7cff]/55">
              {dict.hero.badge_manufacturer}
            </span>
            <div className="h-px w-4 bg-[#315cff]/30 dark:bg-[#315cff]/28" />
          </motion.div>

          {/* Headline — much larger than HeroCinematic */}
          <h1 className="font-display font-black tracking-tight flex flex-wrap items-baseline gap-x-5 gap-y-1">
            <span
              dir="ltr"
              aria-label={dict.hero.title1}
              className="relative whitespace-nowrap text-[clamp(1.9rem,3.4vw,5.2rem)] leading-[1] text-[#060f1e] dark:text-white"
            >
              {dict.hero.title1.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={prefersReduced ? false : { opacity: 0, y: 64, scale: 0.55, filter: "blur(18px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  transition={{ delay: 0.28 + i * 0.065, duration: 0.72, ease: _EASE }}
                  style={{ display: "inline-block" }}
                >
                  {char === " " ? " " : char}
                </motion.span>
              ))}
            </span>
            <motion.span
              initial={prefersReduced ? false : { opacity: 0, y: 28, filter: "blur(8px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 1.05, duration: 0.75, ease: _EASE }}
              className="text-[clamp(1.1rem,1.9vw,2.6rem)] leading-[1.2] tracking-wide bg-gradient-to-r from-[#315cff] via-[#00b8ff] to-[#18d4ff] bg-clip-text text-transparent"
            >
              {dict.hero.title3}
            </motion.span>
          </h1>

          {/* Stagger group */}
          <motion.div variants={staggerContainer} initial={init} animate="visible">

            {/* Description */}
            <motion.p variants={staggerItem} className="mt-6 max-w-[440px] text-[15.5px] leading-relaxed text-[#526173] dark:text-white/52">
              {dict.hero.description_main}
            </motion.p>

            {/* CTAs */}
            <motion.div variants={staggerItem} className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/request-quote"
                className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-[#315cff] to-[#00a7ff] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-[#315cff]/25 transition hover:brightness-110 hover:shadow-[#315cff]/45 hover:-translate-y-0.5"
              >
                {dict.hero.cta_quote}
                <ArrowRight className="size-4 transition group-hover:translate-x-1" />
              </Link>
              <Link
                href="/products"
                className="inline-flex items-center gap-3 rounded-full border-2 border-[#315cff]/38 bg-white/50 px-8 py-4 text-sm font-bold text-[#1f58ff] backdrop-blur transition hover:border-[#315cff]/65 hover:bg-white/70 hover:-translate-y-0.5 dark:border-white/16 dark:bg-white/[0.06] dark:text-white dark:hover:border-white/35 dark:hover:bg-white/10"
              >
                {dict.hero.cta_products}
              </Link>
            </motion.div>

            {/* WhatsApp */}
            <motion.a
              variants={staggerItem}
              href="https://wa.me/201151988818"
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-3 text-sm font-semibold text-[#526173] transition hover:text-[#0b1728] dark:text-white/42 dark:hover:text-white"
            >
              <MessageCircle className="size-5 text-[#14e27d]" />
              {dict.hero.cta_whatsapp.replace(" Support", "")}
            </motion.a>

            {/* ── Large engineering spec numbers ── */}
            <motion.div variants={staggerItem} className="mt-6 lg:mt-12">
              <div className="h-px max-w-[480px] bg-gradient-to-r from-[#315cff]/40 via-[#00a7ff]/35 to-transparent" />
              <div className="mt-4 flex items-start gap-5 sm:gap-8 lg:gap-12">

                <div>
                  <div className="font-mono text-[1.9rem] font-black leading-none text-[#315cff] dark:text-[#4f78ff] lg:text-[2.8rem]">11</div>
                  <div className="mt-1 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#526173] dark:text-white/38">Bar</div>
                  <div className="font-mono text-[7px] uppercase tracking-[0.14em] text-[#8a9db5] dark:text-white/22">Working Pressure</div>
                </div>

                <div className="h-10 w-px self-center bg-[#315cff]/18 dark:bg-white/10 lg:h-14" />

                <div>
                  <div className="font-mono text-[1.1rem] font-black leading-[1.15] text-[#315cff] dark:text-[#4f78ff] lg:text-[1.55rem]">ISO<br />16528</div>
                  <div className="mt-1 font-mono text-[7px] uppercase tracking-[0.14em] text-[#8a9db5] dark:text-white/22">International Std</div>
                </div>

                <div className="h-10 w-px self-center bg-[#315cff]/18 dark:bg-white/10 lg:h-14" />

                <div>
                  <div className="font-mono text-[1.9rem] font-black leading-none text-[#315cff] dark:text-[#4f78ff] lg:text-[2.8rem]">CE</div>
                  <div className="mt-1 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#526173] dark:text-white/38">PED</div>
                  <div className="font-mono text-[7px] uppercase tracking-[0.14em] text-[#8a9db5] dark:text-white/22">EU Certified</div>
                </div>

              </div>
            </motion.div>

          </motion.div>
        </div>

        {/* ════════════════════════════
            RIGHT: dominant 3D model
        ════════════════════════════ */}
        <motion.div
          variants={productIntro}
          initial={init}
          animate="visible"
          className="relative flex items-center justify-center"
        >
          {/* Strong ambient glow */}
          <div className="pointer-events-none absolute inset-[3%] rounded-full bg-[radial-gradient(circle,rgba(49,92,255,0.07),transparent_65%)] dark:bg-[radial-gradient(circle,rgba(0,167,255,0.13),transparent_65%)] animate-glow-pulse" />

          {/* Orbit rings */}
          <div className="pointer-events-none absolute inset-[8%] rounded-full border border-[#315cff]/14 dark:border-[#315cff]/14 animate-spin-slow" />
          <div className="pointer-events-none absolute inset-[2%] rounded-full border border-[#00a7ff]/06 animate-spin-slow-reverse" />

          {/* Engineering measurement lines */}
          <div className="pointer-events-none absolute inset-y-[26%] left-[12%] flex flex-col justify-between">
            <div className="h-px w-5 bg-[#315cff]/30" />
            <div className="h-px w-5 bg-[#315cff]/30" />
          </div>
          <div className="pointer-events-none absolute inset-y-[26%] right-[12%] flex flex-col justify-between">
            <div className="h-px w-5 bg-[#315cff]/30" />
            <div className="h-px w-5 bg-[#315cff]/30" />
          </div>
          <div className="pointer-events-none absolute left-[12%] top-[26%] h-[48%] w-px bg-gradient-to-b from-[#315cff]/28 via-[#315cff]/12 to-[#315cff]/28" />
          <div className="pointer-events-none absolute right-[12%] top-[26%] h-[48%] w-px bg-gradient-to-b from-[#315cff]/28 via-[#315cff]/12 to-[#315cff]/28" />

          {/* 3D canvas — taller and more prominent */}
          <div className="relative h-[280px] sm:h-[400px] lg:h-[820px]">
            <TankModel
              loadingText={dict.hero.model_loading}
              errorText={dict.hero.model_error}
              isDark={isDark}
            />
          </div>

          {/* Floating spec badges */}
          <SpecBadge icon={Layers}      label="10,000 L"  sub="Max Capacity"      className="absolute right-0 top-[8%]   hidden md:flex" delay={0.8} reduced={!!prefersReduced} />
          <SpecBadge icon={Gauge}       label="48 BAR"    sub="Working Pressure"  className="absolute left-0 top-[30%]  hidden md:flex" delay={1.0} reduced={!!prefersReduced} />
          <SpecBadge icon={ShieldCheck} label="ISO 16528" sub="International Std" className="absolute right-0 top-[34%] hidden md:flex" delay={1.3} reduced={!!prefersReduced} />
          <SpecBadge icon={BadgeCheck}  label="CE / PED"  sub="EU Certified"      className="absolute left-0 bottom-[26%] hidden md:flex" delay={1.6} reduced={!!prefersReduced} />

          {/* Mascot combo 360 — slides up, spins, disappears */}
          <AnimatePresence>
            {combo360 && (
              <motion.div
                initial={{ x: -220, opacity: 0 }}
                animate={{ x: 0,   opacity: 1 }}
                exit={{   x: -220, opacity: 0 }}
                transition={{ type: "spring", stiffness: 55, damping: 14 }}
                className="pointer-events-none absolute left-[10%] top-1/2 z-30 -translate-y-1/2"
              >
                <video
                  src="/mascot/combo360.webm"
                  autoPlay
                  muted
                  playsInline
                  preload="none"
                  className="w-36 lg:w-44"
                  style={{ filter: "brightness(1.45) contrast(1.05)" }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Drag-to-rotate hint */}
          <div className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
            <div className="flex items-center gap-2 rounded-full border border-[#315cff]/22 bg-white/70 px-4 py-1.5 backdrop-blur dark:border-white/10 dark:bg-white/[0.05]">
              <div className="size-1.5 rounded-full bg-[#315cff]/60 animate-pulse dark:bg-[#5c7cff]/60" />
              <span className="font-mono text-[7.5px] uppercase tracking-[0.22em] text-[#526173]/70 dark:text-white/28">
                {"Drag to rotate · Click to inspect"}
              </span>
            </div>
          </div>
        </motion.div>

      </div>

    </section>
  )
}
