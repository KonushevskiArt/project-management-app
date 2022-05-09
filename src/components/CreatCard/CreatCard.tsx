import styles from './creat-card.module.scss';
import { useState } from 'react';
import LabelCard from './LabelCard';
import CreatCardForm from './CreatCardForm';

const TEXT_ADD_CARD = {
  label: 'Add a card',
  placeholder: 'Enter a title for this card…',
};

const CreatCard = () => {
  const [isActive, toggleIsActive] = useState(false);

  const onLabelClick = () => toggleIsActive(true);
  const onCloseFormClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    toggleIsActive(false);
  };
  return (
    <div>
      {!isActive && <LabelCard label={TEXT_ADD_CARD.label} onClick={onLabelClick} />}
      {isActive && <CreatCardForm onCloseClick={onCloseFormClick} />}
    </div>
  );
};

export default CreatCard;
