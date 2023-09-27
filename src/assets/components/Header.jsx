import React, { useState } from "react";
import { Link } from 'react-router-dom';
import logo from "../images/Logo.svg";
import searchicon from "../images/search-icon.png";
import "../styles/Header.css"

function Header({ selectedLocation, setSelectedLocation }) {
  const [locationInputValue, setLocationInputValue] = useState(selectedLocation); // Initialize with default value
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [searchInputValue, setSearchInputValue] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedQuery, setSelectedQuery] = useState("");

  // Function to get location suggestions based on location query
  const getLocationSuggestions = (query) => {
    const locationSuggestions = ["Moodbidri", "Mangalore", "Bantwal"];
    return locationSuggestions.filter((location) =>
      location.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Function to get suggestions based on search query
  const getSuggestions = (query) => {
    const suggestions = ["Charcoals", "Grand Palace", "Dominos"];
    return suggestions.filter((suggestion) =>
      suggestion.toLowerCase().includes(query.toLowerCase())
    );
  };

  const handleLocationBlur = () => {
    // Check if the input value doesn't match any suggestions, then revert it to selectedLocation
    if (!getLocationSuggestions(locationInputValue).includes(locationInputValue)) {
      setLocationInputValue(selectedLocation);
    }
  };

  const handleLocationQueryChange = (e) => {
    const query = e.target.value;

    setLocationInputValue(query);

    const filteredLocationSuggestions = getLocationSuggestions(query);
    setLocationSuggestions(filteredLocationSuggestions);

    if (filteredLocationSuggestions.includes(query)) {
      setSelectedLocation(query);
    }
  };

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;

    setSearchInputValue(query);

    const filteredSuggestions = getSuggestions(query);
    setSuggestions(filteredSuggestions);

    if (filteredSuggestions.includes(query)) {
      setSelectedQuery(query);
    } else {
      setSelectedQuery("");
    }
  };

  return (
    <header>
      <Link to="/">
        <img src={logo} alt="logo" />
      </Link>
      <div className="header-input">
        <input
          type="text"
          list="locations"
          value={locationInputValue}
          onBlur={handleLocationBlur} // Handle blur event to check and revert value
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
          value={searchInputValue}
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
          <img src={searchicon} className="search-icon" alt="Search" />
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
