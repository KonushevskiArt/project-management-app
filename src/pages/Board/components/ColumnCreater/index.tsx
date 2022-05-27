import React, { useState } from 'react';
import s from './style.module.scss';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import useOnclickOutside from 'react-cool-onclickoutside';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import CircularProgress from '@mui/material/CircularProgress';
import { useCreateColumn } from 'hooks/columns/useCreateColumn';
import { useLanguage } from 'hooks/useLanguage';

type Inputs = {
  name: string;
};

interface ILANG {
  [key: string]: string;
}

interface ITEXT {
  [key: string]: ILANG;
}

const TEXT_PAGE: Readonly<ITEXT> = {
  button: {
    en: 'Add another list',
    ru: 'Добавить новый список',
  },
  placeholder: {
    en: 'List title...',
    ru: 'Название списка',
  },
  hidedButton: {
    en: 'Add list',
    ru: 'Добавить список',
  },
};

const ColumnCreater = () => {
  const { boardId } = useParams();
  const lang = useLanguage();

  const [isAddingColumn, setIsAddingColumn] = useState(false);
  const { register, handleSubmit, reset } = useForm<Inputs>();

  const { mutate, isLoading } = useCreateColumn(boardId as string, setIsAddingColumn);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    if (data.name.trim() && isLoading === false) {
      mutate({ title: data.name });
      reset();
    }
  };

  const ref = useOnclickOutside(() => setIsAddingColumn(false));

  const clickTriggerHandler = () => setIsAddingColumn(true);

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
              <span>{TEXT_PAGE.button[lang]}</span>
            </button>
          ) : (
            <input
              {...register('name')}
              autoFocus
              maxLength={120}
              placeholder={TEXT_PAGE.placeholder[lang]}
              className={s.textInput}
            ></input>
          )}
          <div className={s.bottomButtonsWrapper}>
            <div className={s.bottomButtonsLeftWrapper}>
              <button disabled={isLoading} type="submit" className={s.fillButton}>
                {isLoading ? (
                  <CircularProgress size={20} sx={{ color: 'var(--text-color-white)' }} />
                ) : (
                  <>{TEXT_PAGE.hidedButton[lang]}</>
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
