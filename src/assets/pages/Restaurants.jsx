import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import '../styles/Restaurants.css'
import menuicon from "../images/menu-icon.png";
import locationicon from "../images/location-icon.png";
import popularityicon from "../images/popularity-icon.png";
import dropdownicon from "../images/dropdown-icon.png";
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
      <aside className='filter'>
        <h3>Quick Filters</h3>
        <input type="checkbox" id="check" />
        <label htmlFor="check" className="checkbtn">
          <img src={dropdownicon} alt='' />
        </label>
        <div className='filter-options'>
          <div>
            <input type="checkbox" name="pureveg" id="pureveg" />
            <label htmlFor='pureveg'>Pure Veg</label>
          </div>
          <div>
            <input type="checkbox" name="nonveg" id="nonveg" />
            <label htmlFor='nonveg'>Non Veg</label>
          </div>
        </div>
      </aside>
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
                <p className='location'>{restaurant.location}</p>
                <p>Pure Veg</p>
                <div className='restaurant-links'>
                  <Link>
                    <img src={menuicon} alt='' />
                    <span>View Menu</span>
                  </Link>
                  <Link>
                    <img src={locationicon} alt='' />
                    <span>See Location</span>
                  </Link>
                </div>
                <div className='popularity'>
                  <img src={popularityicon} alt='' />
                  <span>Popularity</span>
                </div>
              </div>
              <button className='booktable-btn'>Book a Table</button>
            </section>
          ))}
        </div>
      </section>
    </main>
  );
}

export default Restaurants