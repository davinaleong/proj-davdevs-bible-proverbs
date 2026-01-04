'use client';

import { useState, useEffect } from 'react';
import themesData from '../data/themes.json';
import { loadSettings, updateSetting } from '../helpers/settings';

export default function ThemesPage() {
  const [currentTheme, setCurrentTheme] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);

  // Load current theme from settings on mount
  useEffect(() => {
    const settings = loadSettings();
    setCurrentTheme(settings.favouriteTheme);
    setIsLoading(false);
  }, []);

  // Handle theme switching
  const switchTheme = (themeId: string) => {
    setCurrentTheme(themeId);
    updateSetting('favouriteTheme', themeId);
  };

  return (
    <div>
      <header className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Select Theme</h1>
          <p className="text-sm text-fg/70 mt-1">Choose your visual style for reading</p>
        </div>
        <span className="text-sm text-fg/70">
          {isLoading ? 'Loading...' : 
            `Current: ${themesData.themes.find(t => t.id === currentTheme)?.name || currentTheme}`
          }
        </span>
      </header>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {themesData.themes.map((theme) => {
          const isActive = currentTheme === theme.id;
          
          return (
            <button
              key={theme.id}
              onClick={() => switchTheme(theme.id)}
              className={`
                p-4 text-left border rounded-sm transition-all duration-200
                min-h-[var(--tap-target)]
                ${isActive 
                  ? 'border-primary bg-primary/10 shadow-lg ring-2 ring-primary/20' 
                  : 'border-border bg-surface hover:bg-border/20 hover:shadow-md hover:border-primary/30'
                }
              `}
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-base">{theme.name}</h3>
                <div className="flex gap-2">
                  {theme.isDefault && (
                    <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full font-medium">
                      Default
                    </span>
                  )}
                  {isActive && (
                    <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full font-medium">
                      ✓ Active
                    </span>
                  )}
                </div>
              </div>
              <p className="text-sm text-fg/70 leading-relaxed">{theme.description}</p>
              
              {/* Theme preview bar */}
              <div className="mt-3 flex gap-1 h-2">
                <div className="flex-1 bg-primary/60 rounded-full"></div>
                <div className="flex-1 bg-accent/60 rounded-full"></div>
                <div className="flex-1 bg-success/60 rounded-full"></div>
                <div className="flex-1 bg-warning/60 rounded-full"></div>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="mt-8 p-4 bg-surface border border-border rounded-sm">
        <h3 className="font-medium mb-2">🎨 About Themes</h3>
        <p className="text-sm text-fg/70 leading-relaxed mb-3">
          Themes change the visual appearance of the entire app including colors, fonts, and styling. 
          Your selected theme will be saved as your favorite and applied automatically on future visits.
        </p>
        <ul className="text-xs text-fg/60 space-y-1">
          <li><strong>Dav/Devs Light:</strong> The default warm and inviting light theme</li>
          <li><strong>Simple Themes:</strong> Minimal designs for distraction-free reading</li>
          <li><strong>Specialty Themes:</strong> Unique styles for different moods and preferences</li>
        </ul>
      </div>
    </div>
  );
}