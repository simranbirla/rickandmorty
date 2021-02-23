import React, { useState } from "react";
import "./App.css";

const Search = ({ setData, page, setPage }) => {
  const [name, setName] = useState();

  const handleInput = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    fetch(`https://rickandmortyapi.com/api/character?page=1&name=${name}`)
      .then((data) => data.json())
      .then((res) => setData(res));
  };

  return (
    <form onSubmit={handleSubmit} className="search">
      <input
        type="text"
        placeholder="Search the character"
        onChange={handleInput}
      />
      <button>Search</button>
    </form>
  );
};

export default Search;
