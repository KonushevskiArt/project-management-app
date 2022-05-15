import React, { useState } from 'react';
import s from './style.module.scss';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useParams } from 'react-router';
import { useDeleteColumnById } from 'hooks/columns/useDeleteColumnById';

interface IProps {
  name?: string;
  id: string;
}

const ColumnBottom = ({ id }: IProps) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const params = useParams();
  const boardId = params.id as string;

  const { mutate, isLoading } = useDeleteColumnById(boardId, id);

  const addTaskHandler = () => {
    console.log('addCard');
  };

  const removeColumnHandler = () => {
    mutate();
  };

  return (
    <div className={s.columnBottom}>
      {!isAddingCard ? (
        <div className={s.addButtonWrapper}>
          <button onClick={() => setIsAddingCard(true)} className={`${s.button} ${s.buttonAdd}`}>
            <AddIcon sx={{ fontSize: 20, color: 'var(--text-color-dark)' }} />
            <span>Add a task</span>
          </button>
          <button onClick={removeColumnHandler}>{isLoading ? 'loading' : 'remove column'}</button>
        </div>
      ) : (
        <div>
          <textarea placeholder="Enter a title for this card..." className={s.textArea}></textarea>
          <div className={s.bottomButtonsWrapper}>
            <div className={s.bottomButtonsLeftWrapper}>
              <button onClick={addTaskHandler} className={s.fillButton}>
                Add task
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

export default ColumnBottom;
