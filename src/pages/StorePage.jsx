import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { thriftStores, storeProducts } from '../data/mockData'
import { Star, Clock, Truck, MapPin, ArrowLeft, Heart, Share2 } from 'lucide-react'
import ProductCard from '../components/ProductCard'

const StorePage = () => {
  const { id } = useParams()
  const [store, setStore] = useState(null)
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')

  useEffect(() => {
    const foundStore = thriftStores.find(s => s.id === parseInt(id))
    setStore(foundStore)
    
    if (foundStore) {
      const storeProds = storeProducts[foundStore.id] || []
      setProducts(storeProds)
    }
  }, [id])

  if (!store) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Store not found</h2>
          <Link to="/" className="text-primary-600 hover:text-primary-700 mt-4 inline-block">
            ← Back to Home
          </Link>
        </div>
      </div>
    )
  }

  const categories = ['All', ...store.categories]
  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(product => product.category === selectedCategory)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Stores
      </Link>

      {/* Store Header */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col lg:flex-row lg:items-start gap-6">
          {/* Store Image */}
          <div className="relative">
            <img
              src={store.image}
              alt={store.name}
              className="w-full lg:w-80 h-48 lg:h-64 object-cover rounded-lg"
            />
            {store.featured && (
              <div className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-medium px-2 py-1 rounded-full">
                Featured
              </div>
            )}
          </div>

          {/* Store Info */}
          <div className="flex-1">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{store.name}</h1>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="flex items-center space-x-1">
                    <Star className="h-5 w-5 text-accent-500 fill-current" />
                    <span className="font-medium">{store.rating}</span>
                    <span className="text-gray-500">({store.reviewCount} reviews)</span>
                  </div>
                  <span className="text-gray-500">•</span>
                  <span className="text-gray-600">{store.distance}</span>
                </div>
              </div>
              <div className="flex space-x-2">
                <button className="p-2 text-gray-600 hover:text-red-500 transition-colors">
                  <Heart className="h-5 w-5" />
                </button>
                <button className="p-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <Share2 className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
              {store.categories.map((category, index) => (
                <span
                  key={index}
                  className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>

            {/* Delivery Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary-600" />
                <div>
                  <p className="text-sm text-gray-600">Delivery Time</p>
                  <p className="font-medium">{store.deliveryTime}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-secondary-600" />
                <div>
                  <p className="text-sm text-gray-600">Delivery Fee</p>
                  <p className="font-medium">{store.deliveryFee}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-5 w-5 text-accent-600" />
                <div>
                  <p className="text-sm text-gray-600">Min Order</p>
                  <p className="font-medium">{store.minOrder}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6">
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Products */}
      <div>
        <h2 className="text-2xl font-semibold text-gray-900 mb-6">
          {selectedCategory === 'All' ? 'All Products' : selectedCategory}
        </h2>
        
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found in this category.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default StorePage
