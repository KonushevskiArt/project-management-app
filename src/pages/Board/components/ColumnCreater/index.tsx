import React, { useEffect, useState } from 'react';
import s from './style.module.scss';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import useOnclickOutside from 'react-cool-onclickoutside';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { ColumnService } from 'utils/services/Column.service';
import { useLocation, useParams } from 'react-router';
import { BoardCtx } from 'pages/Board';
import { IResponseNewColumn } from 'utils/services/models';
import CircularProgress from '@mui/material/CircularProgress';
import { toast, ToastOptions } from 'react-toastify';

type Inputs = {
  name: string;
};

interface LocationState {
  lastColumnOrder: number;
}

const ColumnCreater = () => {
  const params = useParams();
  const boardId = params.id as string;
  const { addColumn } = React.useContext(BoardCtx);
  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const [columnTitle, setColumnTitle] = useState('');
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const location = useLocation();
  const { lastColumnOrder } = location.state as LocationState;

  const [currentOrder, setCurrentOrder] = useState(lastColumnOrder);

  const [isLoading, setIsLoading] = useState(false);

  const toastOption = {
    position: 'bottom-center',
    hideProgressBar: true,
    autoClose: 5000,
  } as ToastOptions;

  const { refetch } = useQuery(
    'create column',
    () => ColumnService.createColumn(boardId, { title: columnTitle, order: currentOrder }),
    {
      enabled: false,
      onError: (error: Error) => {
        console.log(error);
        setIsLoading(false);
        toast.error('Column creating failed by network error!', toastOption);
      },
      onSuccess: (data) => {
        const newColumn = data?.data as IResponseNewColumn;
        addColumn(newColumn);
        setIsAddingColumn(false);
        setIsLoading(false);
        toast.success('Column created successfuly!', toastOption);
      },
    }
  );

  useEffect(() => {
    if (columnTitle) {
      refetch();
      setColumnTitle('');
    }
  }, [columnTitle]);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.name.trim() && isLoading === false) {
      setIsLoading(true);
      setCurrentOrder(currentOrder + 1);
      setColumnTitle(data.name);
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
