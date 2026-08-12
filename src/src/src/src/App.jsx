import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import MainLayout from './layouts/MainLayout';
import Home from './pages/Home';
import Restaurants from './pages/Restaurants';
import RestaurantDetail from './pages/RestaurantDetail';
import Grocery from './pages/Grocery';
import Services from './pages/Services';
import Workers from './pages/Workers';
import Vehicles from './pages/Vehicles';
import Medicine from './pages/Medicine';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Orders from './pages/Orders';
import Bookings from './pages/Bookings';
import Profile from './pages/Profile';
import Partner from './pages/Partner';
import Search from './pages/Search';

function App() {
  return (
    <Router>
      <AppProvider>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="restaurants" element={<Restaurants />} />
            <Route path="restaurant/:id" element={<RestaurantDetail />} />
            <Route path="grocery" element={<Grocery />} />
            <Route path="services" element={<Services />} />
            <Route path="workers" element={<Workers />} />
            <Route path="vehicles" element={<Vehicles />} />
            <Route path="medicine" element={<Medicine />} />
            <Route path="cart" element={<Cart />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="orders" element={<Orders />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="profile" element={<Profile />} />
            <Route path="partner" element={<Partner />} />
            <Route path="search" element={<Search />} />
          </Route>
        </Routes>
      </AppProvider>
    </Router>
  );
}

export default App;
