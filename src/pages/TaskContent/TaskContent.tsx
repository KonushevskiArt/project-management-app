import TaskContentHeader from './TaskContentHeader';
import TaskContentSidebar from './TaskContentSidebar';
import TaskContentDescription from './TaskContentDescription';
import TaskContentActivity from './TaskContentActivity';
import styles from './task-content.module.scss';
import NotFound from 'pages/NotFound';
import Modal from 'components/Modal';
import { useNavigate, useParams } from 'react-router';
import { QueryClient, useQuery, useQueryClient } from 'react-query';

import { pathRoutes } from 'utils/pathRoutes';
import { ColumnService } from 'utils/services/Column.service';
import { ITask } from 'interfaces';
import { routes } from 'utils/routes';

const TaskContent = () => {
  const { boardId = '', columnId = '', taskId = '' } = useParams();

  const { getQueryData } = useQueryClient();

  const { data: column } = useQuery({
    queryKey: routes.columns.absolute(boardId, columnId),
    queryFn: () => ColumnService.getOneById(boardId, columnId),
    initialData: () => getQueryData(routes.columns.absolute(boardId, columnId)),
  });

  const task: ITask | undefined = column?.tasks?.find(({ id }: { id: string }) => id === taskId);

  const navigate = useNavigate();
  const onCloseClick = () => navigate(`/boards/${boardId}`);

  if (!task) return <NotFound />;
  return (
    <Modal handleClickOutside={onCloseClick}>
      <div className={`${styles.wrapper} ${styles.open}`}>
        <TaskContentHeader
          columnTitle={column?.title}
          title={task.title}
          onCloseClick={onCloseClick}
        />
        <div className={styles.main}>
          <div className={styles.body}>
            <TaskContentDescription description={task.description} />
            <TaskContentActivity />
          </div>
          <TaskContentSidebar />
        </div>
      </div>
    </Modal>
  );
};

export default TaskContent;
