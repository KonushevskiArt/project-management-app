import React, { useState } from 'react';
import ColumnBottom from './ColumnBottom';
import ColumnTop from './ColumnTop';
import s from './style.module.scss';

interface ICard {
  name: string;
  description: string;
}

interface IProps {
  name?: string;
  cards?: ICard[];
}

const CardBox = ({ name = 'some name', cards = [] }: IProps) => {
  const [isEditName, setIsEditName] = useState(false);

  return (
    <div className={s.cardBox}>
      <ColumnTop name={name} />
      {cards.map((card) => (
        <p key={card.name + Math.random()}>{card.name}</p>
      ))}
      <ColumnBottom />
    </div>
  );
};

export default CardBox;
