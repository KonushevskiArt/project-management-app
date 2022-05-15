import React, { useState } from 'react';
import s from './style.module.scss';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import useOnclickOutside from 'react-cool-onclickoutside';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useParams } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import { useCreateColumn } from 'hooks/columns/useCreateColumn';

type Inputs = {
  name: string;
};

interface LocationState {
  lastColumnOrder: number;
}

const ColumnCreater = () => {
  const params = useParams();
  const boardId = params.id as string;
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const location = useLocation();
  const { lastColumnOrder } = location.state as LocationState;

  const [currentOrder, setCurrentOrder] = useState(lastColumnOrder);

  const { mutate, isLoading } = useCreateColumn(boardId, setIsAddingColumn);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.name.trim() && isLoading === false) {
      mutate({ title: data.name, order: currentOrder + 1 });
      setCurrentOrder(currentOrder + 1);
      reset();
    }
  };

  const ref = useOnclickOutside(() => {
    setIsAddingColumn(false);
  });

  const clickTriggerHandler = () => {
    setIsAddingColumn(true);
  };

  const addColumnBlockClassNames = isAddingColumn
    ? `${s.addColumnBlock} ${s.activeColumnBlock}`
    : s.addColumnBlock;

  return (
    <div className={s.columnCreater}>
      <div ref={ref} className={addColumnBlockClassNames}>
        <form onSubmit={handleSubmit(onSubmit)}>
          {!isAddingColumn ? (
            <button
              onClick={clickTriggerHandler}
              className={`${s.triggerAddColumn} ${s.buttonAdd}`}
            >
              <AddIcon sx={{ fontSize: 22, color: 'var(--text-color-white)' }} />
              <span>Add another list</span>
            </button>
          ) : (
            <input
              {...register('name')}
              autoFocus
              maxLength={120}
              placeholder="Enter list title..."
              className={s.textInput}
            ></input>
          )}
          <div className={s.bottomButtonsWrapper}>
            <div className={s.bottomButtonsLeftWrapper}>
              <button disabled={isLoading} type="submit" className={s.fillButton}>
                {isLoading ? (
                  <CircularProgress size={20} sx={{ color: 'var(--text-color-white)' }} />
                ) : (
                  'Add list'
                )}
              </button>
              <button onClick={() => setIsAddingColumn(false)} className={s.transparentButton}>
                <CloseIcon sx={{ fontSize: 26, color: 'var(--text-color-dark)' }} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ColumnCreater;
