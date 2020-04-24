import React from "react";

type FlipCardProps = {
  title: string;
  backImage:JSX.Element;
  image:JSX.Element;
}

function FlipCard({title, backImage, image}:FlipCardProps) {
  return (
      <div className="entire-card">
        <div className="flip-card flip-card-front">
          {image}
          <span className="card-title">{title}</span>
        </div>
        <div className="flip-card flip-card-back">
            {backImage}
        </div>
      </div>
  );
}

export default FlipCard;
