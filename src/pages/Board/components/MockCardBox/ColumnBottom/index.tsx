import React, { useState } from 'react';
import s from './style.module.scss';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { useQuery } from 'react-query';
import { ColumnService } from 'utils/services/Column.service';
import { BoardCtx } from 'pages/Board';
import { useParams } from 'react-router';
import { toast, ToastOptions } from 'react-toastify';

interface IProps {
  name?: string;
  id: string;
}

const ColumnBottom = ({ id }: IProps) => {
  const [isAddingCard, setIsAddingCard] = useState(false);
  const params = useParams();
  const { removeColumn } = React.useContext(BoardCtx);
  const boardId = params.id as string;
  const [isLoading, setIsLoading] = useState(false);

  const toastOption = {
    position: 'bottom-center',
    hideProgressBar: true,
    autoClose: 5000,
  } as ToastOptions;

  const { refetch } = useQuery(
    'delete column' + id,
    () => ColumnService.deleteColumnById(boardId, id),
    {
      enabled: false,
      onSuccess: (data) => {
        console.log(data);
        removeColumn(id);
        setIsLoading(false);
        toast.success('Column deleted successfuly!', toastOption);
      },
      onError: (error: Error) => {
        console.log(error);
        setIsLoading(false);
        toast.error('Failed remove by network error!', toastOption);
      },
    }
  );

  const addTaskHandler = () => {
    console.log('addCard');
  };

  const removeColumnHandler = () => {
    console.log('remove column');
    setIsLoading(true);
    refetch();
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
