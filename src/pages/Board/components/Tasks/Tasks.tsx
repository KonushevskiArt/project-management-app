import { ITask } from 'interfaces';
import Task from '../Task';
import styles from './tasks.module.scss';

interface IProps {
  tasks: ITask[];
  columnId: string;
  columnIdx: number;
}

const Tasks = ({ tasks, columnId, columnIdx }: IProps) => {
  return (
    <div className={styles.list}>
      {tasks
        .sort((task1, task2) => task1.order - task2.order)
        .map((task: ITask, taskIdx: number) => (
          <Task
            key={columnId + taskIdx}
            task={task}
            columnId={columnId}
            columnIdx={columnIdx}
            taskIdx={taskIdx}
          />
        ))}
    </div>
  );
};

export default Tasks;
