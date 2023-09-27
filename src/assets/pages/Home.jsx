import React from 'react';
import '../styles/Home.css';
import Recommend from '../components/Home/Recommend';
import Added from '../components/Home/Added';
import AllRestaurants from '../components/Home/AllRestaurants'
import About from '../components/Home/About';

function Home({ selectedLocation }) {
  return (
    <main>
      <Recommend selectedLocation={selectedLocation} />
      <Added selectedLocation={selectedLocation} />
      <AllRestaurants/>
      <About/>
    </main>
  );
}

export default Home;
