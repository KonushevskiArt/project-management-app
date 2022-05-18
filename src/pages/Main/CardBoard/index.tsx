import React, { useState } from 'react';
import { Link } from 'react-router-dom';
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
import { useGetBoardById } from 'hooks/boards/useGetBoardById';

interface IProps {
  id: string;
  title: string;
}
type Inputs = {
  title: string;
};

const CardBoard = ({ id }: IProps) => {
  const [isEdit, setIsEdit] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  let cashedTitle = '';
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuClasses = isOpenMenu ? `${s.options} ${s.menuActive}` : s.options;
  const { register, handleSubmit, getValues } = useForm<Inputs>();
  const { mutate: updateMutate, isLoading: isUpdateLoading } = useUpdateBoardById(
    id as string,
    setIsEdit
  );
  const { mutate: deleteMutate, isLoading: isDeleteLoading } = useDeleteBoardById(id as string);
  const { isLoading: isFetchLoading, error: fetchError, data } = useGetBoardById(id as string);
  const ref = useOnclickOutside(() => setIsOpenMenu(false));

  if (data?.title) {
    cashedTitle = data.title;
  }

  const isLoading = isUpdateLoading || isDeleteLoading || isFetchLoading;

  const submitHandler: SubmitHandler<Inputs> = (data) => {
    if (data.title.trim() && !isLoading && data.title !== cashedTitle) {
      updateMutate(data.title);
    } else {
      setIsEdit(false);
    }
  };

  const deleteHandler = () => {
    if (!isDeleteLoading) {
      deleteMutate();
    }
  };

  const editHandler = () => setIsEdit(true);

  return (
    <div className={s.card}>
      <>
        <form onSubmit={handleSubmit(submitHandler)}>
          {!isEdit && <h3 className={s.title}>{data?.title || 'unknown'}</h3>}
          {isEdit && (
            <input
              {...register('title')}
              autoFocus
              onBlur={() => submitHandler(getValues())}
              defaultValue={data?.title}
              maxLength={120}
              className={s.editTitle}
              type="text"
            />
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
        <div ref={ref} className={menuClasses}>
          <ul className={s.list}>
            <li className={s.listItem}>
              <button onClick={deleteHandler} className={s.listItemBtn}>
                <DeleteIcon />
              </button>
            </li>
            <li className={s.listItem}>
              <button onClick={editHandler} className={s.listItemBtn}>
                <EditIcon />
              </button>
            </li>
          </ul>
        </div>
        <Link className={s.link} to={`${pathRoutes.board.relative}/${id}`}>
          <LinkIcon />
          <span>Move to board</span>
        </Link>
        {isLoading ? (
          <CircularProgress sx={{ mt: '15px', color: `var(--text-color-white)` }} size={25} />
        ) : null}
        {fetchError && <p className={s.error}>Network error...</p>}
      </>
    </div>
  );
};

export default CardBoard;
