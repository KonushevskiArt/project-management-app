import TaskContentHeader from './TaskContentHeader';
import TaskContentSidebar from './TaskContentSidebar';
import TaskContentDescription from './TaskContentDescription';
import styles from './styles.module.scss';
import NotFound from 'pages/NotFound';
import Modal from 'components/Modal';
import { useNavigate, useParams } from 'react-router';
import { useQueryClient } from 'react-query';
import { pathRoutes } from 'utils/pathRoutes';
import { IBoard } from 'interfaces';

const TaskContent = () => {
  const { boardId = '', columnId = '', taskId = '' } = useParams();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const board: IBoard | undefined = queryClient.getQueryData(
    pathRoutes.board.getOneById.absolute(boardId)
  );

  const column = board?.columns?.find(({ id }) => id === columnId);

  const task = column?.tasks?.find(({ id }) => id === taskId);

  const onCloseClick = () => navigate(`/boards/${boardId}`);

  if (!task) return <NotFound />;
  return (
    <Modal handleClickOutside={onCloseClick}>
      <div className={`${styles.wrapper} ${styles.open}`}>
        <TaskContentHeader columnTitle={column?.title} task={task} onCloseClick={onCloseClick} />
        <div className={styles.main}>
          <div className={styles.body}>
            <TaskContentDescription task={task} />
          </div>
          <TaskContentSidebar />
        </div>
      </div>
    </Modal>
  );
};

export default TaskContent;
