import React, { useState } from "react";
import { Link } from 'react-router-dom';
import logo from "../images/Logo.svg";
import searchicon from "../images/search-icon.png";
import "../styles/Header.css"

function Header() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Function to get location suggestions based on location query
  const getLocationSuggestions = (query) => {
   const locationSuggestions = ["Moodbidri", "Mangalore", "Bantwal"];
   return locationSuggestions.filter((location) =>
     location.toLowerCase().includes(query.toLowerCase())
   );
  };

  const handleLocationQueryChange = (e) => {
    const query = e.target.value;
    setSelectedLocation(query);

    // Filtering and setting location suggestions based on the query
    const filteredLocationSuggestions = getLocationSuggestions(query);
    setLocationSuggestions(filteredLocationSuggestions);
  };


  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filtering and setting suggestions based on the search query
    const filteredSuggestions = getSuggestions(query);
    setSuggestions(filteredSuggestions);
  };

  // Function to get suggestions based on search query
  const getSuggestions = (query) => {
    // We can implement our logic here to fetch or filter suggestions based on the query
    const suggestions = ["Charcoals", "Grand Palace", "Dominos"];
    return suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
  };

  return (
    <header>
      <img src={logo} alt="logo" />
      <div className="header-input">
        <input
          type="text"
          list="locations"
          value={selectedLocation}
          onChange={handleLocationQueryChange}
          className="location-input"
          placeholder="Type your location"
        />
        <datalist id="locations">
          {locationSuggestions.map((location, index) => (
            <option key={index} value={location} />
          ))}
        </datalist>
        <input
          type="text"
          list="search"
          value={searchQuery}
          onChange={handleSearchQueryChange}
          className="search-input"
          placeholder="Search for restaurants"
        />
        {suggestions.length > 0 && (
          <datalist id="search">
            {suggestions.map((suggestion, index) => (
              <option key={index} value={suggestion} />
            ))}
          </datalist>
        )}
        <button className="search-btn">
          <img src={searchicon} className="search-icon" />
          Search
        </button>
      </div>
      <nav>
        <ul>
          <li>
            <a href="#">Add Restaurant</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
        <button className="login-btn">Login</button>
      </nav>
    </header>
  );
}

export default Header;
