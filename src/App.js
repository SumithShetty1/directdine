import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './assets/components/Header';
import Footer from './assets/components/Footer';
import Home from './assets/pages/Home';

function App() {
  const [selectedLocation, setSelectedLocation] = useState('Moodbidri');

  return (
    <div className='container'>
      <Header selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
      <Routes>
        <Route path="/" element={<Home selectedLocation={selectedLocation} />} />
      </Routes>
      <Footer/>
    </div>
  );
}

export default App;
