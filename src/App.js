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

function App() {
  const [selectedLocation, setSelectedLocation] = useState('Moodbidri');

  return (
    <div className='container'>
      <Header selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
      <Routes>
        <Route path="/" element={<Home selectedLocation={selectedLocation} />} />
        <Route path="/restaurants" element={<Restaurants selectedLocation={selectedLocation} />} />
        <Route path="/booking" element={<Booking/>} />
        <Route path="/confirmation" element={<Confirmation/>} />
        <Route path="/confirmed" element={<Confirmed/>} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
