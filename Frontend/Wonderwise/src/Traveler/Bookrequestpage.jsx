import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, DollarSign, Phone, Mail, User, Clock, CheckCircle, AlertCircle, Send, Star, Plane } from 'lucide-react';

const BookRequestPage = () => {
  const [formData, setFormData] = useState({
    phone: '',
    email: ''
  });
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [otp, setOtp] = useState('');
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otpType, setOtpType] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);

  // Floating animation keyframes
  const floatingAnimation = `
    @keyframes float {
      0%, 100% { transform: translateY(0px) rotate(0deg); }
      33% { transform: translateY(-20px) rotate(2deg); }
      66% { transform: translateY(-10px) rotate(-1deg); }
    }
    @keyframes pulse {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.8; }
    }
    @keyframes slideIn {
      from { transform: translateX(-100px); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
  `;

  // Sample data for pre-filled trip information
  const tripInfo = {
    tripPlan: 'Romantic Getaway Package',
    destination: 'Bali, Indonesia',
    duration: '7 days, 6 nights',
    budget: '$2,500',
    date: '2025-08-15',
    inclusions: ['Flight tickets', 'Hotel accommodation', 'Meals', 'Local transport', 'Guided tours']
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 2) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleVerification = (type) => {
    setOtpType(type);
    setShowOtpModal(true);
    // Simulate OTP sending
    setTimeout(() => {
      console.log(`OTP sent to ${type}`);
    }, 1000);
  };

  const handleOtpVerification = () => {
    if (otp.length === 6) {
      if (otpType === 'phone') {
        setPhoneVerified(true);
      } else {
        setEmailVerified(true);
      }
      setShowOtpModal(false);
      setOtp('');
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowSuccess(true);
    }, 2000);
  };

  const canProceedToNextStep = () => {
    return phoneVerified && emailVerified && formData.phone && formData.email;
  };

  const canSubmit = () => {
    return phoneVerified && emailVerified && termsAccepted;
  };

  const steps = [
    { number: 1, title: 'Contact Info', icon: User },
    { number: 2, title: 'Review & Submit', icon: CheckCircle }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 relative overflow-hidden">
      <style>{floatingAnimation}</style>
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full" style={{animation: 'float 6s ease-in-out infinite'}}></div>
        <div className="absolute top-32 right-20 w-16 h-16 bg-pink-300 bg-opacity-20 rounded-full" style={{animation: 'float 8s ease-in-out infinite 2s'}}></div>
        <div className="absolute bottom-20 left-20 w-24 h-24 bg-blue-300 bg-opacity-15 rounded-full" style={{animation: 'float 7s ease-in-out infinite 1s'}}></div>
        <div className="absolute top-1/2 right-10 w-12 h-12 bg-yellow-300 bg-opacity-20 transform rotate-45" style={{animation: 'float 5s ease-in-out infinite 3s'}}></div>
      </div>

      {/* Header */}
      <div className="relative z-10 pt-8 pb-4">
        <div className="container mx-auto px-6">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center mb-4">
              <Plane className="w-8 h-8 text-white mr-3" />
              <h1 className="text-4xl font-bold text-white">Book Your Dream Trip</h1>
            </div>
            <p className="text-purple-200 text-lg">Create unforgettable memories with our curated travel experiences</p>
          </div>

          {/* Progress Steps */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                const isActive = currentStep >= step.number;
                const isCompleted = currentStep > step.number;
                
                return (
                  <div key={step.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300 
                      ${isCompleted ? 'bg-green-500 border-green-500' : 
                        isActive ? 'bg-purple-600 border-purple-400' : 'bg-transparent border-purple-400'}`}>
                      {isCompleted ? (
                        <CheckCircle className="w-6 h-6 text-white" />
                      ) : (
                        <Icon className={`w-6 h-6 ${isActive ? 'text-white' : 'text-purple-400'}`} />
                      )}
                    </div>
                    <span className={`ml-2 text-sm ${isActive ? 'text-white' : 'text-purple-400'}`}>
                      {step.title}
                    </span>
                    {index < steps.length - 1 && (
                      <div className={`w-16 h-0.5 mx-4 ${isCompleted ? 'bg-green-500' : 'bg-purple-600'}`}></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white border-opacity-20">
            
            {/* Step 1: Contact Information */}
            {currentStep === 1 && (
              <div className="space-y-8" style={{animation: 'slideIn 0.5s ease-out'}}>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <User className="w-6 h-6 mr-3" />
                  Contact Information
                </h2>

                {/* Trip Summary Card */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 bg-opacity-20 rounded-xl p-6 border border-white border-opacity-20">
                  <h3 className="text-white font-semibold mb-4 flex items-center">
                    <Plane className="w-5 h-5 mr-2" />
                    Your Selected Trip
                  </h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex items-center text-purple-200">
                        <MapPin className="w-4 h-4 mr-2" />
                        <span className="text-white font-medium">{tripInfo.destination}</span>
                      </div>
                      <div className="flex items-center text-purple-200">
                        <Clock className="w-4 h-4 mr-2" />
                        <span>{tripInfo.duration}</span>
                      </div>
                      <div className="flex items-center text-purple-200">
                        <DollarSign className="w-4 h-4 mr-2" />
                        <span className="text-white font-medium">{tripInfo.budget}</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center text-purple-200">
                        <Calendar className="w-4 h-4 mr-2" />
                        <span>{tripInfo.date}</span>
                      </div>
                      <div className="text-purple-200 text-sm">
                        <p className="font-medium text-white mb-1">Package Includes:</p>
                        <p>{tripInfo.inclusions.join(' • ')}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Phone */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Phone Number</label>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <button
                        onClick={() => handleVerification('phone')}
                        disabled={!formData.phone}
                        className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:transform hover:scale-105 
                          ${phoneVerified 
                            ? 'bg-green-500 text-white' 
                            : formData.phone 
                              ? 'bg-purple-600 text-white hover:bg-purple-700' 
                              : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                      >
                        {phoneVerified ? <CheckCircle className="w-5 h-5" /> : 'Verify'}
                      </button>
                    </div>
                    {phoneVerified && (
                      <p className="text-green-400 text-sm mt-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Phone number verified successfully
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-white text-sm font-medium mb-2">Email Address</label>
                    <div className="flex space-x-2">
                      <div className="relative flex-1">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-400 w-5 h-5" />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full pl-10 pr-4 py-3 bg-white bg-opacity-20 border border-white border-opacity-30 rounded-xl text-white placeholder-purple-200 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent"
                          placeholder="your@email.com"
                        />
                      </div>
                      <button
                        onClick={() => handleVerification('email')}
                        disabled={!formData.email}
                        className={`px-4 py-3 rounded-xl font-medium transition-all duration-300 hover:transform hover:scale-105 
                          ${emailVerified 
                            ? 'bg-green-500 text-white' 
                            : formData.email 
                              ? 'bg-purple-600 text-white hover:bg-purple-700' 
                              : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                      >
                        {emailVerified ? <CheckCircle className="w-5 h-5" /> : 'Verify'}
                      </button>
                    </div>
                    {emailVerified && (
                      <p className="text-green-400 text-sm mt-2 flex items-center">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Email address verified successfully
                      </p>
                    )}
                  </div>
                </div>

                {/* Verification Status */}
                <div className="bg-white bg-opacity-10 rounded-xl p-4">
                  <h3 className="text-white font-medium mb-3 flex items-center">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    Verification Required
                  </h3>
                  <p className="text-purple-200 text-sm mb-3">
                    Please verify both your phone number and email address to proceed with your booking request.
                  </p>
                  <div className="flex space-x-6">
                    <div className="flex items-center">
                      {phoneVerified ? (
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
                      )}
                      <span className="text-purple-200">Phone {phoneVerified ? 'Verified' : 'Pending'}</span>
                    </div>
                    <div className="flex items-center">
                      {emailVerified ? (
                        <CheckCircle className="w-5 h-5 text-green-400 mr-2" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-400 mr-2" />
                      )}
                      <span className="text-purple-200">Email {emailVerified ? 'Verified' : 'Pending'}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Review & Submit */}
            {currentStep === 2 && (
              <div className="space-y-8" style={{animation: 'slideIn 0.5s ease-out'}}>
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center">
                  <CheckCircle className="w-6 h-6 mr-3" />
                  Review Your Booking
                </h2>

                {/* Trip Summary */}
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 bg-opacity-20 rounded-xl p-6 border border-white border-opacity-20">
                  <h3 className="text-white font-semibold mb-4 flex items-center">
                    <Plane className="w-5 h-5 mr-2" />
                    Trip Summary
                  </h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-200">Package:</span>
                        <span className="text-white font-medium">{tripInfo.tripPlan}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-200">Destination:</span>
                        <span className="text-white font-medium">{tripInfo.destination}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-200">Duration:</span>
                        <span className="text-white">{tripInfo.duration}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-200">Total Budget:</span>
                        <span className="text-white font-bold text-xl">{tripInfo.budget}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-purple-200">Travel Date:</span>
                        <span className="text-white">{tripInfo.date}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white border-opacity-20">
                    <h4 className="text-white font-medium mb-2">Package Includes:</h4>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {tripInfo.inclusions.map((item, index) => (
                        <div key={index} className="flex items-center text-purple-200 text-sm">
                          <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Contact Information Review */}
                <div className="bg-white bg-opacity-10 rounded-xl p-6 space-y-4">
                  <h3 className="text-white font-semibold mb-4 flex items-center">
                    <User className="w-5 h-5 mr-2" />
                    Contact Information
                  </h3>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-200">Phone Number:</span>
                        <div className="flex items-center">
                          <span className="text-white mr-2">{formData.phone || 'Not provided'}</span>
                          {phoneVerified ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <span className="text-purple-200">Email Address:</span>
                        <div className="flex items-center">
                          <span className="text-white mr-2">{formData.email || 'Not provided'}</span>
                          {emailVerified ? (
                            <CheckCircle className="w-4 h-4 text-green-400" />
                          ) : (
                            <AlertCircle className="w-4 h-4 text-yellow-400" />
                          )}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-white bg-opacity-10 rounded-lg p-4">
                      <h4 className="text-white font-medium mb-2">Verification Status</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-purple-200 text-sm">Phone Verification:</span>
                          <span className={`px-2 py-1 rounded text-xs ${phoneVerified ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                            {phoneVerified ? 'Verified' : 'Pending'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-purple-200 text-sm">Email Verification:</span>
                          <span className={`px-2 py-1 rounded text-xs ${emailVerified ? 'bg-green-500 text-white' : 'bg-yellow-500 text-white'}`}>
                            {emailVerified ? 'Verified' : 'Pending'}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Important Notes */}
                <div className="bg-yellow-500 bg-opacity-20 border border-yellow-400 border-opacity-30 rounded-xl p-4">
                  <div className="flex items-start">
                    <AlertCircle className="w-5 h-5 text-yellow-400 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="text-white font-medium mb-2">Important Notes</h4>
                      <ul className="text-purple-200 text-sm space-y-1">
                        <li>• Both phone and email verification are required to submit your request</li>
                        <li>• You will receive a confirmation email once your request is submitted</li>
                        <li>• Our team will contact you within 24-48 hours for further assistance</li>
                        <li>• Booking confirmation is subject to availability and payment</li>
                      </ul>
                    </div>
                  </div>
                </div>

                {/* Terms and Conditions */}
                <div className="bg-white bg-opacity-5 rounded-xl p-4">
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      id="terms"
                      checked={termsAccepted}
                      onChange={(e) => setTermsAccepted(e.target.checked)}
                      className="mt-1 mr-3 w-4 h-4 text-purple-600 bg-white bg-opacity-20 border-white border-opacity-30 rounded focus:ring-purple-500"
                    />
                    <label htmlFor="terms" className="text-purple-200 text-sm">
                      I agree to the <span className="text-white underline cursor-pointer">Terms and Conditions</span> and 
                      <span className="text-white underline cursor-pointer"> Privacy Policy</span>. 
                      I understand that this is a booking request and final confirmation will be provided separately.
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-8">
              <button
                onClick={handlePrevStep}
                disabled={currentStep === 1}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 
                  ${currentStep === 1 
                    ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30 hover:transform hover:scale-105'}`}
              >
                Previous
              </button>

              {currentStep < 2 ? (
                <button
                  onClick={handleNextStep}
                  disabled={!canProceedToNextStep()}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 hover:transform hover:scale-105 
                    ${canProceedToNextStep() 
                      ? 'bg-purple-600 text-white hover:bg-purple-700' 
                      : 'bg-gray-600 text-gray-400 cursor-not-allowed'}`}
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !canSubmit()}
                  className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 flex items-center space-x-2 
                    ${isSubmitting || !canSubmit()
                      ? 'bg-gray-600 text-gray-400 cursor-not-allowed' 
                      : 'bg-green-600 text-white hover:bg-green-700 hover:transform hover:scale-105'}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Submitting...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Request</span>
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 transform transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              Verify {otpType === 'phone' ? 'Phone Number' : 'Email Address'}
            </h3>
            <p className="text-gray-600 mb-6">
              Enter the 6-digit code sent to your {otpType}
            </p>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl text-center text-2xl tracking-widest mb-6 focus:outline-none focus:ring-2 focus:ring-purple-500"
              placeholder="000000"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => setShowOtpModal(false)}
                className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-xl font-medium hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleOtpVerification}
                disabled={otp.length !== 6}
                className="flex-1 px-4 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                Verify
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center transform transition-all duration-300">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Booking Request Submitted!</h3>
            <p className="text-gray-600 mb-6">
              Your request has been submitted successfully. We'll contact you soon with further details.
            </p>
            <button
              onClick={() => setShowSuccess(false)}
              className="w-full px-4 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-700 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookRequestPage;