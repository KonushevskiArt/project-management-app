import React from 'react';
import s from './style.module.scss';
import ColumnCreater from '../ColumnCreater';
import { IColumn } from 'interfaces';
import Column from '../Columns/Column';

interface IProps {
  columns: IColumn[];
  boardId: string;
}

const ListOfColumns = ({ columns, boardId }: IProps) => {
  const lastColumnOrder = columns.length > 0 ? columns[columns.length - 1].order : 1;

  return (
    <ul className={s.columnList}>
      {columns.map((column) => (
        <li key={column.title + Math.random()}>
          <Column column={column} boardId={boardId} />
        </li>
      ))}
      <li>
        <ColumnCreater lastColumnOrder={lastColumnOrder} />
      </li>
    </ul>
  );
};

export default ListOfColumns;
