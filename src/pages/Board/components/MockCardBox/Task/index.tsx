import React from 'react';
import s from './style.module.scss';

interface IProps {
  name: string;
}

const Task = ({ name = 'task name' }: IProps) => {
  return <p className={s.task}>{name}</p>;
};

export default Task;
