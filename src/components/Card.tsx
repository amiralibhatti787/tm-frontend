import React from 'react';

interface CardProps {
  name: string;
}

const Card: React.FC<CardProps> = ({ name }) => {
  return (
      <h6>{name}</h6>
  );
};

export default Card;
