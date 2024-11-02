import React, { useEffect, useState } from "react";

const RatingComponent = ({ rating }) => {
  const [stars, setStars] = useState([]);

  useEffect(() => {
    displayRating(rating.rate);
  }, [rating]);

  const displayRating = (rate) => {
    const starsArray = [];
    for (let i = 0; i < 5; i++) {
      if (rate >= 1) {
        starsArray.push(<i key={i} className="fa-solid fa-star"></i>);
      } else if (rate >= 0.5) {
        starsArray.push(
          <i key={i} className="fa-solid fa-star-half-stroke"></i>
        );
      } else {
        starsArray.push(<i key={i} className="fa-regular fa-star"></i>);
      }
      rate--;
    }
    setStars(starsArray);
  };

  return (
    <>
      <small className="text-secondary d-block">
        {rating.rate}/5 {stars} {rating.count} reviews
      </small>
    </>
  );
};

export default RatingComponent;
