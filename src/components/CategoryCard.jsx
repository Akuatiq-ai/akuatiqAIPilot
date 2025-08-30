import React from 'react'

const CategoryCard = ({ category }) => {
  return (
    <div className="group cursor-pointer">
      <div className={`${category.color} rounded-xl p-4 text-center transition-all duration-200 group-hover:scale-105 group-hover:shadow-md`}>
        <div className="text-3xl mb-2">{category.icon}</div>
        <h4 className="font-medium text-gray-900 text-sm">{category.name}</h4>
        <p className="text-xs text-gray-600 mt-1 hidden lg:block">{category.description}</p>
      </div>
    </div>
  )
}

export default CategoryCard
