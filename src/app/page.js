"use client";
import { useSelector, useDispatch } from "react-redux";
import { initializeLanguage } from "../store/slices/languageSlice";
import { selectCurrentLanguage } from "../store/slices/languageSlice";
import { useEffect } from "react";
import Image from "next/image";
import { content } from "../data/content";
import Header from "../components/Header";

export default function Home() {
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguage);

  // Initialize language from localStorage on component mount
  useEffect(() => {
    dispatch(initializeLanguage());
  }, [dispatch]);

  const currentContent = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      {/* Header */}
      <Header />

      {/* Hero Section with Tooth Picture */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden pt-20">
        <div className="absolute inset-0 bg-gradient-to-r from-green-600/20 to-emerald-600/20"></div>
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-12">
            <div className="flex-1 text-left">
              <h1 className="text-5xl lg:text-7xl font-bold text-gray-800 mb-6">
                {currentContent.hero.title}
                <span className="block text-green-600">{currentContent.hero.subtitle}</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                {currentContent.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="/reservation" className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg">
                  {currentContent.hero.bookButton}
                </a>
                <button className="border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300">
                  {currentContent.hero.learnButton}
                </button>
              </div>
            </div>
            <div className="flex-1 flex justify-center">
              <div className="relative">
                {/* Main Tooth Image */}
                <div className="w-80 h-80 lg:w-96 lg:h-96 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center shadow-2xl overflow-hidden">
                  <Image
                    src="/tooth-photo.jpg"
                    alt="Healthy white tooth - professional dental care"
                    width={400}
                    height={400}
                    className="object-cover w-full h-full rounded-full"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">{currentContent.services.title}</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {currentContent.services.subtitle}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentContent.services.items.map((service, index) => (
              <div key={index} className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{service.title}</h3>
                <p className="text-gray-600">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-4 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-800 mb-6">{currentContent.about.title}</h2>
              <div className="space-y-4">
                {currentContent.about.items.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-green-600 rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-80 h-80 bg-gradient-to-br from-green-200 to-emerald-200 rounded-full flex items-center justify-center shadow-2xl">
                  <div className="text-8xl text-green-600">🏥</div>
                </div>
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
                  <div className="text-2xl">⭐</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-800 text-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4">Apple Dental</h3>
              <p className="text-gray-300">
                {currentContent.footer.tagline}
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{currentContent.footer.services}</h4>
              <ul className="space-y-2 text-gray-300">
                <li>{currentContent.services.items[0].title}</li>
                <li>{currentContent.services.items[1].title}</li>
                <li>{currentContent.services.items[2].title}</li>
                <li>{currentContent.services.items[3].title}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{currentContent.footer.contact}</h4>
              <ul className="space-y-2 text-gray-300">
                <li>{currentContent.footer.contactInfo.phone}</li>
                <li>{currentContent.footer.contactInfo.email}</li>
                <li>{currentContent.footer.contactInfo.address}</li>
                <li>{currentContent.footer.contactInfo.location}</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">{currentContent.footer.hours}</h4>
              <ul className="space-y-2 text-gray-300">
                <li>{currentContent.footer.hoursInfo.weekdays}</li>
                <li>{currentContent.footer.hoursInfo.saturday}</li>
                <li>{currentContent.footer.hoursInfo.sunday}</li>
                <li>{currentContent.footer.hoursInfo.emergency}</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>{currentContent.footer.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
