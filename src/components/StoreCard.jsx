import React from 'react'
import { Link } from 'react-router-dom'
import { Star, Clock, Truck, MapPin } from 'lucide-react'

const StoreCard = ({ store }) => {
  return (
    <Link to={`/store/${store.id}`} className="block">
      <div className="card overflow-hidden hover:shadow-lg transition-all duration-200">
        {/* Store Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={store.image}
            alt={store.name}
            className="w-full h-full object-cover transition-transform duration-200 hover:scale-105"
          />
          {store.featured && (
            <div className="absolute top-3 left-3 bg-accent-500 text-white text-xs font-medium px-2 py-1 rounded-full">
              Featured
            </div>
          )}
        </div>

        {/* Store Info */}
        <div className="p-4">
          <div className="flex items-start justify-between mb-2">
            <h3 className="font-semibold text-gray-900 text-lg">{store.name}</h3>
            <div className="flex items-center space-x-1">
              <Star className="h-4 w-4 text-accent-500 fill-current" />
              <span className="text-sm font-medium">{store.rating}</span>
              <span className="text-xs text-gray-500">({store.reviewCount})</span>
            </div>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-1 mb-3">
            {store.categories.slice(0, 3).map((category, index) => (
              <span
                key={index}
                className="text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded-full"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Delivery Info */}
          <div className="space-y-2 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>{store.deliveryTime}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Truck className="h-4 w-4" />
              <span>{store.deliveryFee} delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>{store.distance}</span>
            </div>
          </div>

          {/* Min Order */}
          <div className="mt-3 pt-3 border-t border-gray-100">
            <span className="text-sm text-gray-600">
              Min order: <span className="font-medium">{store.minOrder}</span>
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default StoreCard
