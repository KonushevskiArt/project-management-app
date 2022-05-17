import React from 'react';
import { Link } from 'react-router-dom';
import { pathRoutes } from 'utils/pathRoutes';
import s from './style.module.scss';
interface IProps {
  id: string;
  title: string;
}

const CardBoard = ({ id, title }: IProps) => {
  return (
    <div className={s.card}>
      <h3 className={s.title}>{title}</h3>
      <p>Edit title</p>
      <button>Remove board</button>
      <Link to={`${pathRoutes.board.relative}/${id}`}>mvoe to board</Link>
    </div>
  );
};

export default CardBoard;
