import React, { useContext, useEffect, useState } from 'react';
import s from './style.module.scss';
import AddIcon from '@mui/icons-material/Add';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useCreateBoard } from 'hooks/boards/useCraeteBoard';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useLanguage } from 'hooks/useLanguage';
import { AppContext } from 'App/context';

type Inputs = {
  title: string;
};

interface ILANG {
  [key: string]: string;
}

interface ITEXT {
  [key: string]: ILANG;
}

const TEXT_PAGE: Readonly<ITEXT> = {
  createButton: {
    en: 'create',
    ru: 'создать',
  },
  inputPlaceholder: {
    en: 'Title of new board',
    ru: 'Имя доски задач',
  },
  textAreaPlaceholder: {
    en: 'Description of new board',
    ru: 'Описание доски задач',
  },
};

const BoardCreater = () => {
  const { isCreatingNewBoard, setCreatingNewBoard } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(isCreatingNewBoard);
  useEffect(() => {
    setIsOpen(isCreatingNewBoard);
  }, [isCreatingNewBoard]);
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const wrapperClasses = isOpen ? `${s.wrapper} ${s.wrapperActive}` : s.wrapper;
  const boardCreater = isOpen ? `${s.boardCreater} ${s.boardCreaterActive}` : s.boardCreater;
  const { mutate, isLoading } = useCreateBoard();
  const ref = useOnclickOutside(() => {
    setCreatingNewBoard(false);
    setIsOpen(false);
  });

  const lang = useLanguage();

  const submitHandler: SubmitHandler<Inputs> = (data) => {
    if (data.title.trim() && isLoading === false) {
      mutate({ title: data.title, description: 'null' });
      setIsOpen(false);
      setCreatingNewBoard(false);
      reset();
    }
  };

  return (
    <li className={boardCreater}>
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
              placeholder={TEXT_PAGE.inputPlaceholder[lang]}
              type="text"
            />
            <textarea
              {...register('title')}
              className={s.textAreaAdd}
              maxLength={240}
              placeholder={TEXT_PAGE.textAreaPlaceholder[lang]}
            />
            <button type="submit" className={s.createBtn}>
              {TEXT_PAGE.createButton[lang]}
            </button>
          </form>
        )}
      </div>
    </li>
  );
};

export default BoardCreater;
