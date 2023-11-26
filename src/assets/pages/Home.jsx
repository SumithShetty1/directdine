import React from 'react';
import '../styles/Home.css';
import Recommend from '../components/Home/Recommend';
import Added from '../components/Home/Added';
import AllRestaurants from '../components/Home/AllRestaurants';
import About from '../components/Home/About';

function Home({ selectedLocation }) {
  return (
    // Main container for the Home page
    <main className='homepage'>
      {/* Component to display recommended restaurants */}
      <Recommend selectedLocation={selectedLocation} />
      {/* Component to display recently added restaurants */}
      <Added selectedLocation={selectedLocation} />
      {/* Component to display all restaurants */}
      <AllRestaurants />
      {/* Component to display information about the website or application */}
      <About />
    </main>
  );
}

export default Home;
