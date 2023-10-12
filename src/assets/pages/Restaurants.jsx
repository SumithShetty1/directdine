import React, {useState} from 'react'
import { Link } from 'react-router-dom';
import '../styles/Restaurants.css'
import menuicon from "../images/menu-icon.png";
import locationicon from "../images/location-icon.png";
import charcoals from "../images/Charcoals.png";

function Restaurants({ selectedLocation }) {
  const [sortOption, setSortOption] = useState('Popularity');

  const restaurantData = [
    { name: "Charcoal's Family Restaurant", location: "Moodbidri", ratings: 4.5 },
    { name: "Charcoal's Family Restaurant", location: "Moodbidri", ratings: 4.5 },
    { name: "Charcoal's Family Restaurant", location: "Moodbidri", ratings: 4.5 },
    { name: "Charcoal's Family Restaurant", location: "Moodbidri", ratings: 4.5 },
  ];

  return (
    <main className='restaurantspage'>
      <section className='recommended'>
        <div className='recommended-header'>
          <h1>Recommended restaurants in {selectedLocation}</h1>
          <div className='sort-container'>
            <label for="sort">Sort By</label>
            <select id='sort' value={sortOption} onChange={(e) => setSortOption(e.target.value)}>
              <option value="popularity">Popularity</option>
              <option value="ratings">Ratings</option>
            </select>
          </div>
        </div>
        <div className='recommended-container'>
          {restaurantData.map((restaurant, index) => (
            <section className="restaurant-lists" key={index}>
              <div className="restaurant-ratings">{restaurant.ratings}</div>
              <img src={charcoals} alt='Restaurant' />
              <div className='restaurant-details'>
                <h2>{restaurant.name}</h2>
                <p>{restaurant.location}</p>
                <span className='restaurant-links'>
                  <Link>
                    <img src={menuicon} alt='' />
                    <span>View Menu</span>
                  </Link>
                  <Link>
                    <img src={locationicon} alt='' />
                    <span>See Location</span>
                  </Link>
                </span>
              </div>
              <button className='booktable-btn'>Book a Table</button>
            </section>
          ))}
        </div>
      </section>
      <aside className='filter'>
        
      </aside>
    </main>
  );
}

export default Restaurants