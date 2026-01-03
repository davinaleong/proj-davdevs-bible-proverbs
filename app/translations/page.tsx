export default function TranslationsPage() {
  // In a real app, this would come from your data source
  const translations = [
    { abbreviation: 'KJV', name: 'King James Version' },
    { abbreviation: 'YLT', name: "Young's Literal Translation" },
    { abbreviation: 'ASV', name: 'American Standard Version' },
    { abbreviation: 'WBT', name: "Webster's Bible" },
    { abbreviation: 'KJV', name: 'King James Version' },
    { abbreviation: 'KJV', name: 'King James Version' },
    { abbreviation: 'KJV', name: 'King James Version' },
    { abbreviation: 'KJV', name: 'King James Version' },
    { abbreviation: 'KJV', name: 'King James Version' },
    { abbreviation: 'KJV', name: 'King James Version' },
    { abbreviation: 'KJV', name: 'King James Version' },
    { abbreviation: 'KJV', name: 'King James Version' },
  ];

  return (
    <div className="max-w-2xl">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Translations</h1>
        <span className="text-sm text-fg/70">Current: KJV</span>
      </header>
      
      <div className="space-y-2">
        {translations.map((translation, index) => (
          <button
            key={index}
            className="
              w-full flex items-center justify-between p-4 text-left 
              border border-border rounded-md bg-surface 
              hover:bg-border/20 transition-colors
              min-h-[var(--tap-target)]
            "
          >
            <div>
              <span className="font-medium text-base">{translation.abbreviation}</span>
              <span className="text-fg/70 ml-2">· {translation.name}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}