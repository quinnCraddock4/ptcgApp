import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import styles from './Collection.module.css';

const Collection = () => {
  const [savedCards, setSavedCards] = useState([]);

  useEffect(() => {
    document.body.style.overflow = 'visible';
    // Retrieve saved cards from localStorage
    const saved = JSON.parse(localStorage.getItem('savedCards')) || [];
    setSavedCards(saved);
  }, []);

  const handleEditButtonClick = (cardId) => {
    const updatedPrice = prompt('Enter your new target price:');

    if (!updatedPrice) return;

    const parsedPrice = parseFloat(updatedPrice);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    // Update the target price for the card
    const updatedCards = savedCards.map((card) => {
      if (card.id === cardId) {
        return { ...card, targetPrice: parsedPrice };
      }
      return card;
    });

    setSavedCards(updatedCards);
    localStorage.setItem('savedCards', JSON.stringify(updatedCards));

    alert('Target price updated!');
  };

  const handleDeleteButtonClick = (cardId) => {
    // Filter out the card with the given id
    const updatedCards = savedCards.filter((card) => card.id !== cardId);

    // Update state and localStorage
    setSavedCards(updatedCards);
    localStorage.setItem('savedCards', JSON.stringify(updatedCards));

    alert('Card deleted!');
  };

  return (
    <div className={styles.collectionContainer}>
      <Link to="/" className={styles.homeLink}>Home</Link> {/* Link to home screen */}
      <h2>Your Collection</h2>
      <div className={styles.cardGrid}>
        {savedCards.map((card) => (
          <div
            key={card.id}
            className={styles.card}
            style={{ backgroundImage: `url(${card.image})` }}
          >
            <div className={styles.cardHoverInfo}>
              <div className={styles.priceInfo}>
                <p>Market Price: ${card.currentPrice}</p>
                <p>Target Price: ${card.targetPrice}</p>
              </div>
              <button
                className={styles.editButton}
                onClick={() => handleEditButtonClick(card.id)}
              >
                Edit Target Price
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDeleteButtonClick(card.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Collection;
