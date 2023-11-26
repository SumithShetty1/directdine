import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './assets/components/Header';
import Footer from './assets/components/Footer';
import Home from './assets/pages/Home';
import Restaurants from './assets/pages/Restaurants';
import Booking from './assets/pages/Booking';
import Confirmation from './assets/pages/Confirmation';
import Confirmed from './assets/pages/Confirmed';
import MyBookings from './assets/pages/MyBookings';
import Reservations from './assets/pages/Reservations';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  // State to manage selected location
  const [selectedLocation, setSelectedLocation] = useState('Moodbidri');

  return (
    <div className='container'>
      {/* Providing authentication context to components */}
      <AuthContextProvider>
        {/* Header component */}
        <Header selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />

        {/* Routing setup */}
        <Routes>
          {/* Routes for different pages */}
          <Route path="/" element={<Home selectedLocation={selectedLocation} />} />
          <Route path="/mybookings" element={<MyBookings />} />
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/restaurants" element={<Restaurants selectedLocation={selectedLocation} />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/confirmed" element={<Confirmed />} />
        </Routes>

        {/* Footer component */}
        <Footer />
      </AuthContextProvider>
    </div>
  );
}

export default App;
