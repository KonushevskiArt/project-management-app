import { ITask } from 'interfaces';
import { Link } from 'react-router-dom';
import styles from './task.module.scss';

interface IProps {
  task: ITask;
}

const Task = ({ task }: IProps) => (
  <li className={styles.card}>
    <Link className={styles.link} to={`columns/${task.columnId}/tasks/${task.id}/content`}>
      {task.title}
    </Link>
  </li>
);

export default Task;
