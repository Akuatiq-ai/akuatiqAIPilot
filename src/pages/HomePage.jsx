import React from 'react'
import { clothingCategories, thriftStores } from '../data/mockData'
import CategoryCard from '../components/CategoryCard'
import StoreCard from '../components/StoreCard'
import { Star, Clock, Truck } from 'lucide-react'

const HomePage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold text-gray-900 mb-4">
          Discover Amazing Thrift Finds
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Shop unique clothing from local thrift stores. Sustainable fashion delivered to your door.
        </p>
      </div>

      {/* Clothing Categories */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Shop by Category</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {clothingCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* Featured Stores */}
      <section className="mb-12">
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">Featured Stores</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {thriftStores.filter(store => store.featured).map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </section>

      {/* All Stores */}
      <section>
        <h3 className="text-2xl font-semibold text-gray-900 mb-6">All Local Stores</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {thriftStores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="mt-16 bg-white rounded-xl p-8 shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div>
            <div className="flex justify-center mb-3">
              <Star className="h-8 w-8 text-accent-500" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">4.7+ Rating</h4>
            <p className="text-gray-600">Average store rating from our community</p>
          </div>
          <div>
            <div className="flex justify-center mb-3">
              <Clock className="h-8 w-8 text-primary-500" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Fast Delivery</h4>
            <p className="text-gray-600">Most orders delivered within 30 minutes</p>
          </div>
          <div>
            <div className="flex justify-center mb-3">
              <Truck className="h-8 w-8 text-secondary-500" />
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Local Stores</h4>
            <p className="text-gray-600">Supporting your local thrift community</p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default HomePage
