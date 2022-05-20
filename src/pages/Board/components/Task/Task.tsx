import { ITask } from 'interfaces';
import { Link } from 'react-router-dom';
import { routes } from 'utils/routes';
import styles from './task.module.scss';

interface IProps {
  task: ITask;
  columnId: string;
}
const Task = ({ task, columnId }: IProps) => (
  <li className={styles.task}>
    <Link className={styles.link} to={routes.tasks.content.absolute(columnId, task.id)}>
      {task.title}
    </Link>
  </li>
);

export default Task;
