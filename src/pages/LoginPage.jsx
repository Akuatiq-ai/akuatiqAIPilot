import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { User, Building2, Mail, Lock, Phone, MapPin, Clock, Store, Package, AlertCircle } from 'lucide-react'

const LoginPage = () => {
  const [userType, setUserType] = useState('customer')
  const [isLogin, setIsLogin] = useState(true)
  const navigate = useNavigate()

  const [customerForm, setCustomerForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: ''
  })

  const [businessForm, setBusinessForm] = useState({
    businessName: '',
    storeCount: '',
    itemsPerYear: '',
    email: '',
    password: '',
    confirmPassword: '',
    address: '',
    phone: '',
    hours: ''
  })

  const [errors, setErrors] = useState({})

  const handleCustomerChange = (e) => {
    setCustomerForm({
      ...customerForm,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }

  const handleBusinessChange = (e) => {
    setBusinessForm({
      ...businessForm,
      [e.target.name]: e.target.value
    })
    // Clear error when user starts typing
    if (errors[e.target.name]) {
      setErrors({
        ...errors,
        [e.target.name]: ''
      })
    }
  }

  const validateCustomerForm = () => {
    const newErrors = {}
    
    if (!isLogin) {
      if (customerForm.password !== customerForm.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
      if (customerForm.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters long'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateBusinessForm = () => {
    const newErrors = {}
    
    if (!isLogin) {
      if (businessForm.password !== businessForm.confirmPassword) {
        newErrors.confirmPassword = 'Passwords do not match'
      }
      if (businessForm.password.length < 6) {
        newErrors.password = 'Password must be at least 6 characters long'
      }
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleCustomerSubmit = (e) => {
    e.preventDefault()
    if (!isLogin && !validateCustomerForm()) {
      return
    }
    console.log('Customer form submitted:', customerForm)
    // Here you would typically handle authentication
    // For now, just show success message
    alert('Customer login successful!')
  }

  const handleBusinessSubmit = (e) => {
    e.preventDefault()
    if (!isLogin && !validateBusinessForm()) {
      return
    }
    console.log('Business form submitted:', businessForm)
    // Here you would typically handle authentication
    // For demo purposes, redirect to dashboard
    alert('Business login successful! Redirecting to dashboard...')
    navigate('/dashboard')
  }

  const resetForms = () => {
    setCustomerForm({
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      phone: ''
    })
    setBusinessForm({
      businessName: '',
      storeCount: '',
      itemsPerYear: '',
      email: '',
      password: '',
      confirmPassword: '',
      address: '',
      phone: '',
      hours: ''
    })
    setErrors({})
  }

  const handleToggleMode = () => {
    setIsLogin(!isLogin)
    resetForms()
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-primary-600">Akuatiq</h1>
          <h2 className="mt-6 text-3xl font-bold text-gray-900">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={handleToggleMode}
              className="font-medium text-primary-600 hover:text-primary-500"
            >
              {isLogin ? 'Sign up' : 'Sign in'}
            </button>
          </p>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {/* User Type Toggle */}
          <div className="flex rounded-lg bg-gray-100 p-1 mb-6">
            <button
              onClick={() => setUserType('customer')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === 'customer'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <User className="inline-block w-4 h-4 mr-2" />
              Customer
            </button>
            <button
              onClick={() => setUserType('business')}
              className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                userType === 'business'
                  ? 'bg-white text-gray-900 shadow-sm'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Building2 className="inline-block w-4 h-4 mr-2" />
              Business
            </button>
          </div>

          {/* Customer Form */}
          {userType === 'customer' && (
            <form onSubmit={handleCustomerSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name
                </label>
                <div className="mt-1 relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={customerForm.name}
                    onChange={handleCustomerChange}
                    className="input-field pl-10"
                    placeholder="Enter your full name"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address
                </label>
                <div className="mt-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={customerForm.email}
                    onChange={handleCustomerChange}
                    className="input-field pl-10"
                    placeholder="Enter your email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={customerForm.password}
                    onChange={handleCustomerChange}
                    className={`input-field pl-10 ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && (
                  <div className="flex items-center mt-1 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.password}
                  </div>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={customerForm.confirmPassword}
                      onChange={handleCustomerChange}
                      className={`input-field pl-10 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Confirm your password"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <div className="flex items-center mt-1 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <div className="mt-1 relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={customerForm.phone}
                    onChange={handleCustomerChange}
                    className="input-field pl-10"
                    placeholder="Enter your phone number"
                  />
                </div>
              </div>

              <div>
                <button type="submit" className="btn-primary w-full">
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </button>
              </div>
            </form>
          )}

          {/* Business Form */}
          {userType === 'business' && (
            <form onSubmit={handleBusinessSubmit} className="space-y-6">
              <div>
                <label htmlFor="businessName" className="block text-sm font-medium text-gray-700">
                  Business Name
                </label>
                <div className="mt-1 relative">
                  <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="businessName"
                    name="businessName"
                    type="text"
                    required
                    value={businessForm.businessName}
                    onChange={handleBusinessChange}
                    className="input-field pl-10"
                    placeholder="Enter your business name"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="storeCount" className="block text-sm font-medium text-gray-700">
                    Number of Stores
                  </label>
                  <div className="mt-1 relative">
                    <Store className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="storeCount"
                      name="storeCount"
                      type="number"
                      min="1"
                      required
                      value={businessForm.storeCount}
                      onChange={handleBusinessChange}
                      className="input-field pl-10"
                      placeholder="1"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="itemsPerYear" className="block text-sm font-medium text-gray-700">
                    Items Sold/Year
                  </label>
                  <div className="mt-1 relative">
                    <Package className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="itemsPerYear"
                      name="itemsPerYear"
                      type="number"
                      min="1"
                      required
                      value={businessForm.itemsPerYear}
                      onChange={handleBusinessChange}
                      className="input-field pl-10"
                      placeholder="1000"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Business Email
                </label>
                <div className="mt-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={businessForm.email}
                    onChange={handleBusinessChange}
                    className="input-field pl-10"
                    placeholder="Enter your business email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="mt-1 relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={businessForm.password}
                    onChange={handleBusinessChange}
                    className={`input-field pl-10 ${errors.password ? 'border-red-500 focus:ring-red-500' : ''}`}
                    placeholder="Enter your password"
                  />
                </div>
                {errors.password && (
                  <div className="flex items-center mt-1 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4 mr-1" />
                    {errors.password}
                  </div>
                )}
              </div>

              {!isLogin && (
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <div className="mt-1 relative">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required
                      value={businessForm.confirmPassword}
                      onChange={handleBusinessChange}
                      className={`input-field pl-10 ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : ''}`}
                      placeholder="Confirm your password"
                    />
                  </div>
                  {errors.confirmPassword && (
                    <div className="flex items-center mt-1 text-sm text-red-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
              )}

              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Business Address
                </label>
                <div className="mt-1 relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="address"
                    name="address"
                    type="text"
                    required
                    value={businessForm.address}
                    onChange={handleBusinessChange}
                    className="input-field pl-10"
                    placeholder="Enter your business address"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Business Phone
                </label>
                <div className="mt-1 relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    value={businessForm.phone}
                    onChange={handleBusinessChange}
                    className="input-field pl-10"
                    placeholder="Enter your business phone"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="hours" className="block text-sm font-medium text-gray-700">
                  Hours of Operation
                </label>
                <div className="mt-1 relative">
                  <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                  <input
                    id="hours"
                    name="hours"
                    type="text"
                    required
                    value={businessForm.hours}
                    onChange={handleBusinessChange}
                    className="input-field pl-10"
                    placeholder="e.g., Mon-Fri 9AM-6PM, Sat 10AM-4PM"
                  />
                </div>
              </div>

              <div>
                <button type="submit" className="btn-primary w-full">
                  {isLogin ? 'Sign In' : 'Sign Up'}
                </button>
              </div>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link to="/" className="text-sm text-primary-600 hover:text-primary-500">
              ← Back to Home
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
