import { Swiper, SwiperSlide } from 'swiper/react';
import { Link, useLocation } from 'react-router-dom';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import './CardCarousel.css';

const CardCarousel = ({ cards = [] }) => {
  
  const location = useLocation(); // Get the current location

  // Function to handle Add button click
  const handleAddButtonClick = (card, priceType) => {
    const targetPrice = prompt(`Enter the price you want to be notified at for ${priceType}:`);
    
    // If user cancels the prompt or doesn't enter a value, exit
    if (!targetPrice) return;
    
    // Parse the target price to a float to ensure it's a valid number
    const parsedPrice = parseFloat(targetPrice);

    // Check if it's a valid price
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    // Save the card information and target price to localStorage
    const savedCards = JSON.parse(localStorage.getItem("savedCards")) || [];
    const cardData = {
      id: card.id,
      image: card.images.large,
      name: card.name,
      priceType: priceType,
      targetPrice: parsedPrice,
      currentPrice: card.tcgplayer.prices[priceType]?.market,
    };

    // Add the card data to saved cards
    savedCards.push(cardData);

    // Save the updated list back to localStorage
    localStorage.setItem("savedCards", JSON.stringify(savedCards));

    alert(`Card information saved! You will be notified when ${priceType} reaches $${parsedPrice}.`);
  };

  return (
    <div className="container my-4">
      {/* Conditionally render the link based on current route */}
      {location.pathname !== '/collection' && (
        <Link to="/collection" className="collection-link">
          Go to Collection
        </Link>
      )}

      <Swiper
      updateOnWindowResize={true}
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        spaceBetween={50}
        loop={true} // Enable infinite loop
        coverflowEffect={{
          rotate: 30,
          stretch: 0,
          depth: 200,
          modifier: 1,
          slideShadows: false,
        }}
        observeParents={true}
        observer={true}
        pagination={false} // Disable pagination dots
        modules={[EffectCoverflow]}
        className="mySwiper"
      >
        {cards.map((card) => (
          <SwiperSlide key={card.id} className="swiper-slide">
            <div className="card-wrapper">
              <div
                className="card"
                style={{
                  backgroundImage: `url(${card.images.small})`, // Card image
                }}
              >
                <div className="info-box">
                  <div className="price">
                    {/* Check if prices exist and map through them */}
                    {card.tcgplayer?.prices &&
                      Object.keys(card.tcgplayer.prices).map((priceType) => (
                        <div key={priceType}>
                          {card.tcgplayer.prices[priceType]?.market && (
                            <>
                              <span>{priceType}: </span>
                              <span>${card.tcgplayer.prices[priceType]?.market}</span>
                              <button
                                className="add-button"
                                onClick={() => handleAddButtonClick(card, priceType)}
                              >
                                Add {priceType}
                              </button>
                            </>
                          )}
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CardCarousel;
