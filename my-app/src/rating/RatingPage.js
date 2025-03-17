import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./RatingPage.css";

function RatingPage() {
  const navigate = useNavigate();
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = () => {
    alert(`Thank you for your feedback! ⭐️ ${rating} stars\n"${review}"`);
    navigate("/"); 
  };

  return (
    <div className="rating-page">
      <header className="rating-header">
        <h1>⭐ Rate Your Order</h1>
        <p>We'd love to hear about your experience!</p>
      </header>

      <div className="rating-container">
        <h2>How was your delivery?</h2>
        <div className="star-rating">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={star <= rating ? "star selected" : "star"}
              onClick={() => setRating(star)}
            >
              ★
            </span>
          ))}
        </div>

        <h3>Leave a review (optional)</h3>
        <textarea
          placeholder="Tell us about your experience..."
          value={review}
          onChange={(e) => setReview(e.target.value)}
        />

        <button className="submit-button" onClick={handleSubmit}>
          Submit Feedback
        </button>
      </div>
    </div>
  );
}

export default RatingPage;
