"use client"

import { useState, useMemo } from "react"
import { Filter } from "lucide-react"
import { products } from "@/lib/products"
import { ProductCard } from "./product-card"
import { useI18n } from "@/components/i18n-provider"

type FinishFilter = "all" | "galvanized" | "painted" | "custom"
type OrientationFilter = "all" | "vertical" | "horizontal" | "custom"

export function ProductsGrid() {
  const [finish, setFinish] = useState<FinishFilter>("all")
  const [orientation, setOrientation] = useState<OrientationFilter>("all")
  const { dict } = useI18n()

  const filtered = useMemo(() => {
    return products.filter((p) => {
      if (finish !== "all" && p.finish !== finish) return false
      if (orientation !== "all" && p.orientation !== orientation) return false
      return true
    })
  }, [finish, orientation])

  return (
    <div>
      <div className="flex flex-wrap items-center gap-3 rounded-xl border border-border/60 bg-card/40 p-3 backdrop-blur">
        <div className="flex items-center gap-2 px-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
          <Filter className="size-3.5" />
          {dict.products.filters.filter}
        </div>
        <FilterGroup<OrientationFilter>
          value={orientation}
          onChange={setOrientation}
          options={[
            { v: "all", l: dict.products.filters.all },
            { v: "vertical", l: dict.products.filters.vertical },
            { v: "horizontal", l: dict.products.filters.horizontal },
            { v: "custom", l: dict.products.filters.custom },
          ]}
        />
        <div className="hidden h-6 w-px bg-border sm:block" />
        <FilterGroup<FinishFilter>
          value={finish}
          onChange={setFinish}
          options={[
            { v: "all", l: dict.products.filters.any_finish },
            { v: "galvanized", l: dict.products.filters.galvanized },
            { v: "painted", l: dict.products.filters.painted },
            { v: "custom", l: dict.products.filters.custom },
          ]}
        />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => (
          <ProductCard key={p.id} product={p} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="mt-12 rounded-xl border border-border/60 bg-card/30 p-12 text-center text-muted-foreground">
          {dict.products.filters.no_results}
        </div>
      )}
    </div>
  )
}

function FilterGroup<T extends string>({
  value, onChange, options,
}: {
  value: T
  onChange: (v: T) => void
  options: { v: T; l: string }[]
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => (
        <button
          key={o.v}
          onClick={() => onChange(o.v)}
          className={`rounded-full px-4 py-1.5 text-xs font-medium transition ${
            value === o.v
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-card hover:text-foreground"
          }`}
        >
          {o.l}
        </button>
      ))}
    </div>
  )
}

