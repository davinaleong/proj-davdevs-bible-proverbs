import { ThemeSwitcher } from "./components/ThemeSwitcher"

export default function Home() {
  return (
    <main className="min-h-screen p-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold">Scaffold</h1>
        <ThemeSwitcher />
      </div>

      <div className="mt-6 rounded-xl border border-border bg-surface p-6">
        <p className="text-fg">
          This card uses semantic tokens. Try switching themes.
        </p>
        <button className="mt-4 rounded-lg bg-primary px-4 py-2 text-primary-foreground">
          Primary button
        </button>
      </div>
    </main>
  )
}
