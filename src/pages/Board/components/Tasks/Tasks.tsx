import { ITask } from 'interfaces';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import { TaskService } from 'utils/services/Task.service';
import Task from '../Task';
import styles from './tasks.module.scss';

interface IProps {
  tasks: ITask[];
  columnId: string;
}

const Tasks = ({ tasks, columnId }: IProps) => (
  <ul className={styles.list}>
    {tasks.map((task: ITask) => (
      <Task key={task.id} task={task} columnId={columnId} />
    ))}
  </ul>
);

export default Tasks;
