'use client';

import { useState } from 'react';

export default function SettingsPage() {
  const [showTextSizeModal, setShowTextSizeModal] = useState(false);

  const settings = [
    { label: 'Text Size', value: 'Medium' },
    { label: 'Favourite Theme', value: 'DavDevs Light' },
    { label: 'Favourite Translation', value: 'KJV' },
    { label: 'Date Format', value: 'DD MMM YYYY' },
    { label: 'Persist Settings', value: 'No' },
  ];

  const textSizeOptions = ['Small', 'Medium', 'Large'];

  return (
    <div className="max-w-2xl">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Settings</h1>
        <p className="text-sm text-fg/70">Click on the label to reset that setting.</p>
      </header>
      
      <div className="space-y-4 mb-8">
        {settings.map((setting, index) => (
          <div key={index} className="flex items-center justify-between py-2">
            <button 
              className="text-base hover:text-primary transition-colors"
              onClick={() => {
                if (setting.label === 'Text Size') {
                  setShowTextSizeModal(true);
                }
              }}
            >
              {setting.label}
            </button>
            <button 
              className="
                px-3 py-1 text-sm border border-border rounded
                hover:bg-border/20 transition-colors
                min-h-[32px]
              "
              onClick={() => {
                if (setting.label === 'Text Size') {
                  setShowTextSizeModal(true);
                }
              }}
            >
              {setting.value}
            </button>
          </div>
        ))}
      </div>

      <button className="
        px-4 py-2 text-sm border border-border rounded
        hover:bg-border/20 transition-colors
        min-h-[var(--tap-target)]
      ">
        Reset All Settings
      </button>

      {/* Text Size Modal */}
      {showTextSizeModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface border border-border rounded-sm p-6 w-full max-w-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-semibold">Text Size</h2>
              <button 
                onClick={() => setShowTextSizeModal(false)}
                className="text-fg/70 hover:text-fg"
              >
                Close
              </button>
            </div>
            
            <div className="space-y-2 mb-6">
              {textSizeOptions.map((option) => (
                <button
                  key={option}
                  className="
                    w-full p-3 text-left border border-border rounded
                    hover:bg-border/20 transition-colors
                    min-h-[var(--tap-target)]
                  "
                >
                  {option}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <button className="px-4 py-2 text-sm hover:text-primary transition-colors">
                Default
              </button>
              <div className="space-x-3">
                <button className="px-4 py-2 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90 transition-colors">
                  OK
                </button>
                <button 
                  onClick={() => setShowTextSizeModal(false)}
                  className="px-4 py-2 text-sm border border-border rounded hover:bg-border/20 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}