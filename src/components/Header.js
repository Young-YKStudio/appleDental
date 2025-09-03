"use client";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../store/slices/languageSlice";
import { selectCurrentLanguage } from "../store/slices/languageSlice";
import { navigationContent } from "../data/navigationContent";

export default function Header() {
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguage);
  const navContent = navigationContent[language];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-green-100">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300">
          <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">A</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-gray-800">Apple Dental</h1>
            <p className="text-xs text-gray-500">
              {navContent.tagline}
            </p>
          </div>
        </a>

        {/* Navigation
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#services" className="text-gray-600 hover:text-green-600 transition-colors duration-300">
            {navContent.services}
          </a>
          <a href="#about" className="text-gray-600 hover:text-green-600 transition-colors duration-300">
            {navContent.about}
          </a>
          <a href="#contact" className="text-gray-600 hover:text-green-600 transition-colors duration-300">
            {navContent.contact}
          </a>
        </nav> */}

        {/* Right side - Login and Language Toggle */}
        <div className="flex items-center space-x-4">
          <a href="/reservation" className="flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full transition-colors duration-300">
            <span className="text-sm font-medium">
              Book Appointment
            </span>
          </a>
          <a href="/dashboard" className="text-gray-600 hover:text-green-600 transition-colors duration-300">
            {navContent.login}
          </a>
          
          {/* Language Toggle */}
          <div className="bg-white rounded-full shadow-lg p-1 flex items-center gap-1">
            <button
              onClick={() => dispatch(setLanguage('ko'))}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                language === 'ko' 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              한국어
            </button>
            <button
              onClick={() => dispatch(setLanguage('en'))}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                language === 'en' 
                  ? 'bg-green-600 text-white' 
                  : 'text-gray-600 hover:text-green-600'
              }`}
            >
              English
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
