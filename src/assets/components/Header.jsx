import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logo from "../images/Logo.svg";
import "../styles/Header.css"
import Login from "./Header/Login";
import { getFirestore, collection, getDocs } from 'firebase/firestore';

function Header({ selectedLocation, setSelectedLocation }) {
  // State to manage input value and location suggestions
  const [locationInputValue, setLocationInputValue] = useState(selectedLocation);
  const [locationSuggestions, setLocationSuggestions] = useState([]);

  useEffect(() => {
    // Fetch cities from Firestore on component mount
    const fetchCities = async () => {
      try {
        const db = getFirestore();
        const restaurantsCollection = collection(db, 'Restaurants Details');
        const querySnapshot = await getDocs(restaurantsCollection);
        const cities = new Set(); // Use a Set to avoid duplicates

        // Extract unique cities from Firestore data
        querySnapshot.forEach((doc) => {
          const city = doc.data().City;
          cities.add(city);
        });

        setLocationSuggestions(Array.from(cities)); // Convert Set to an array and update suggestions
      } catch (error) {
        console.error('Error fetching cities:', error);
      }
    };

    fetchCities();
  }, []); // Run this effect only once on component mount

  // Function to handle location change
  const handleLocationChange = (e) => {
    const selectedLocation = e.target.value;
    setLocationInputValue(selectedLocation); // Update input value
    setSelectedLocation(selectedLocation); // Set selected location in parent component
  };

  return (
    <header>
      {/* Link to home */}
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div className="header-input">
        {/* Dropdown for location selection */}
        <select
          value={locationInputValue}
          onChange={handleLocationChange}
          className="location-input"
        >
          {locationSuggestions.map((location, index) => (
            // Display options for location suggestions
            <option key={index} value={location}>
              {location}
            </option>
          ))}
        </select>
      </div>
      <nav>
        {/* Component for login */}
        <Login />
      </nav>
    </header>
  );
}

export default Header;
