import React from 'react';
import '../styles/Home.css';
import Hero from '../components/Hero';
import Recommend from '../components/Recommend';

function Home({ selectedLocation }) {
  return (
    <main>
      <Hero/>
      <Recommend selectedLocation={selectedLocation} />
    </main>
  );
}

export default Home;
