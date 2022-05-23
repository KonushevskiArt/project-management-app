import { ITask } from 'interfaces';
import TaskContent from 'pages/Board/components/TaskContent';
import { useQuery } from 'react-query';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { pathRoutes } from 'utils/pathRoutes';
import { routes } from 'utils/routes';
import { TaskService } from 'utils/services/Task.service';
import styles from './task.module.scss';

interface IProps {
  task: ITask;
  columnId: string;
}
const Task = ({ task: initialTask, columnId }: IProps) => {
  const { boardId = '', taskId } = useParams();
  const { data: task } = useQuery({
    queryKey: pathRoutes.task.getOneById.absolute(boardId, columnId, initialTask.id),
    queryFn: () => TaskService.getOneById(boardId, columnId, initialTask.id),
    initialData: () => initialTask,
  });

  return (
    <li className={styles.task}>
      <Link className={styles.link} to={routes.tasks.content.absolute(columnId, task?.id)}>
        {task?.title}
      </Link>
      <Routes>
        {taskId === task?.id && (
          <Route path={routes.tasks.content.absolute()} element={<TaskContent />} />
        )}
      </Routes>
    </li>
  );
};

export default Task;
