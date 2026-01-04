'use client';

import { useState, useEffect } from 'react';
import { 
  AppSettings, 
  loadSettings, 
  updateSetting, 
  resetSettings,
  TEXT_SCALE_OPTIONS,
  THEME_OPTIONS,
  TRANSLATION_OPTIONS,
  DATE_FORMAT_OPTIONS,
  PERSIST_SETTINGS_OPTIONS 
} from '../helpers/settings';

interface DropdownModalProps {
  title: string;
  options: readonly { value: any; label: string }[];
  currentValue: any;
  onSelect: (value: any) => void;
  onClose: () => void;
  onDefault?: () => void;
  defaultValue?: any;
}

function DropdownModal({ 
  title, 
  options, 
  currentValue, 
  onSelect, 
  onClose, 
  onDefault,
  defaultValue 
}: DropdownModalProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-surface border border-gray-200 rounded-sm p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium">{title}</h2>
          <button 
            onClick={onClose}
            className="text-fg/50 hover:text-fg text-xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-2 mb-4">
          {options.map((option) => (
            <button
              key={String(option.value)}
              onClick={() => {
                onSelect(option.value);
                onClose();
              }}
              className={`
                w-full text-left px-3 py-2 rounded-sm transition-colors
                ${currentValue === option.value 
                  ? 'bg-primary/20 text-primary' 
                  : 'hover:bg-gray-100'
                }
              `}
            >
              {option.label}
            </button>
          ))}
        </div>
        
        {onDefault && (
          <div className="flex gap-2">
            <button
              onClick={() => {
                if (defaultValue !== undefined) {
                  onSelect(defaultValue);
                }
                onClose();
              }}
              className="px-4 py-2 text-sm bg-accent/10 text-accent rounded-sm hover:bg-accent/20 transition-colors"
            >
              Set to Default
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm bg-gray-100 rounded-sm hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<AppSettings>(() => loadSettings());
  const [activeModal, setActiveModal] = useState<string | null>(null);

  // Load settings on component mount
  useEffect(() => {
    setSettings(loadSettings());
  }, []);

  const handleUpdateSetting = <K extends keyof AppSettings>(
    key: K, 
    value: AppSettings[K]
  ) => {
    const newSettings = updateSetting(key, value);
    setSettings(newSettings);
  };

  const handleResetAll = () => {
    const newSettings = resetSettings();
    setSettings(newSettings);
    
    // Apply theme and text scale immediately
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', newSettings.favouriteTheme);
      const root = document.documentElement;
      root.style.setProperty('--text-scale', '1'); // Medium text scale
    }
  };

  const getDisplayValue = (key: keyof AppSettings): string => {
    const value = settings[key];
    
    switch (key) {
      case 'textScale':
        return TEXT_SCALE_OPTIONS.find(opt => opt.value === value)?.label || String(value);
      case 'favouriteTheme':
        return THEME_OPTIONS.find(opt => opt.value === value)?.label || String(value);
      case 'favouriteTranslation':
        return TRANSLATION_OPTIONS.find(opt => opt.value === value)?.label || String(value);
      case 'dateFormat':
        return DATE_FORMAT_OPTIONS.find(opt => opt.value === value)?.label || String(value);
      case 'persistSettings':
        return PERSIST_SETTINGS_OPTIONS.find(opt => opt.value === value)?.label || String(value);
      default:
        return String(value);
    }
  };

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-semibold mb-2">Settings</h1>
        <p className="text-sm text-fg/70">Customize your reading experience</p>
      </header>
      
      <div className="space-y-4 mb-8">
        {/* Text Scale */}
        <div className="flex items-center justify-between py-3 border-b border-gray-200/50">
          <div>
            <div className="font-medium">Text Size</div>
            <div className="text-sm text-fg/70">Adjust the reading text size</div>
          </div>
          <button 
            onClick={() => setActiveModal('textScale')}
            className="px-4 py-2 text-sm border border-gray-200 rounded-sm hover:bg-gray-100 transition-colors min-h-[32px]"
          >
            {getDisplayValue('textScale')}
          </button>
        </div>

        {/* Favourite Theme */}
        <div className="flex items-center justify-between py-3 border-b border-gray-200/50">
          <div>
            <div className="font-medium">Favourite Theme</div>
            <div className="text-sm text-fg/70">Choose your preferred visual style</div>
          </div>
          <button 
            onClick={() => setActiveModal('favouriteTheme')}
            className="px-4 py-2 text-sm border border-gray-200 rounded-sm hover:bg-gray-100 transition-colors min-h-[32px]"
          >
            {getDisplayValue('favouriteTheme')}
          </button>
        </div>

        {/* Favourite Translation */}
        <div className="flex items-center justify-between py-3 border-b border-gray-200/50">
          <div>
            <div className="font-medium">Favourite Translation</div>
            <div className="text-sm text-fg/70">Default Bible translation to display</div>
          </div>
          <button 
            onClick={() => setActiveModal('favouriteTranslation')}
            className="px-4 py-2 text-sm border border-gray-200 rounded-sm hover:bg-gray-100 transition-colors min-h-[32px]"
          >
            {getDisplayValue('favouriteTranslation')}
          </button>
        </div>

        {/* Date Format */}
        <div className="flex items-center justify-between py-3 border-b border-gray-200/50">
          <div>
            <div className="font-medium">Date Format</div>
            <div className="text-sm text-fg/70">How dates are displayed throughout the app</div>
          </div>
          <button 
            onClick={() => setActiveModal('dateFormat')}
            className="px-4 py-2 text-sm border border-gray-200 rounded-sm hover:bg-gray-100 transition-colors min-h-[32px]"
          >
            {getDisplayValue('dateFormat')}
          </button>
        </div>

        {/* Persist Settings */}
        <div className="flex items-center justify-between py-3 border-b border-gray-200/50">
          <div>
            <div className="font-medium">Persist Settings</div>
            <div className="text-sm text-fg/70">Save preferences in your browser</div>
          </div>
          <button 
            onClick={() => setActiveModal('persistSettings')}
            className="px-4 py-2 text-sm border border-gray-200 rounded-sm hover:bg-gray-100 transition-colors min-h-[32px]"
          >
            {getDisplayValue('persistSettings')}
          </button>
        </div>
      </div>

      {/* Default All Button */}
      <div className="pt-4 border-t border-gray-200">
        <button
          onClick={handleResetAll}
          className="px-6 py-3 bg-danger/10 text-danger rounded-sm hover:bg-danger/20 transition-colors font-medium"
        >
          Reset All to Defaults
        </button>
        <p className="text-xs text-fg/60 mt-2">
          This will reset all settings to their default values
        </p>
      </div>

      {/* Modals */}
      {activeModal === 'textScale' && (
        <DropdownModal
          title="Text Size"
          options={TEXT_SCALE_OPTIONS}
          currentValue={settings.textScale}
          onSelect={(value) => handleUpdateSetting('textScale', value)}
          onClose={() => setActiveModal(null)}
          onDefault={() => handleUpdateSetting('textScale', 'medium')}
          defaultValue="medium"
        />
      )}

      {activeModal === 'favouriteTheme' && (
        <DropdownModal
          title="Favourite Theme"
          options={THEME_OPTIONS}
          currentValue={settings.favouriteTheme}
          onSelect={(value) => handleUpdateSetting('favouriteTheme', value)}
          onClose={() => setActiveModal(null)}
          onDefault={() => handleUpdateSetting('favouriteTheme', 'davdevs-paper')}
          defaultValue="davdevs-paper"
        />
      )}

      {activeModal === 'favouriteTranslation' && (
        <DropdownModal
          title="Favourite Translation"
          options={TRANSLATION_OPTIONS}
          currentValue={settings.favouriteTranslation}
          onSelect={(value) => handleUpdateSetting('favouriteTranslation', value)}
          onClose={() => setActiveModal(null)}
          onDefault={() => handleUpdateSetting('favouriteTranslation', 'KJV')}
          defaultValue="KJV"
        />
      )}

      {activeModal === 'dateFormat' && (
        <DropdownModal
          title="Date Format"
          options={DATE_FORMAT_OPTIONS}
          currentValue={settings.dateFormat}
          onSelect={(value) => handleUpdateSetting('dateFormat', value)}
          onClose={() => setActiveModal(null)}
          onDefault={() => handleUpdateSetting('dateFormat', 'dd mmm yyyy')}
          defaultValue="dd mmm yyyy"
        />
      )}

      {activeModal === 'persistSettings' && (
        <DropdownModal
          title="Persist Settings"
          options={PERSIST_SETTINGS_OPTIONS}
          currentValue={settings.persistSettings}
          onSelect={(value) => handleUpdateSetting('persistSettings', value)}
          onClose={() => setActiveModal(null)}
          onDefault={() => handleUpdateSetting('persistSettings', true)}
          defaultValue={true}
        />
      )}
    </div>
  );
}