import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/Logo.svg";
import "../styles/Header.css"
import Login from "./Header/Login";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function Header({ selectedLocation, setSelectedLocation }) {
  const [locationInputValue, setLocationInputValue] = useState(selectedLocation);
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const db = getFirestore();
        const restaurantsCollection = collection(db, 'Restaurants Details');
        const querySnapshot = await getDocs(restaurantsCollection);
        const cities = new Set(); // Use a Set to avoid duplicates

        querySnapshot.forEach((doc) => {
          const city = doc.data().City;
          cities.add(city);
        });

        setLocationSuggestions(Array.from(cities)); // Convert Set to an array
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []);

  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setLocationInputValue(selectedLocation);
    setSelectedLocation(selectedLocation);
  };

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div className="header-input">
        <select
          value={locationInputValue}
          onChange={handleLocationChange}
          className="location-input"
        >
          {locationSuggestions.map((location, index) => (
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <nav>
        <Login />
      </nav>
    </header>
  );
}

export default Header;
