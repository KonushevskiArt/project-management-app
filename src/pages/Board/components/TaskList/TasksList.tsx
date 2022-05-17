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

const TaskList = ({ tasks = [], columnId }: IProps) => {
  const { boardId = '' } = useParams();
  // const [{ columnId }] = tasks;

  const { error, data } = useQuery({
    queryKey: pathRoutes.task.relative(boardId, columnId),
    queryFn: () => TaskService.getAll(boardId, columnId),
  });

  if (error || !data) return <div>{`No data :(`}</div>;
  return (
    <ul className={styles.list}>
      {data.map((task: ITask) => (
        <Task task={task} key={task.id} />
      ))}
    </ul>
  );
};

export default TaskList;
