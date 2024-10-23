export function SearchBar({ searchTerm, onSearch, setSearchTerm }) {
  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div>
      <form className="search-bar" onSubmit={handleSubmit}>
        <input 
          type="text" 
          placeholder="Search for a product..." 
          value={searchTerm}
          onChange={handleInputChange}
        />
        <button className="searchButton" type="submit">Search</button>
      </form>
    </div>
  );
}
