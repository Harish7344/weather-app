// src/components/SearchBar.js
import React from 'react';

const SearchBar = ({ city, setCity, handleSearch }) => {
  return (
    <form onSubmit={handleSearch} className="search-form">
      <input
        type="text"
        placeholder="Enter city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default SearchBar;
