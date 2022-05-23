import { ITask } from 'interfaces';
import Task from '../Task';
import styles from './tasks.module.scss';

interface IProps {
  tasks: ITask[];
  columnId: string;
  columnIdx: number;
}

const Tasks = ({ tasks, columnId, columnIdx }: IProps) => (
  <div className={styles.list}>
    {tasks.map((task: ITask, taskIdx: number) => (
      <Task key={task.id} task={task} columnId={columnId} columnIdx={columnIdx} taskIdx={taskIdx} />
    ))}
  </div>
);

export default Tasks;
