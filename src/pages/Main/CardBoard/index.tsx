import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { pathRoutes } from 'utils/pathRoutes';
import s from './style.module.scss';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

interface IProps {
  id: string;
  title: string;
}

const CardBoard = ({ id, title }: IProps) => {
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuClasses = isOpenMenu ? `${s.options} ${s.menuActive}` : s.options;

  return (
    <div className={s.card}>
      {!isEdit && <h3 className={s.title}>{title}</h3>}
      {isEdit && <input className={s.editTitle} type="text" />}
      <button onClick={() => setIsOpenMenu(!isOpenMenu)} className={s.removeBtn}>
        <MenuIcon fontSize="medium" />
      </button>
      <div className={menuClasses}>
        <ul className={s.list}>
          <li className={s.listItem}>remove</li>
        </ul>
      </div>
      <Link className={s.link} to={`${pathRoutes.board.relative}/${id}`}>
        Move to board
      </Link>
    </div>
  );
};

export default CardBoard;
