import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { pathRoutes } from 'utils/pathRoutes';
import s from './style.module.scss';
import MenuIcon from '@mui/icons-material/Menu';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import LinkIcon from '@mui/icons-material/Link';
import CloseIcon from '@mui/icons-material/Close';
import useOnclickOutside from 'react-cool-onclickoutside';
import { SubmitHandler, useForm } from 'react-hook-form';
import CircularProgress from '@mui/material/CircularProgress';
import { useUpdateBoardById } from 'hooks/boards/useUpdateBoard';
import { useDeleteBoardById } from 'hooks/boards/useDeleteBoard';
import { useLanguage } from 'hooks/useLanguage';
import Modal from 'components/Modal';
import ConfirmPopup from 'components/ConfirmPopup';

interface IProps {
  id: string;
  title: string;
  description: string;
}
type Inputs = {
  title: string;
  description: string;
};

interface ILANG {
  [key: string]: string;
}

interface ITEXT {
  [key: string]: ILANG;
}

const TEXT_PAGE: Readonly<ITEXT> = {
  titleDelete: {
    en: 'delete',
    ru: 'удалить',
  },
  titleEdit: {
    en: 'edit',
    ru: 'редактировать',
  },
  link: {
    en: 'move to board',
    ru: 'перейти на доску задач',
  },
  deletePopup: {
    en: 'Do you really want to delete the task board?',
    ru: 'Вы действительно хотите удалить доску задач?',
  },
  btnSave: {
    en: 'save',
    ru: 'сохранить',
  },
};

const CardBoard = ({ id, title, description }: IProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const [currentDescription, setCurrentDescription] = useState(description);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuClasses = isOpenMenu ? `${s.options} ${s.menuActive}` : s.options;
  const { register, handleSubmit, getValues } = useForm<Inputs>();
  const { mutate: updateMutate, isLoading: isUpdateLoading } = useUpdateBoardById(
    id as string,
    setIsEdit,
    setCurrentTitle,
    setCurrentDescription
  );
  const {
    isLoading: isDeleteLoading,
    onDeleteBoard,
    showModal,
    hideModal,
    isShowModalConfirm,
  } = useDeleteBoardById(id as string);

  const ref = useOnclickOutside(() => {
    setIsOpenMenu(false);
    setIsEdit(false);
  });

  const lang = useLanguage();

  const isLoading = isUpdateLoading || isDeleteLoading;

  const submitHandler: SubmitHandler<Inputs> = (data) => {
    if (
      data.title.trim() &&
      !isLoading &&
      (data.title !== currentTitle || data.description !== currentDescription)
    ) {
      console.log(data);
      updateMutate({ title: data.title, description: data.description });
    } else {
      setIsEdit(false);
      setIsOpenMenu(false);
    }
  };

  return (
    <div className={s.card} ref={ref}>
      <>
        <form onSubmit={handleSubmit(submitHandler)}>
          {!isEdit && (
            <>
              <h3 className={s.title}>{currentTitle}</h3>
              <hr className={s.hr} />
              <p className={s.description}>{currentDescription}</p>
            </>
          )}
          {isEdit && (
            <>
              <input
                {...register('title')}
                autoFocus
                defaultValue={currentTitle}
                maxLength={120}
                className={s.editTitle}
                type="text"
              />
              <textarea
                {...register('description')}
                defaultValue={currentDescription}
                maxLength={240}
                className={s.editDescription}
              />
              <div className={s.buttonsWrapper}>
                <button type="submit" className={s.btnSave}>
                  {TEXT_PAGE.btnSave[lang]}
                </button>
                <button onClick={() => setIsEdit(false)} className={s.btnClose}>
                  <CloseIcon fontSize="medium" />
                </button>
              </div>
            </>
          )}
        </form>
        {!isOpenMenu && (
          <button onClick={() => setIsOpenMenu(true)} className={s.removeBtn}>
            <MenuIcon fontSize="medium" />
          </button>
        )}
        {isOpenMenu && (
          <button onClick={() => setIsOpenMenu(false)} className={s.removeBtn}>
            <CloseIcon fontSize="medium" />
          </button>
        )}
        <div className={menuClasses}>
          <ul className={s.list}>
            <li className={s.listItem}>
              <button
                title={TEXT_PAGE.titleDelete[lang]}
                onClick={showModal}
                className={s.listItemBtn}
              >
                <DeleteIcon />
              </button>
            </li>
            <li className={s.listItem}>
              <button
                title={TEXT_PAGE.titleEdit[lang]}
                onClick={() => setIsEdit(true)}
                className={s.listItemBtn}
              >
                <EditIcon />
              </button>
            </li>
          </ul>
        </div>
        <Link className={s.link} to={`${pathRoutes.board.relative}/${id}`}>
          <LinkIcon />
          <span>{TEXT_PAGE.link[lang]}</span>
        </Link>
        {isLoading ? (
          <CircularProgress sx={{ mt: '15px', color: `var(--text-color-white)` }} size={25} />
        ) : null}
      </>
      {isShowModalConfirm && !isDeleteLoading && (
        <Modal handleClickOutside={hideModal}>
          <ConfirmPopup
            title={TEXT_PAGE.deletePopup[lang]}
            onLeftClick={hideModal}
            onRightClick={onDeleteBoard}
          />
        </Modal>
      )}
    </div>
  );
};

export default CardBoard;
