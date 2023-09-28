import React from 'react'
import { Link } from 'react-router-dom';
import '../styles/Restaurants.css'
import menuicon from "../images/menu-icon.png";
import locationicon from "../images/location-icon.png";

import charcoals from "../images/Charcoals.png";

function Restaurants({ selectedLocation }) {
  const restaurantData = [
    { name: "Charcoal's Family Restaurant", location: "Moodbidri", ratings: 4.5 },
    { name: "Charcoal's Family Restaurant", location: "Moodbidri", ratings: 4.5 },
    { name: "Charcoal's Family Restaurant", location: "Moodbidri", ratings: 4.5 },
    { name: "Charcoal's Family Restaurant", location: "Moodbidri", ratings: 4.5 },
  ];

  return (
    <main>
      <section className='recommended'>
        <div className='recommended-header'>
          <h1>Recommended restaurants in {selectedLocation}</h1>
        </div>
        <div className='recommended-container'>
          {restaurantData.map((restaurant, index) => (
            <article className="restaurant-lists" key={index}>
              <div className="restaurant-ratings">{restaurant.ratings}</div>
              <img src={charcoals} alt='Restaurant' />
              <div className='restaurant-details'>
                <h2>{restaurant.name}</h2>
                <p>{restaurant.location}</p>
                <Link>
                  <img src={menuicon} alt='' />
                  View Menu
                </Link>
                <Link>
                  <img src={locationicon} alt='' />
                  See Location
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Restaurants