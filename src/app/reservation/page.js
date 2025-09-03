"use client";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentLanguage } from "../../store/slices/languageSlice";
import { 
  selectFormData, 
  selectFormErrors, 
  selectIsLoading,
  updateFormData, 
  clearFormData, 
  setFormErrors,
  addReservation 
} from "../../store/slices/reservationSlice";
import { reservationContent } from "../../data/reservationContent";
import Header from "../../components/Header";
import { useState } from "react";

export default function ReservationPage() {
  const dispatch = useDispatch();
  const language = useSelector(selectCurrentLanguage);
  const formData = useSelector(selectFormData);
  const formErrors = useSelector(selectFormErrors);
  const isLoading = useSelector(selectIsLoading);
  
  const content = reservationContent[language];
  const [showSuccess, setShowSuccess] = useState(false);
  const [referenceNumber, setReferenceNumber] = useState('');

  // Get today's date for minimum date
  const today = new Date().toISOString().split('T')[0];

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.patientName.trim()) {
      errors.patientName = content.validation.required;
    }
    
    if (!formData.contactNumber.trim()) {
      errors.contactNumber = content.validation.required;
    } else if (!validatePhone(formData.contactNumber)) {
      errors.contactNumber = content.validation.invalidPhone;
    }
    
    if (!formData.emailAddress.trim()) {
      errors.emailAddress = content.validation.required;
    } else if (!validateEmail(formData.emailAddress)) {
      errors.emailAddress = content.validation.invalidEmail;
    }
    
    if (!formData.reservationDate) {
      errors.reservationDate = content.validation.required;
    } else if (new Date(formData.reservationDate) <= new Date()) {
      errors.reservationDate = content.validation.futureDate;
    }
    
    if (!formData.reservationTime) {
      errors.reservationTime = content.validation.required;
    }
    
    if (!formData.serviceType) {
      errors.serviceType = content.validation.required;
    }
    
    return errors;
  };

  const handleInputChange = (field, value) => {
    dispatch(updateFormData({ field, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      dispatch(setFormErrors(errors));
      return;
    }
    
    // Generate reference number
    const refNumber = 'AD' + Date.now().toString().slice(-6);
    setReferenceNumber(refNumber);
    
    // Add reservation to Redux store
    dispatch(addReservation({
      ...formData,
      referenceNumber: refNumber
    }));
    
    // Show success message
    setShowSuccess(true);
    
    // Clear form after successful submission
    setTimeout(() => {
      dispatch(clearFormData());
      setShowSuccess(false);
    }, 5000);
  };

  const handleCancel = () => {
    dispatch(clearFormData());
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
        <Header />
        <div className="pt-20 min-h-screen flex items-center justify-center px-4">
          <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✅</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {content.success.title}
            </h2>
            <p className="text-gray-600 mb-6">
              {content.success.message}
            </p>
            <div className="bg-green-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">{content.success.referenceNumber}</p>
              <p className="text-lg font-bold text-green-600">{referenceNumber}</p>
            </div>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold transition-colors duration-300"
            >
              {language === 'en' ? 'Make Another Appointment' : '다른 예약하기'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-white">
      <Header />
      
      <div className="pt-20 min-h-screen py-8 px-4">
        <div className="max-w-lg mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {content.title}
            </h1>
            <p className="text-lg text-gray-600">
              {content.subtitle}
            </p>
          </div>

          {/* Reservation Form */}
          <div className="bg-white rounded-xl shadow-lg p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Patient Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {content.form.patientName}
                </label>
                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(e) => handleInputChange('patientName', e.target.value)}
                  placeholder={content.form.patientNamePlaceholder}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                    formErrors.patientName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.patientName && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.patientName}</p>
                )}
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {content.form.contactNumber}
                </label>
                <input
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) => handleInputChange('contactNumber', e.target.value)}
                  placeholder={content.form.contactNumberPlaceholder}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                    formErrors.contactNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.contactNumber && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.contactNumber}</p>
                )}
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {content.form.emailAddress}
                </label>
                <input
                  type="email"
                  value={formData.emailAddress}
                  onChange={(e) => handleInputChange('emailAddress', e.target.value)}
                  placeholder={content.form.emailAddressPlaceholder}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                    formErrors.emailAddress ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.emailAddress && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.emailAddress}</p>
                )}
              </div>

              {/* Service Type */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {content.form.serviceType}
                </label>
                <select
                  value={formData.serviceType}
                  onChange={(e) => handleInputChange('serviceType', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                    formErrors.serviceType ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">{content.form.serviceTypePlaceholder}</option>
                  <option value="general">{content.services.general}</option>
                  <option value="cosmetic">{content.services.cosmetic}</option>
                  <option value="orthodontics">{content.services.orthodontics}</option>
                  <option value="emergency">{content.services.emergency}</option>
                  <option value="pediatric">{content.services.pediatric}</option>
                  <option value="surgery">{content.services.surgery}</option>
                </select>
                {formErrors.serviceType && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.serviceType}</p>
                )}
              </div>

              {/* Reservation Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {content.form.reservationDate}
                </label>
                <input
                  type="date"
                  value={formData.reservationDate}
                  onChange={(e) => handleInputChange('reservationDate', e.target.value)}
                  min={today}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                    formErrors.reservationDate ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {formErrors.reservationDate && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.reservationDate}</p>
                )}
              </div>

              {/* Reservation Time */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {content.form.reservationTime}
                </label>
                <select
                  value={formData.reservationTime}
                  onChange={(e) => handleInputChange('reservationTime', e.target.value)}
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300 ${
                    formErrors.reservationTime ? 'border-red-500' : 'border-gray-300'
                  }`}
                >
                  <option value="">{language === 'en' ? 'Select time' : '시간 선택'}</option>
                  {Object.entries(content.timeSlots).map(([value, label]) => (
                    <option key={value} value={value}>{label}</option>
                  ))}
                </select>
                {formErrors.reservationTime && (
                  <p className="text-red-500 text-xs mt-1">{formErrors.reservationTime}</p>
                )}
              </div>

              {/* Additional Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  {content.form.message}
                </label>
                <textarea
                  value={formData.message}
                  onChange={(e) => handleInputChange('message', e.target.value)}
                  placeholder={content.form.messagePlaceholder}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-300"
                />
              </div>

              {/* Form Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-md font-medium transition-colors duration-300"
                >
                  {isLoading ? (language === 'en' ? 'Booking...' : '예약 중...') : content.form.submitButton}
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 py-2 px-4 rounded-md font-medium transition-colors duration-300"
                >
                  {content.form.cancelButton}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
