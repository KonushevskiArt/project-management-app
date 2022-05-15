import TaskContentHeader from './TaskContentHeader';
import TaskContentSidebar from './TaskContentSidebar';
import TaskContentDescription from './TaskContentDescription';
import TaskContentActivity from './TaskContentActivity';
import styles from './task-content.module.scss';
import NotFound from 'pages/NotFound';
import Modal from 'components/Modal';
import { useNavigate, useParams } from 'react-router';
import { QueryClient, useQuery, useQueryClient } from 'react-query';

import { getColumnById } from 'api';
import { pathRoutes } from 'utils/pathRoutes';

const TaskContent = () => {
  const { boardId = '', columnId = '', taskId = '' } = useParams();

  const { getQueryData } = useQueryClient();
  console.log(taskId);
  const { data: column } = useQuery({
    queryKey: pathRoutes.columns.getOneById.absolute(boardId, columnId),
    queryFn: () => getColumnById({ columnId, boardId }),
    initialData: () => getQueryData(['columns', boardId, columnId]),
  });

  const card = column?.tasks.find(({ id }) => id === taskId);

  const navigate = useNavigate();
  const onCloseClick = () => navigate(`/boards/${card?.boardId}`);

  if (!card) return <NotFound />;
  return (
    <Modal handleClickOutside={onCloseClick}>
      <div className={`${styles.wrapper} ${styles.open}`}>
        <TaskContentHeader
          columnTitle={column?.title}
          title={card.title}
          onCloseClick={onCloseClick}
        />
        <div className={styles.main}>
          <div className={styles.body}>
            <TaskContentDescription description={card.description} />
            <TaskContentActivity />
          </div>
          <TaskContentSidebar />
        </div>
      </div>
    </Modal>
  );
};

export default TaskContent;
