import React from 'react';
import CardBox from './components/CardBox';
import s from './style.module.scss';

const Board = () => {
  return (
    <div className={s.board}>
      <p style={{ marginBottom: '20px' }}>First board</p>
      <CardBox />
    </div>
  );
};

export default Board;
