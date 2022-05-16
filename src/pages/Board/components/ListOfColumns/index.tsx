import React from 'react';
import MockCardBox from '../MockCardBox';
import s from './style.module.scss';
import ColumnCreater from '../ColumnCreater';
import { useQuery } from 'react-query';
import { pathRoutes } from 'utils/pathRoutes';
import { ColumnService } from 'utils/services/Column.service';
import { IColumn } from 'utils/services/models';

interface IProps {
  columns: IColumn[];
  boardId: string;
}

const ListOfColumns = ({ columns, boardId }: IProps) => {
  const { error, data } = useQuery(
    pathRoutes.column.getAll.absolute(boardId),
    () => ColumnService.getAll(boardId),
    {
      initialData: () => columns,
    }
  );

  if (error || !data) return <div>{`No data :(`}</div>;

  return (
    <ul className={s.columnList}>
      {data.map(({ title, tasks, id }) => (
        <li key={title + Math.random()}>
          <MockCardBox id={id} name={title} tasks={tasks} />
        </li>
      ))}
      <ColumnCreater />
    </ul>
  );
};

export default ListOfColumns;
