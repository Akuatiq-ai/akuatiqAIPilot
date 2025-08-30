import React, { useState } from 'react'
import { Clock, MapPin, Phone, Mail, Package, Calendar, CheckCircle, XCircle } from 'lucide-react'

const CurrentOrders = () => {
  const [selectedStatus, setSelectedStatus] = useState('all')

  // Mock current orders data
  const currentOrders = [
    {
      id: 1,
      customerName: 'Sarah Johnson',
      customerEmail: 'sarah.j@email.com',
      customerPhone: '(555) 123-4567',
      items: [
        { name: 'Levi\'s Blue Jeans', price: 24.99, quantity: 1 },
        { name: 'Ralph Lauren Shirt', price: 18.99, quantity: 1 }
      ],
      totalAmount: 43.98,
      orderDate: '2024-01-15',
      pickupDate: '2024-01-17',
      pickupTime: '2:00 PM - 4:00 PM',
      status: 'pending',
      address: '123 Main St, Downtown, CA 90210'
    },
    {
      id: 2,
      customerName: 'Mike Chen',
      customerEmail: 'mike.chen@email.com',
      customerPhone: '(555) 987-6543',
      items: [
        { name: 'Nike Running Shoes', price: 32.99, quantity: 1 }
      ],
      totalAmount: 32.99,
      orderDate: '2024-01-14',
      pickupDate: '2024-01-16',
      pickupTime: '10:00 AM - 12:00 PM',
      status: 'confirmed',
      address: '456 Oak Ave, Westside, CA 90211'
    },
    {
      id: 3,
      customerName: 'Emily Rodriguez',
      customerEmail: 'emily.r@email.com',
      customerPhone: '(555) 456-7890',
      items: [
        { name: 'Vintage Denim Jacket', price: 45.99, quantity: 1 },
        { name: 'Summer Dress', price: 28.99, quantity: 1 },
        { name: 'Fedora Hat', price: 15.99, quantity: 1 }
      ],
      totalAmount: 90.97,
      orderDate: '2024-01-13',
      pickupDate: '2024-01-15',
      pickupTime: '3:00 PM - 5:00 PM',
      status: 'ready',
      address: '789 Pine St, Eastside, CA 90212'
    }
  ]

  const statuses = [
    { value: 'all', label: 'All Orders', color: 'bg-gray-100 text-gray-800' },
    { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
    { value: 'confirmed', label: 'Confirmed', color: 'bg-blue-100 text-blue-800' },
    { value: 'ready', label: 'Ready for Pickup', color: 'bg-green-100 text-green-800' }
  ]

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'confirmed':
        return 'bg-blue-100 text-blue-800'
      case 'ready':
        return 'bg-green-100 text-green-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'pending':
        return 'Pending'
      case 'confirmed':
        return 'Confirmed'
      case 'ready':
        return 'Ready for Pickup'
      default:
        return 'Unknown'
    }
  }

  const filteredOrders = selectedStatus === 'all' 
    ? currentOrders 
    : currentOrders.filter(order => order.status === selectedStatus)

  const handleStatusUpdate = (orderId, newStatus) => {
    console.log(`Updating order ${orderId} to status: ${newStatus}`)
    // Here you would typically update the order status in your backend
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Current Orders</h2>
          <p className="text-gray-600">Manage active orders and pickups</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-600">Total Active Orders</p>
          <p className="text-2xl font-bold text-primary-600">{currentOrders.length}</p>
        </div>
      </div>

      {/* Status Filter */}
      <div className="flex flex-wrap gap-2 mb-6">
        {statuses.map((status) => (
          <button
            key={status.value}
            onClick={() => setSelectedStatus(status.value)}
            className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
              selectedStatus === status.value
                ? 'bg-primary-100 text-primary-800 border-2 border-primary-300'
                : status.color + ' hover:opacity-80'
            }`}
          >
            {status.label}
          </button>
        ))}
      </div>

      {/* Orders List */}
      <div className="space-y-6">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
            {/* Order Header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Order #{order.id}</h3>
                <p className="text-sm text-gray-500">
                  Placed on {new Date(order.orderDate).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <span className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${getStatusColor(order.status)}`}>
                  {getStatusLabel(order.status)}
                </span>
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleStatusUpdate(order.id, 'confirmed')}
                    className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition-colors"
                    title="Mark as Confirmed"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleStatusUpdate(order.id, 'ready')}
                    className="p-2 text-green-600 hover:text-green-800 hover:bg-green-50 rounded-lg transition-colors"
                    title="Mark as Ready"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Customer Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">Customer Details</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{order.customerName}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{order.customerEmail}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{order.customerPhone}</span>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-2">Pickup Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">
                      {new Date(order.pickupDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{order.pickupTime}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-gray-600">{order.address}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="mb-4">
              <h4 className="font-medium text-gray-900 mb-2">Items Ordered</h4>
              <div className="bg-gray-50 rounded-lg p-4">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-2">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-gray-900">{item.name}</span>
                      <span className="text-sm text-gray-500">x{item.quantity}</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">${item.price}</span>
                  </div>
                ))}
                <div className="border-t border-gray-200 pt-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Total</span>
                    <span className="font-bold text-lg text-primary-600">${order.totalAmount}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3">
              <button className="btn-primary">
                Contact Customer
              </button>
              <button className="btn-secondary">
                View Details
              </button>
              <button className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition-colors">
                Cancel Order
              </button>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="text-center py-12">
            <Package className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">No orders found</h3>
            <p className="mt-1 text-sm text-gray-500">
              {selectedStatus === 'all' 
                ? 'No active orders at the moment.' 
                : `No orders with status "${selectedStatus}".`
              }
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default CurrentOrders
