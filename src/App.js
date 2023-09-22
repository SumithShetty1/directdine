import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './assets/components/Header';
import Footer from './assets/components/Footer';
import Home from './assets/pages/Home';

function App() {
  const [selectedLocation, setSelectedLocation] = useState('Mangalore');

  return (
    <div className='container'>
      <Header selectedLocation={selectedLocation} setSelectedLocation={setSelectedLocation} />
      <Home selectedLocation={selectedLocation} />
      <Footer/>
    </div>
  );
}

export default App;
