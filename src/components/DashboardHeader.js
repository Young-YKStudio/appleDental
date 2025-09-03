"use client";
import { useSelector, useDispatch } from "react-redux";
import { setLanguage } from "../store/slices/languageSlice";
import { selectCurrentLanguage } from "../store/slices/languageSlice";
import { navigationContent } from "../data/navigationContent";

export default function DashboardHeader() {
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguage);
  const navContent = navigationContent[language];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo and Title */}
        <div className="flex items-center space-x-4">
          <a href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity duration-300">
            <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">A</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-800">Apple Dental</h1>
              <p className="text-xs text-gray-500">Admin Dashboard</p>
            </div>
          </a>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/" className="text-gray-600 hover:text-green-600 transition-colors duration-300 text-sm">
            {language === 'en' ? 'Home' : '홈'}
          </a>
          <a href="/reservation" className="text-gray-600 hover:text-green-600 transition-colors duration-300 text-sm">
            {language === 'en' ? 'New Booking' : '새 예약'}
          </a>
          <a href="/dashboard" className="text-green-600 font-medium text-sm">
            {language === 'en' ? 'Dashboard' : '대시보드'}
          </a>
        </nav>

        {/* User Info and Actions */}
        <div className="flex items-center space-x-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 transition-colors duration-300">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-5 5v-5zM9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* User Profile */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
              <span className="text-gray-600 text-sm font-medium">A</span>
            </div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium text-gray-800">Admin User</p>
              <p className="text-xs text-gray-500">Administrator</p>
            </div>
          </div>

          {/* Language Toggle */}
          <div className="flex items-center">
            <div className="bg-gray-100 rounded-lg p-1 flex items-center gap-1">
              <button
                onClick={() => dispatch(setLanguage('ko'))}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-300 ${
                  language === 'ko' 
                    ? 'bg-white text-gray-800 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                KO
              </button>
              <button
                onClick={() => dispatch(setLanguage('en'))}
                className={`px-3 py-1 rounded-md text-xs font-medium transition-all duration-300 ${
                  language === 'en' 
                    ? 'bg-white text-gray-800 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
