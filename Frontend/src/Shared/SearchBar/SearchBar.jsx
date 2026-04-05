import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SearchBar.scss';

const SearchIcon = () => (
  <svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
);

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/app/searchResult?query=${query}`);
  };

  return (
    <header className="search-bar">
      <div className="search-bar__icon"><SearchIcon /></div>
      <form className="search-bar__form" onSubmit={handleSubmit}>
        <input
          className="search-bar__input"
          type="text"
          placeholder="Search your second brain..."
          value={query}
          onChange={e => setQuery(e.target.value)}
        />
      </form>
      <span className="search-bar__kbd">⌘K</span>
    </header>
  );
};

export default SearchBar;
