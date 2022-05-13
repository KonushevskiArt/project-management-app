import React, { useState } from 'react';
import { useLocation } from 'react-router';
import { IBoard, IColumn, IResponseNewColumn } from 'utils/services/models';
import ListOfColumns from './components/ListOfColumns';
import s from './style.module.scss';

interface LocationState {
  data: IBoard;
  lastColumnOrder: number;
}

interface BoardContextInterface {
  columns: IColumn[];
  lastColumnOrder: number;
  addColumn: (newColumn: IResponseNewColumn) => void;
  removeColumn: (id: string) => void;
}

export const BoardCtx = React.createContext({} as BoardContextInterface);

const Board: React.FC = () => {
  const location = useLocation();
  const { data, lastColumnOrder } = location.state as LocationState;
  const [columns, setColumns] = useState<IColumn[]>(data.columns);
  const [lastOrder, setLastOrder] = useState(lastColumnOrder);

  const addColumn = (newColumn: IResponseNewColumn) => {
    setColumns((prevState) => [...prevState, { ...newColumn, tasks: [] }]);
    setLastOrder(columns.length > 0 ? columns[columns.length - 1].order : 0);
  };

  const removeColumn = (id: string) => {
    setColumns((prevState) => {
      return prevState.filter((el) => el.id !== id);
    });
    setLastOrder(columns.length > 0 ? columns[columns.length - 1].order : 0);
  };

  const boardContext = {
    columns,
    lastColumnOrder: lastOrder,
    addColumn,
    removeColumn,
  };

  return (
    <div className={s.container}>
      <div className={s.board}>
        <BoardCtx.Provider value={boardContext}>
          <ListOfColumns />
        </BoardCtx.Provider>
      </div>
    </div>
  );
};

export default Board;
