import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import HomePage from './pages/HomePage'
import StorePage from './pages/StorePage'
import LoginPage from './pages/LoginPage'
import BusinessDashboard from './pages/BusinessDashboard'
import './App.css'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/store/:id" element={<StorePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/dashboard" element={<BusinessDashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

export default App
