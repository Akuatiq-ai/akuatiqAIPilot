import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, MapPin, User, ShoppingBag, Menu, LogIn } from 'lucide-react'

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-primary-600">Akuatiq</h1>
              <span className="ml-2 text-sm text-gray-500">Thrift Discovery</span>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-2xl mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search for clothing, stores, or brands..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
              <MapPin className="h-5 w-5" />
              <span className="hidden sm:block">Deliver to</span>
              <span className="font-medium">Home</span>
            </button>
            
            <button className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
              <ShoppingBag className="h-5 w-5" />
              <span className="hidden sm:block">Orders</span>
            </button>
            
            <Link to="/login" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors">
              <LogIn className="h-5 w-5" />
              <span className="hidden sm:block">Login</span>
            </Link>
            
            <button className="lg:hidden">
              <Menu className="h-6 w-6 text-gray-700" />
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
