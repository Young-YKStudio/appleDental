import { createSlice } from '@reduxjs/toolkit';

// Get language from localStorage if available, otherwise default to Korean
const getInitialLanguage = () => {
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('appledental-language');
    return savedLanguage || 'ko';
  }
  return 'ko';
};

const initialState = {
  currentLanguage: getInitialLanguage(),
  availableLanguages: ['en', 'ko'],
  languageNames: {
    en: 'English',
    ko: '한국어'
  },
  isLanguageMenuOpen: false,
};

const languageSlice = createSlice({
  name: 'language',
  initialState,
  reducers: {
    setLanguage: (state, action) => {
      const newLanguage = action.payload;
      if (state.availableLanguages.includes(newLanguage)) {
        state.currentLanguage = newLanguage;
        // Save to localStorage
        if (typeof window !== 'undefined') {
          localStorage.setItem('appledental-language', newLanguage);
        }
      }
    },
    toggleLanguage: (state) => {
      const currentIndex = state.availableLanguages.indexOf(state.currentLanguage);
      const nextIndex = (currentIndex + 1) % state.availableLanguages.length;
      const newLanguage = state.availableLanguages[nextIndex];
      state.currentLanguage = newLanguage;
      // Save to localStorage
      if (typeof window !== 'undefined') {
        localStorage.setItem('appledental-language', newLanguage);
      }
    },
    toggleLanguageMenu: (state) => {
      state.isLanguageMenuOpen = !state.isLanguageMenuOpen;
    },
    closeLanguageMenu: (state) => {
      state.isLanguageMenuOpen = false;
    },
    initializeLanguage: (state) => {
      // Initialize language from localStorage on app start
      if (typeof window !== 'undefined') {
        const savedLanguage = localStorage.getItem('appledental-language');
        if (savedLanguage && state.availableLanguages.includes(savedLanguage)) {
          state.currentLanguage = savedLanguage;
        }
      }
    },
  },
});

export const { 
  setLanguage, 
  toggleLanguage, 
  toggleLanguageMenu, 
  closeLanguageMenu,
  initializeLanguage 
} = languageSlice.actions;

export default languageSlice.reducer;

// Selectors
export const selectCurrentLanguage = (state) => state.language.currentLanguage;
export const selectIsEnglish = (state) => state.language.currentLanguage === 'en';
export const selectIsKorean = (state) => state.language.currentLanguage === 'ko';
export const selectAvailableLanguages = (state) => state.language.availableLanguages;
export const selectLanguageNames = (state) => state.language.languageNames;
export const selectIsLanguageMenuOpen = (state) => state.language.isLanguageMenuOpen;
export const selectCurrentLanguageName = (state) => 
  state.language.languageNames[state.language.currentLanguage];
