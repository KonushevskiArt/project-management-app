import React from 'react';
import { useLocation } from 'react-router';
import { IBoard } from 'utils/services/models';
import ListOfColumns from './components/ListOfColumns';
import s from './style.module.scss';

interface LocationState {
  data: IBoard;
  lastColumnOrder: number;
}

const Board: React.FC = () => {
  const location = useLocation();
  const {
    data: { columns, id },
  } = location.state as LocationState;

  return (
    <div className={s.container}>
      <div className={s.board}>
        <ListOfColumns columns={columns} boardId={id} />
      </div>
    </div>
  );
};

export default Board;
