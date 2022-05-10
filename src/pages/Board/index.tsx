import React from 'react';
import ListOfColumns from './components/ListOfColumns';
import s from './style.module.scss';

const mockColumns = [
  {
    name: 'First',
    tasks: [{ name: 'first-task' }, { name: 'Second-task' }, { name: 'Third-task' }],
  },
  // { name: 'Second', tasks: [{ name: 'Forth-task' }, { name: 'Firth-task' }] },
  // { name: 'Second', tasks: [{ name: 'Forth-task' }, { name: 'Firth-task' }] },
  // { name: 'Second', tasks: [{ name: 'Forth-task' }, { name: 'Firth-task' }] },
];

const Board = () => {
  return (
    <div className={s.container}>
      <div className={s.board}>
        <p style={{ marginBottom: '20px' }}>First board</p>
        <ListOfColumns columns={mockColumns} />
      </div>
    </div>
  );
};

export default Board;
