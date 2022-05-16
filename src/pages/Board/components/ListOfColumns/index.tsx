import React from 'react';
import s from './style.module.scss';
import ColumnCreater from '../ColumnCreater';
import { useQuery } from 'react-query';
import { pathRoutes } from 'utils/pathRoutes';
import { ColumnService } from 'utils/services/Column.service';
import { IColumn } from 'interfaces';
import Column from 'pages/Board/components/Column';

interface IProps {
  columns: IColumn[];
  boardId: string;
}

const ListOfColumns = ({ columns, boardId }: IProps) => {
  // const { error, data } = useQuery(
  //   pathRoutes.column.getAll.absolute(boardId),
  //   () => ColumnService.getAll(boardId),
  //   {
  //     initialData: () => columns,
  //   }
  // );
  const lastColumnOrder = columns.length > 0 ? columns[columns.length - 1].order : 1;

  // if (error || !data) return <div>{`No data :(`}</div>;

  return (
    <ul className={s.columnList}>
      {columns.map((column) => (
        <li key={column.title + Math.random()}>
          <Column column={column} />
        </li>
      ))}
      <ColumnCreater lastColumnOrder={lastColumnOrder} />
    </ul>
  );
};

export default ListOfColumns;
