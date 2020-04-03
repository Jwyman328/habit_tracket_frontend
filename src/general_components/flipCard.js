import React from "react";

function FlipCard(props) {
  return (
      <div className="entire-card">
        <div className="flip-card flip-card-front">
          {props.image}
          <span className="card-title">{props.title}</span>
        </div>
        <div className="flip-card flip-card-back">
            {props.backImage}
        </div>
      </div>
  );
}

export default FlipCard;
