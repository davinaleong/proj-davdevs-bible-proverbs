"use client"

import { useEffect, useState } from "react"

type Theme = "light" | "dark" | "ocean" | "rose"
const THEMES: Theme[] = ["light", "dark", "ocean", "rose"]

export function ThemeSwitcher() {
  const [theme, setTheme] = useState<Theme>("light")

  useEffect(() => {
    const saved = (localStorage.getItem("theme") as Theme | null) ?? "light"
    setTheme(saved)
    document.documentElement.dataset.theme = saved
  }, [])

  function onChange(next: Theme) {
    setTheme(next)
    document.documentElement.dataset.theme = next
    localStorage.setItem("theme", next)
  }

  return (
    <label className="inline-flex items-center gap-2">
      <span className="text-sm opacity-70">Theme</span>
      <select
        className="rounded-md border border-border bg-surface px-3 py-2 text-sm"
        value={theme}
        onChange={(e) => onChange(e.target.value as Theme)}
      >
        {THEMES.map((t) => (
          <option key={t} value={t}>
            {t}
          </option>
        ))}
      </select>
    </label>
  )
}
