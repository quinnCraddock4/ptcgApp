import { useState, useEffect } from 'react';
import CardCarousel from './CardCarousel';

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle search input change
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  // Debounce logic
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // 500ms delay after the user stops typing

    return () => clearTimeout(timer); // Cleanup the timer when the component is unmounted or when the searchTerm changes
  }, [searchTerm]);

  // Fetch cards when debounced search term changes
  useEffect(() => {
    if (!debouncedSearchTerm) return;

    const fetchCards = async () => {
      setLoading(true);
      setError(''); // Clear error message before fetching
      try {
        // If search term contains spaces, wrap it in quotes this logic is kinda weird but it works
        const query = debouncedSearchTerm.includes(' ')
          ? `"${debouncedSearchTerm}"`
          : debouncedSearchTerm;

        const response = await fetch(
          `https://api.pokemontcg.io/v2/cards?q=name:${query}`,
          {
            headers: {
              'X-API-Key': '9696f942-5b3f-46ac-af30-3db0277977c8',// hardcoding this cause im to lazy to send an env
            },
          }
        );
        const data = await response.json();
        setCards(data.data); // Set the cards data from the API

        if (data.data.length === 0) {
          setError('No cards found');
        }
      } catch (err) {
        console.log(err);
        setError('Failed to fetch cards');
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [debouncedSearchTerm]);

  // Clear error message when search term is empty
  useEffect(() => {
    if (searchTerm === '') {
      setError('');
    }
  }, [searchTerm]);

  return (
    <div className="home">
      {/* Search Bar at the Top */}
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Search for cards..."
          className="search-input"
        />
      </div>

      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}

      <CardCarousel cards={cards} />
    </div>
  );
}

export default Home;
