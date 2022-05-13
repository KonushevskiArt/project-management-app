import React from 'react';
import MockCardBox from '../MockCardBox';
import s from './style.module.scss';
import ColumnCreater from '../ColumnCreater';
import { BoardCtx } from 'pages/Board';

const idMyBoard = 'c9a87cc2-d708-4098-9668-818d259eee93';

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
