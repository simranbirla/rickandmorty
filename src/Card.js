import React from "react";
import "./App.css";
const Card = ({ card, setOpen, setChar }) => {
  const openModal = () => {
    setChar(card.id);
    setOpen(true);
  };

  return (
    <div className="card" onClick={openModal}>
      <div>
        <img src={card.image} />
        <h3>{card.name}</h3>
      </div>
      <div>
        <p>{card.species} - </p>
        <p>{card.status}</p>
      </div>
    </div>
  );
};

export default Card;
