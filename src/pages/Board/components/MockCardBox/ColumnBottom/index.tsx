import React, { useState } from 'react';
import s from './style.module.scss';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';

interface IProps {
  name?: string;
}

const ColumnTop = ({}: IProps) => {
  const [isAddingCard, setIsAddingCard] = useState(false);

  const addCardHandler = () => {
    console.log('addCard');
  };

  return (
    <div className={s.columnBottom}>
      {!isAddingCard ? (
        <div className={s.addButtonWrapper}>
          <button onClick={() => setIsAddingCard(true)} className={`${s.button} ${s.buttonAdd}`}>
            <AddIcon sx={{ fontSize: 20, color: 'var(--text-color-dark)' }} />
            <span>Add a card</span>
          </button>
        </div>
      ) : (
        <div>
          <textarea placeholder="Enter a title for this card..." className={s.textArea}></textarea>
          <div className={s.bottomButtonsWrapper}>
            <div className={s.bottomButtonsLeftWrapper}>
              <button onClick={addCardHandler} className={s.fillButton}>
                Add card
              </button>
              <button onClick={() => setIsAddingCard(false)} className={s.transparentButton}>
                <CloseIcon sx={{ fontSize: 26, color: 'var(--text-color-dark)' }} />
              </button>
            </div>
            <button
              onClick={() => setIsAddingCard(false)}
              className={`${s.button} ${s.buttonModify}`}
            >
              <svg width="18" height="18" fill="var(--text-color-gray)">
                <use xlinkHref="sprite.svg#menu"></use>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnTop;
