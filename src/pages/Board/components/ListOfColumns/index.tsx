import React from 'react';
import MockCardBox from '../MockCardBox';
import s from './style.module.scss';
import ColumnCreater from '../ColumnCreater';
import { BoardCtx } from 'pages/Board';

const ListOfColumns = () => {
  const { columns } = React.useContext(BoardCtx);

  return (
    <ul className={s.columnList}>
      {columns.map(({ title, tasks, id }) => (
        <li key={title + Math.random()}>
          <MockCardBox id={id} name={title} tasks={tasks} />
        </li>
      ))}
      <ColumnCreater />
    </ul>
  );
};

export default ListOfColumns;
