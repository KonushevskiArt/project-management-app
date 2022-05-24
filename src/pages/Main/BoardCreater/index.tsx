import React, { useState } from 'react';
import s from './style.module.scss';
import AddIcon from '@mui/icons-material/Add';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateBoard } from 'hooks/boards/useCraeteBoard';
import useOnclickOutside from 'react-cool-onclickoutside';

type Inputs = {
  title: string;
};

const BoardCreater = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const wrapperClasses = isOpen ? `${s.wrapper} ${s.wrapperActive}` : s.wrapper;
  const boardCreater = isOpen ? `${s.boardCreater} ${s.boardCreaterActive}` : s.boardCreater;
  const { mutate, isLoading } = useCreateBoard();
  const ref = useOnclickOutside(() => setIsOpen(false));

  const submitHandler: SubmitHandler<Inputs> = (data) => {
    if (data.title.trim() && isLoading === false) {
      mutate(data.title);
      setIsOpen(false);
      reset();
    }
  };

  return (
    <div className={boardCreater}>
      <div className={wrapperClasses}>
        {!isOpen && (
          <button onClick={() => setIsOpen(true)} className={s.btnAdd}>
            <AddIcon fontSize="large" />
          </button>
        )}
        {isOpen && (
          <form ref={ref} onSubmit={handleSubmit(submitHandler)}>
            <input
              {...register('title')}
              className={s.inputAdd}
              maxLength={120}
              autoFocus={true}
              placeholder="Input title of new board"
              type="text"
            />
            <button type="submit" className={s.createBtn}>
              create
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default BoardCreater;
