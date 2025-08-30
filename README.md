# Akuatiq - Local Thrift Store Discovery App

A modern, DoorDash-style frontend application that allows users to discover and shop from local thrift stores. Built with React, Tailwind CSS, and modern web technologies.

## Features

- **Clothing Categories**: Browse by shirts, jackets, polos, jacquards, hats, pants, dresses, and shoes
- **Store Discovery**: Find local thrift stores with ratings, delivery times, and categories
- **Product Browsing**: View individual store inventories with detailed product information
- **Responsive Design**: Mobile-first design that works on all devices
- **Modern UI**: Clean, intuitive interface inspired by popular delivery apps

## Tech Stack

- **Frontend**: React 18 with Hooks
- **Styling**: Tailwind CSS
- **Routing**: React Router DOM
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd akuatiq-app
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
│   └── StoreCard.jsx
├── pages/              # Page components
│   ├── HomePage.jsx
│   └── StorePage.jsx
├── data/               # Mock data and constants
│   └── mockData.js
├── App.jsx             # Main app component
├── main.jsx            # React entry point
└── index.css           # Global styles
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

### StoreCard
- Store information display
- Rating, delivery time, and distance
- Category tags and minimum order requirements

### ProductCard
- Individual product display
- Pricing with original vs. thrift prices
- Condition indicators and size information
- Like and add-to-cart functionality

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
- Store owner dashboard
- Review and rating system
- Advanced search and filtering

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
