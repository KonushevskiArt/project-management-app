import { useState } from 'react';
import CreatCardLabel from './CreatCardLabel';
import CreatCardForm from './CreatCardForm';

const TEXT_CREAT_CARD = {
  label: 'Add a card',
};

const CreatCard = () => {
  const [isCreatingCard, toggIsCreatingCard] = useState(false);

  const onLabelClick = () => toggIsCreatingCard(true);
  const onCloseFormClick = (event: { preventDefault: () => void }) => {
    event.preventDefault();
    toggIsCreatingCard(false);
  };
  return (
    <div>
      {isCreatingCard ? (
        <CreatCardForm onCloseClick={onCloseFormClick} />
      ) : (
        <CreatCardLabel label={TEXT_CREAT_CARD.label} onClick={onLabelClick} />
      )}
    </div>
  );
};

export default CreatCard;
