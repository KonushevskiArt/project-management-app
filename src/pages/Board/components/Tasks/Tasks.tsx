import { ITask } from 'interfaces';
import Task from './Task';
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
