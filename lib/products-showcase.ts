import { products } from "@/lib/products"

export type ShowcaseProduct = {
  id: string
  slug: string
  name: string
  nameAr: string
  capacity: string
  workingPressure: string
  testPressure: string
  dimensions: string
  recommendedMotor: string
  warranty: string
  certification: string
  image: string
  images?: string[]
  color: "red" | "blue" | "gray" | "galvanized"
  orientation: string
  finish: string
}

function getDimensions(capacityL: number, orientation: string, dimOverride?: string): string {
  if (dimOverride) return dimOverride
  if (orientation === "horizontal") {
    if (capacityL <= 50)   return "L900 × D350mm"
    if (capacityL <= 100)  return "L1050 × D430mm"
    if (capacityL <= 300)  return "L1350 × D560mm"
    if (capacityL <= 500)  return "L1600 × D620mm"
    if (capacityL <= 900)  return "L1900 × D780mm"
    return "L2100 × D780mm"
  }
  if (capacityL <= 500)  return "D600 × H1982mm"
  if (capacityL <= 900)  return "D800 × H2214mm"
  if (capacityL <= 1000) return "D800 × H2413mm"
  if (capacityL <= 2000) return "D1000 × H2827mm"
  if (capacityL <= 3000) return "D1200 × H2770mm"
  return "Custom layout"
}

function resolveColor(product: (typeof products)[0]): ShowcaseProduct["color"] {
  if (product.finish === "galvanized") return "galvanized"
  if (product.image.toLowerCase().includes("galvanized")) return "gray"
  if (product.image.includes("red")) return "red"
  if (product.image.includes("blue")) return "blue"
  if (product.finish === "custom") return "gray"
  return "blue"
}

const ORDER = [
  "v-500", "v-900", "v-1000", "v-2000", "v-3000",
  "h-50", "h-100", "h-200", "h-300", "h-500", "h-900", "h-1000",
]

export const showcaseProducts: ShowcaseProduct[] = ORDER.map((id) => {
  const p = products.find((x) => x.id === id)!
  return {
    id: p.id,
    slug: p.slug,
    name: p.name,
    nameAr: p.nameAr,
    capacity: p.capacity,
    workingPressure: p.workingPressure,
    testPressure: p.testPressure,
    dimensions: getDimensions(p.capacityL, p.orientation, p.dimensions),
    recommendedMotor: p.motorHP,
    warranty: "5 Years",
    certification: "CE / ISO 16528",
    image: p.image,
    images: p.images,
    color: resolveColor(p),
    orientation: p.orientation,
    finish: p.finish,
  }
})

export type FilterOption = { value: string; label: string }

export const orientationFilters: FilterOption[] = [
  { value: "all",        label: "All"        },
  { value: "vertical",   label: "Vertical"   },
  { value: "horizontal", label: "Horizontal" },
]

export const finishFilters: FilterOption[] = [
  { value: "all",        label: "All"        },
  { value: "painted",    label: "Painted"    },
  { value: "galvanized", label: "Galvanized" },
]

export const capacityFilters: FilterOption[] = [
  { value: "all",       label: "All"       },
  { value: "up-to-100", label: "Up to 100L" },
  { value: "100-500",   label: "100–500L"  },
  { value: "500-2000",  label: "500–2000L" },
  { value: "2000+",     label: "2000L+"    },
]

export function filterProducts(
  list: ShowcaseProduct[],
  capacity: string,
  orientation: string,
  finish: string,
): ShowcaseProduct[] {
  const src = products
  return list.filter((sp) => {
    const p = src.find((x) => x.id === sp.id)!
    if (orientation !== "all" && p.orientation !== orientation) return false
    if (finish !== "all" && p.finish !== finish) return false
    if (capacity !== "all") {
      const L = p.capacityL
      if (capacity === "up-to-100" && L > 100) return false
      if (capacity === "100-500"   && (L <= 100 || L > 500))  return false
      if (capacity === "500-2000"  && (L <= 500 || L > 2000)) return false
      if (capacity === "2000+"     && L <= 2000) return false
    }
    return true
  })
}
