import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './assets/components/Header';
import Footer from './assets/components/Footer';
import Home from './assets/pages/Home';

function App() {
  return (
    <div className='container'>
      <Header/>
      <Home/>
      <Footer/>
    </div>
  );
}

export default App;
