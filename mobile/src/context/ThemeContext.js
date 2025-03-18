import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext();

export const useTheme = () => {
  return useContext(ThemeContext);
};

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadThemePreference();
  }, []);

  const loadThemePreference = async () => {
    try {
      const savedTheme = await AsyncStorage.getItem('theme');
      if (savedTheme) {
        setIsDarkMode(savedTheme === 'dark');
      } else {
        // If no saved preference, use system preference
        setIsDarkMode(systemColorScheme === 'dark');
      }
    } catch (error) {
      console.error('Failed to load theme preference:', error);
      setIsDarkMode(systemColorScheme === 'dark');
    } finally {
      setLoading(false);
    }
  };

  const toggleTheme = async () => {
    try {
      const newTheme = !isDarkMode;
      setIsDarkMode(newTheme);
      await AsyncStorage.setItem('theme', newTheme ? 'dark' : 'light');
    } catch (error) {
      console.error('Failed to save theme preference:', error);
    }
  };

  const theme = {
    isDarkMode,
    colors: {
      primary: isDarkMode ? '#64B5F6' : '#2196F3',
      accent: isDarkMode ? '#4FC3F7' : '#03A9F4',
      background: isDarkMode ? '#121212' : '#F5F5F5',
      surface: isDarkMode ? '#1E1E1E' : '#FFFFFF',
      text: isDarkMode ? '#FFFFFF' : '#212121',
      error: isDarkMode ? '#CF6679' : '#B00020',
      success: isDarkMode ? '#81C784' : '#4CAF50',
      warning: isDarkMode ? '#FFD54F' : '#FFC107',
      card: isDarkMode ? '#2D2D2D' : '#FFFFFF',
      border: isDarkMode ? '#404040' : '#E0E0E0',
      notification: isDarkMode ? '#FF4081' : '#F50057',
    },
    spacing: {
      xs: 4,
      sm: 8,
      md: 16,
      lg: 24,
      xl: 32,
    },
    typography: {
      h1: {
        fontSize: 32,
        fontWeight: 'bold',
      },
      h2: {
        fontSize: 24,
        fontWeight: 'bold',
      },
      h3: {
        fontSize: 20,
        fontWeight: 'bold',
      },
      body: {
        fontSize: 16,
      },
      caption: {
        fontSize: 14,
      },
    },
    borderRadius: {
      sm: 4,
      md: 8,
      lg: 16,
      xl: 24,
      round: 9999,
    },
    shadows: {
      small: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: isDarkMode ? 0.3 : 0.1,
        shadowRadius: 3,
        elevation: 2,
      },
      medium: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 4,
        },
        shadowOpacity: isDarkMode ? 0.4 : 0.15,
        shadowRadius: 6,
        elevation: 4,
      },
      large: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowOpacity: isDarkMode ? 0.5 : 0.2,
        shadowRadius: 12,
        elevation: 8,
      },
    },
  };

  const value = {
    theme,
    isDarkMode,
    toggleTheme,
    loading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {!loading && children}
    </ThemeContext.Provider>
  );
}; 