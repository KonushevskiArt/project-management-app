import React from 'react';
import MockCardBox from '../MockCardBox';
import s from './style.module.scss';
import ColumnCreater from '../ColumnCreater';

interface ITask {
  name: string;
  description?: string;
}

interface IColumn {
  name: string;
  tasks: ITask[];
}

interface IProps {
  columns?: IColumn[];
}

const ListOfColumns = ({ columns = [] }: IProps) => {
  return (
    <ul className={s.columnList}>
      {columns.map(({ name, tasks }) => (
        <li key={name + Math.random()}>
          <MockCardBox name={name} tasks={tasks} />
        </li>
      ))}
      <ColumnCreater />
    </ul>
  );
};

export default ListOfColumns;
