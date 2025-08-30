# Akuatiq - Local Thrift Store Discovery App

> **Note**: This is the Pilot Version of Akuatiq AI

A modern, DoorDash-style frontend application that allows users to discover and shop from local thrift stores. Built with React, Tailwind CSS, and modern web technologies.

## Features

- **Clothing Categories**: Browse by shirts, jackets, polos, jacquards, hats, pants, dresses, and shoes
- **Store Discovery**: Find local thrift stores with ratings, delivery times, and categories
- **Product Browsing**: View individual store inventories with detailed product information
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, intuitive interface inspired by popular delivery apps
- **Business Dashboard**: Complete inventory management system for store owners
- **Authentication**: Separate login systems for customers and businesses
- **Database Models**: Full backend with SQL schema and Sequelize ORM

## Tech Stack

- **Frontend**: React 18 with Hooks
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm
- **Backend**: SQL, Sequelize ORM, Node.js
- **Database**: MySQL/PostgreSQL with migrations

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Akuatiq-ai/akuatiqAIPilot.git
cd akuatiqAIPilot
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── CategoryCard.jsx
│   ├── Header.jsx
│   ├── ProductCard.jsx
│   ├── StoreCard.jsx
│   └── dashboard/      # Business dashboard components
│       ├── InventoryManagement.jsx
│       ├── CurrentOrders.jsx
│       └── PastOrders.jsx
├── pages/              # Page components
│   ├── HomePage.jsx
│   ├── StorePage.jsx
│   ├── LoginPage.jsx
│   └── BusinessDashboard.jsx
├── data/               # Mock data and constants
│   └── mockData.js
├── App.jsx             # Main app component
├── main.jsx            # React entry point
└── index.css           # Global styles

backend/
├── models/             # Sequelize ORM models
│   ├── Store.js
│   ├── ClothingArticle.js
│   └── ClothingImage.js
├── migrations/         # Database migrations
├── services/           # Business logic layer
└── database/           # SQL schema and documentation
```

## Key Components

### HomePage
- Displays clothing categories in a grid layout
- Shows featured thrift stores
- Lists all local stores with ratings and delivery info

### StorePage
- Individual store detail view
- Product filtering by category
- Product grid with add-to-cart functionality

### LoginPage
- Customer and business user authentication
- Form validation and error handling
- Redirects business users to dashboard

### BusinessDashboard
- **Inventory Management**: Add/edit clothing items with image uploads
- **Current Orders**: Track active orders and pickups
- **Past Orders & Finances**: View sales analytics and revenue data

### StoreCard
- Store information display
- Rating, delivery time, and distance
- Category tags and minimum order requirements

### ProductCard
- Individual product display
- Pricing with original vs. thrift prices
- Condition indicators and size information
- Like and add-to-cart functionality

## Database Schema

The app includes a complete backend with:

- **Stores Table**: Store information and metadata
- **Clothing Articles**: Product details with validation
- **Clothing Images**: 1-3 images per article with ordering
- **Migrations**: Version-controlled database changes
- **Service Layer**: Business logic and validation

## Customization

### Adding New Categories
Edit `src/data/mockData.js` to add new clothing categories:

```javascript
{
  id: 9,
  name: "New Category",
  icon: "🆕",
  description: "Description here",
  color: "bg-gray-100"
}
```

### Adding New Stores
Add new thrift stores to the `thriftStores` array:

```javascript
{
  id: 7,
  name: "Store Name",
  rating: 4.5,
  reviewCount: 100,
  deliveryTime: "25-35 min",
  deliveryFee: "$2.99",
  minOrder: "$20",
  image: "image-url",
  categories: ["Shirts", "Pants"],
  featured: false,
  distance: "1.0 mi"
}
```

### Styling
The app uses Tailwind CSS with custom color schemes defined in `tailwind.config.js`. You can customize:

- Primary colors (blues)
- Secondary colors (purples)
- Accent colors (yellows)
- Font families
- Component styles in `src/index.css`

## Future Enhancements

- User authentication and profiles
- Shopping cart functionality
- Order tracking
- Real-time inventory updates
- Payment integration
- Advanced search and filtering
- Review and rating system
- Mobile app development

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For questions or support, please open an issue in the repository.
