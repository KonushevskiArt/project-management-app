import React, { useState } from 'react';
import ColumnBottom from './ColumnBottom';
import ColumnTop from './ColumnTop';
import s from './style.module.scss';
import Task from './Task';

interface ITask {
  name: string;
  description?: string;
}

interface IProps {
  name?: string;
  tasks?: ITask[];
}

const CardBox = ({ name = 'some name', tasks = [] }: IProps) => {
  const [isEditName, setIsEditName] = useState(false);

  return (
    <div className={s.cardBox}>
      <ColumnTop name={name} />
      {tasks.map((card) => (
        <Task key={card.name + Math.random()} name={card.name} />
      ))}
      <ColumnBottom />
    </div>
  );
};

export default CardBox;
