import React, { useState } from "react";
import logo from "../images/Logo.svg";

function Header() {
  const [selectedLocation, setSelectedLocation] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  const handleLocationChange = (e) => {
    setSelectedLocation(e.target.value);
  };

  const handleSearchQueryChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    // Filtering and seting suggestions based on the search query
    const filteredSuggestions = getSuggestions(query);
    setSuggestions(filteredSuggestions);
  };

  // Mock function to get suggestions based on search query
  const getSuggestions = (query) => {
    // We can implement our logic here to fetch or filter suggestions based on the query
    const suggestions = ["Suggestion1", "Suggestion2", "Suggestion3"]; // Replace with your data
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
          onChange={handleLocationChange}
          className="location-dropdown"
          placeholder="Type your location"
        />
        <datalist id="locations">
          <option value="Moodbidri" />
          <option value="Mangalore" />
          <option value="Bantwal" />
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
        <button className="search-btn">Search</button>
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
      </nav>
      <button className="login-btn">Login</button>
    </header>
  );
}

export default Header;
