import { Moon, Sun } from 'lucide-react';
import React from 'react';
import { useTheme } from '../../contexts/ThemeContext';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 text-gray-300 transition-colors rounded-full hover:text-white hover:bg-gray-700 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-gray-800 dark:focus:ring-offset-gray-900"
      aria-label={theme === 'dark' ? "Ativar modo claro" : "Ativar modo escuro"}
    >
      {theme === 'dark' ? 
        <Sun className="w-5 h-5 text-yellow-400" /> : 
        <Moon className="w-5 h-5 text-slate-400" />
      }
    </button>
  );
};

export default ThemeToggle;