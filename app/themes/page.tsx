export default function ThemesPage() {
  // In a real app, this would come from your theme system
  const themes = [
    'Light',
    'Dark', 
    'Ocean',
    'Rose',
    'Light',
    'Light',
    'Light',
    'Light',
    'Light',
    'Light',
    'Light',
    'Light',
    'Light',
    'Light',
    'Light',
    'Light',
    'Light',
    'Light',
    'Light',
    'Light',
  ];

  return (
    <div className="max-w-2xl">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Themes</h1>
        <span className="text-sm text-fg/70">Current: Light</span>
      </header>
      
      <div className="space-y-2">
        {themes.map((theme, index) => (
          <button
            key={index}
            className="
              w-full p-4 text-left text-base
              border border-border rounded-md bg-surface 
              hover:bg-border/20 transition-colors
              min-h-[var(--tap-target)]
            "
          >
            {theme}
          </button>
        ))}
      </div>
    </div>
  );
}