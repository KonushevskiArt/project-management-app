import { getAllTasks } from 'api';
import { ITask } from 'interfaces';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import Task from './Task';
import styles from './tasks.module.scss';

interface IProps {
  tasks: ITask[];
}

const Tasks = ({ tasks }: IProps) => {
  const { boardId = '' } = useParams();
  const [{ columnId }] = tasks;

  const { error, data } = useQuery({
    queryKey: pathRoutes.tasks.relative(boardId, columnId),
    queryFn: () => getAllTasks({ columnId, boardId }),
    initialData: () => tasks,
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

export default Tasks;
