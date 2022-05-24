import TaskContentHeader from './TaskContentHeader';
import TaskContentSidebar from './TaskContentSidebar';
import TaskContentDescription from './TaskContentDescription';
import TaskContentActivity from './TaskContentActivity';
import styles from './task-content.module.scss';
import NotFound from 'pages/NotFound';
import Modal from 'components/Modal';
import { useNavigate, useParams } from 'react-router';
import { useQueryClient } from 'react-query';
import { pathRoutes } from 'utils/pathRoutes';
import { IColumn, ITask } from 'interfaces';

const TaskContent = () => {
  const { boardId = '', columnId = '', taskId = '' } = useParams();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const column: IColumn | undefined = queryClient.getQueryData(
    pathRoutes.columns.getOneById.absolute(boardId, columnId)
  );

  const task: ITask | undefined = queryClient.getQueryData(
    pathRoutes.task.getOneById.absolute(boardId, columnId, taskId)
  );

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
          </div>
          <TaskContentSidebar />
        </div>
      </div>
    </Modal>
  );
};

export default TaskContent;
