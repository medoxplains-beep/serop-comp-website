import { en } from "./en"
import { ar } from "./ar"
import type { Locale } from "./config"

export type Dictionary = typeof en

const dictionaries = { en, ar }

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale] ?? dictionaries.en
}

