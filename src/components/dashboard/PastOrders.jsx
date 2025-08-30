import React, { useState } from 'react'
import { TrendingUp, DollarSign, Package, Calendar, Filter, Download } from 'lucide-react'

const PastOrders = () => {
  const [timeRange, setTimeRange] = useState('month')
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Mock financial data
  const financialData = {
    totalRevenue: 45620.50,
    totalOrders: 342,
    averageOrderValue: 133.39,
    unitsSold: 456,
    monthlyData: [
      { month: 'Jan', revenue: 8200, orders: 62, units: 78 },
      { month: 'Feb', revenue: 9100, orders: 68, units: 85 },
      { month: 'Mar', revenue: 8700, orders: 65, units: 82 },
      { month: 'Apr', revenue: 9500, orders: 71, units: 89 },
      { month: 'May', revenue: 10200, orders: 76, units: 95 },
      { month: 'Jun', revenue: 8920, orders: 67, units: 84 }
    ]
  }

  // Mock completed orders
  const completedOrders = [
    {
      id: 101,
      customerName: 'Alex Thompson',
      items: [
        { name: 'Vintage Denim Jacket', price: 45.99, quantity: 1 },
        { name: 'Summer Dress', price: 28.99, quantity: 1 }
      ],
      totalAmount: 74.98,
      orderDate: '2024-01-10',
      completionDate: '2024-01-12',
      status: 'completed'
    },
    {
      id: 102,
      customerName: 'Maria Garcia',
      items: [
        { name: 'Levi\'s Blue Jeans', price: 24.99, quantity: 1 },
        { name: 'Ralph Lauren Shirt', price: 18.99, quantity: 1 },
        { name: 'Nike Running Shoes', price: 32.99, quantity: 1 }
      ],
      totalAmount: 76.97,
      orderDate: '2024-01-08',
      completionDate: '2024-01-11',
      status: 'completed'
    },
    {
      id: 103,
      customerName: 'David Kim',
      items: [
        { name: 'Fedora Hat', price: 15.99, quantity: 1 }
      ],
      totalAmount: 15.99,
      orderDate: '2024-01-05',
      completionDate: '2024-01-07',
      status: 'completed'
    }
  ]

  const clothingCategories = ['All', 'Shirt', 'Pants', 'Jacket', 'Dress', 'Shoes', 'Hat', 'Polo', 'Jacquard']

  const getTimeRangeLabel = (range) => {
    switch (range) {
      case 'week':
        return 'Last 7 Days'
      case 'month':
        return 'Last 30 Days'
      case 'quarter':
        return 'Last 3 Months'
      case 'year':
        return 'Last 12 Months'
      default:
        return 'Last 30 Days'
    }
  }

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Past Orders & Finances</h2>
          <p className="text-gray-600">Track your business performance and completed orders</p>
        </div>
        <button className="btn-secondary flex items-center space-x-2">
          <Download className="h-4 w-4" />
          <span>Export Report</span>
        </button>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Revenue</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(financialData.totalRevenue)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Package className="h-6 w-6 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Total Orders</p>
              <p className="text-2xl font-semibold text-gray-900">{financialData.totalOrders}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Avg Order Value</p>
              <p className="text-2xl font-semibold text-gray-900">{formatCurrency(financialData.averageOrderValue)}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="p-2 bg-orange-100 rounded-lg">
              <Package className="h-6 w-6 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-600">Units Sold</p>
              <p className="text-2xl font-semibold text-gray-900">{financialData.unitsSold}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Revenue Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Revenue</h3>
          <div className="space-y-3">
            {financialData.monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center space-x-3">
                <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-primary-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(data.revenue / Math.max(...financialData.monthlyData.map(d => d.revenue))) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-20 text-sm font-medium text-gray-900 text-right">
                  {formatCurrency(data.revenue)}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Orders Chart */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Monthly Orders</h3>
          <div className="space-y-3">
            {financialData.monthlyData.map((data, index) => (
              <div key={data.month} className="flex items-center space-x-3">
                <div className="w-12 text-sm font-medium text-gray-600">{data.month}</div>
                <div className="flex-1">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-green-600 h-2 rounded-full transition-all duration-300"
                      style={{ 
                        width: `${(data.orders / Math.max(...financialData.monthlyData.map(d => d.orders))) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
                <div className="w-20 text-sm font-medium text-gray-900 text-right">
                  {data.orders}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <Calendar className="h-5 w-5 text-gray-400" />
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="input-field max-w-xs"
          >
            <option value="week">Last 7 Days</option>
            <option value="month">Last 30 Days</option>
            <option value="quarter">Last 3 Months</option>
            <option value="year">Last 12 Months</option>
          </select>
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="input-field max-w-xs"
          >
            {clothingCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Completed Orders Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Completed Orders</h3>
          <p className="text-sm text-gray-600">Showing {getTimeRangeLabel(timeRange)}</p>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order ID
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Items
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Order Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Completion Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {completedOrders.map((order) => (
                <tr key={order.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    #{order.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {order.customerName}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    <div className="space-y-1">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span>{item.name}</span>
                          <span className="text-gray-400">x{item.quantity}</span>
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.orderDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(order.completionDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-primary-600">
                    {formatCurrency(order.totalAmount)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Summary */}
      <div className="mt-6 bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <p className="text-sm text-gray-600">Revenue Growth</p>
            <p className="text-2xl font-bold text-green-600">+12.5%</p>
            <p className="text-xs text-gray-500">vs last period</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Order Growth</p>
            <p className="text-2xl font-bold text-blue-600">+8.2%</p>
            <p className="text-xs text-gray-500">vs last period</p>
          </div>
          <div className="text-center">
            <p className="text-sm text-gray-600">Customer Retention</p>
            <p className="text-2xl font-bold text-purple-600">94.3%</p>
            <p className="text-xs text-gray-500">repeat customers</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PastOrders
