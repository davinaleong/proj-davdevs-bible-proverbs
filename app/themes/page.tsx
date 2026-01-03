'use client';

import { useState, useEffect } from 'react';
import themesData from '../data/themes.json';

export default function ThemesPage() {
  const [currentTheme, setCurrentTheme] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Load current theme from localStorage on mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('preferred-theme') || 'davdevs-paper';
    setCurrentTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
    setIsLoading(false);
  }, []);

  // Handle theme switching
  const switchTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    document.documentElement.setAttribute('data-theme', themeId);
    localStorage.setItem('preferred-theme', themeId);
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Themes</h1>
        <span className="text-sm text-fg/70">
          {isLoading ? 'Loading...' : 
            `Current: ${themesData.themes.find(t => t.id === currentTheme)?.name || currentTheme}`
          }
        </span>
      </header>
      
      <div className="space-y-8">
        {themesData.categories.map((category) => (
          <section key={category.name}>
            <h2 className="text-lg font-medium mb-4 text-fg/90">{category.name}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {category.themes.map((themeId) => {
                const theme = themesData.themes.find(t => t.id === themeId);
                if (!theme) return null;
                
                const isActive = currentTheme === theme.id;
                
                return (
                  <button
                    key={theme.id}
                    onClick={() => switchTheme(theme.id)}
                    className={`
                      w-full flex items-start justify-between p-4 text-left 
                      border rounded-md transition-all duration-200
                      min-h-[var(--tap-target)]
                      ${isActive 
                        ? 'border-primary bg-primary/5 shadow-sm' 
                        : 'border-border bg-surface hover:bg-border/20 hover:shadow-sm'
                      }
                    `}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-medium text-base">{theme.name}</span>
                        {theme.isDefault && (
                          <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                            Default
                          </span>
                        )}
                        {isActive && (
                          <span className="text-xs px-2 py-0.5 bg-success/10 text-success rounded-full">
                            Active
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-fg/70">{theme.description}</p>
                    </div>
                    
                    {/* Theme preview circle */}
                    <div className="ml-3 flex-shrink-0">
                      <div 
                        className="w-6 h-6 rounded-full border-2 border-border/50"
                        style={{
                          background: getThemePreviewColor(theme.id)
                        }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </section>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-surface border border-border rounded-md">
        <h3 className="font-medium mb-2">About Themes</h3>
        <p className="text-sm text-fg/70">
          Themes are automatically saved to your browser and will persist across sessions. 
          All themes are designed with readability in mind and include paper-like textures for comfortable reading.
        </p>
      </div>
    </div>
  );
}

// Helper function to get theme preview colors
function getThemePreviewColor(themeId: string): string {
  const previewColors = {
    'minimal-light': 'linear-gradient(135deg, #ffffff 0%, #f7f7f7 100%)',
    'minimal-dark': 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
    'davdevs-paper': 'linear-gradient(135deg, #f5f4f0 0%, #ede9e0 100%)',
    'davdevs-night': 'linear-gradient(135deg, #1e1f3a 0%, #2a2d5a 100%)',
    'rose-devotion': 'linear-gradient(135deg, #f0c2cc 0%, #d4a5d4 100%)',
    'classic-editorial': 'linear-gradient(135deg, #f3f1eb 0%, #e8e3d8 100%)',
    'lamborghini': 'linear-gradient(135deg, #ffeb00 0%, #f5d800 100%)',
    'teh-tarik': 'linear-gradient(135deg, #f0ebe2 0%, #d4c4a8 100%)',
    'arctic-dawn': 'linear-gradient(135deg, #5a6b7d 0%, #6b7c8f 100%)',
    'ocean-breeze': 'linear-gradient(135deg, #a8d0f0 0%, #5fa8d3 100%)',
    'patriot-red': 'linear-gradient(135deg, #ffffff 0%, #dc2626 100%)',
    'liberty-flag': 'linear-gradient(135deg, #ffffff 25%, #1e40af 50%, #dc2626 100%)',
    'accessible-light': 'linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)',
    'accessible-dark': 'linear-gradient(135deg, #000000 0%, #333333 100%)',
  };
  
  return previewColors[themeId as keyof typeof previewColors] || '#f5f4f0';
}