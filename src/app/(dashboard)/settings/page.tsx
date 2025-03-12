// src/app/(dashboard)/settings/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useUserProgressStore } from '@/store/user-progress-store';

// Settings store using localStorage
const useSettingsStore = () => {
  // Default settings
  const defaultSettings = {
    theme: 'light',
    fontSize: 'medium',
    textToSpeech: false,
    highContrast: false,
    notifications: true
  };

  // State for settings
  const [settings, setSettings] = useState(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load settings from localStorage on component mount
  useEffect(() => {
    const storedSettings = localStorage.getItem('geometry-tutor-settings');
    if (storedSettings) {
      setSettings(JSON.parse(storedSettings));
    }
    setIsLoaded(true);
  }, []);

  // Update individual setting
  const updateSetting = (key: keyof typeof defaultSettings, value: any) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    localStorage.setItem('geometry-tutor-settings', JSON.stringify(newSettings));

    // Apply settings that affect the UI
    applySettings(newSettings);
  };

  // Apply settings to the document
  const applySettings = (newSettings: typeof defaultSettings) => {
    // Apply theme
    if (newSettings.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    // Apply font size
    document.documentElement.classList.remove('text-sm', 'text-base', 'text-lg');
    if (newSettings.fontSize === 'small') {
      document.documentElement.classList.add('text-sm');
    } else if (newSettings.fontSize === 'large') {
      document.documentElement.classList.add('text-lg');
    } else {
      document.documentElement.classList.add('text-base');
    }

    // Apply high contrast
    if (newSettings.highContrast) {
      document.documentElement.classList.add('high-contrast');
    } else {
      document.documentElement.classList.remove('high-contrast');
    }
  };

  // Apply settings on initial load
  useEffect(() => {
    if (isLoaded) {
      applySettings(settings);
    }
  }, [isLoaded, settings]);

  // Reset settings to default
  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem('geometry-tutor-settings', JSON.stringify(defaultSettings));
    applySettings(defaultSettings);
  };

  return {
    settings,
    updateSetting,
    resetSettings,
    isLoaded
  };
};

export default function SettingsPage() {
  const { resetProgress } = useUserProgressStore();
  const { settings, updateSetting, resetSettings, isLoaded } = useSettingsStore();
  const [resetConfirmation, setResetConfirmation] = useState(false);

  if (!isLoaded) {
    return <div className="flex justify-center items-center h-64">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold mb-6">Settings</h1>

        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          {/* Appearance */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-4">Appearance</h2>
            
            <div className="space-y-6">
              {/* Theme */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Theme
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={() => updateSetting('theme', 'light')}
                    className={`border rounded-lg p-4 flex flex-col items-center transition-colors ${
                      settings.theme === 'light'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-16 h-16 bg-white border border-gray-200 rounded-lg shadow-sm mb-2 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-yellow-500"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                        />
                      </svg>
                    </div>
                    <span className="font-medium">Light</span>
                  </button>

                  <button
                    onClick={() => updateSetting('theme', 'dark')}
                    className={`border rounded-lg p-4 flex flex-col items-center transition-colors ${
                      settings.theme === 'dark'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="w-16 h-16 bg-gray-800 border border-gray-700 rounded-lg shadow-sm mb-2 flex items-center justify-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-gray-200"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                        />
                      </svg>
                    </div>
                    <span className="font-medium">Dark</span>
                  </button>
                </div>
              </div>

              {/* Font Size */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Font Size
                </label>
                <div className="grid grid-cols-3 gap-4">
                  <button
                    onClick={() => updateSetting('fontSize', 'small')}
                    className={`border rounded-lg p-3 flex flex-col items-center transition-colors ${
                      settings.fontSize === 'small'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-sm font-medium">Small</span>
                  </button>

                  <button
                    onClick={() => updateSetting('fontSize', 'medium')}
                    className={`border rounded-lg p-3 flex flex-col items-center transition-colors ${
                      settings.fontSize === 'medium'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-base font-medium">Medium</span>
                  </button>

                  <button
                    onClick={() => updateSetting('fontSize', 'large')}
                    className={`border rounded-lg p-3 flex flex-col items-center transition-colors ${
                      settings.fontSize === 'large'
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <span className="text-lg font-medium">Large</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Accessibility */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-4">Accessibility</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">Text-to-Speech</h3>
                  <p className="text-sm text-gray-500">
                    Read content aloud using text-to-speech
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.textToSpeech}
                    onChange={(e) => updateSetting('textToSpeech', e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-medium">High Contrast</h3>
                  <p className="text-sm text-gray-500">
                    Increase contrast for better visibility
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    checked={settings.highContrast}
                    onChange={(e) => updateSetting('highContrast', e.target.checked)}
                    className="sr-only peer" 
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>

          {/* Notifications */}
          <div className="p-6 border-b">
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>
            
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-medium">Review Reminders</h3>
                <p className="text-sm text-gray-500">
                  Get notifications when your scheduled reviews are due
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={settings.notifications}
                  onChange={(e) => updateSetting('notifications', e.target.checked)}
                  className="sr-only peer" 
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          {/* Data Management */}
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Data Management</h2>
            
            <div className="space-y-6">
              <div>
                <h3 className="font-medium mb-2">Reset Settings</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Reset all settings to their default values
                </p>
                <button
                  onClick={resetSettings}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-4 rounded transition-colors text-sm"
                >
                  Reset Settings
                </button>
              </div>

              <div>
                <h3 className="font-medium mb-2">Reset Progress</h3>
                <p className="text-sm text-gray-500 mb-3">
                  Reset all your learning progress. This action cannot be undone.
                </p>
                {!resetConfirmation ? (
                  <button
                    onClick={() => setResetConfirmation(true)}
                    className="bg-red-100 hover:bg-red-200 text-red-800 py-2 px-4 rounded transition-colors text-sm"
                  >
                    Reset Progress
                  </button>
                ) : (
                  <div className="bg-red-50 p-3 rounded-lg border border-red-200">
                    <p className="text-sm text-red-800 mb-3">
                      Are you sure? This will delete all your progress data.
                    </p>
                    <div className="flex space-x-3">
                      <button
                        onClick={() => {
                          resetProgress();
                          setResetConfirmation(false);
                        }}
                        className="bg-red-600 hover:bg-red-700 text-white py-1 px-3 rounded transition-colors text-sm"
                      >
                        Yes, Reset Everything
                      </button>
                      <button
                        onClick={() => setResetConfirmation(false)}
                        className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-1 px-3 rounded transition-colors text-sm"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}