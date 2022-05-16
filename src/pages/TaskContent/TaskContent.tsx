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

const TaskContent = () => {
  const { boardId = '', columnId = '', taskId = '' } = useParams();

  const { getQueryData } = useQueryClient();
  console.log(taskId);
  const { data: column } = useQuery({
    queryKey: pathRoutes.column.getOneById.absolute(boardId, columnId),
    queryFn: () => ColumnService.getOneById(columnId, boardId),
    initialData: () => getQueryData(['columns', boardId, columnId]),
  });
  const navigate = useNavigate();

  const card = column?.tasks.find(({ id }) => id === taskId) as unknown as ITask;
  if (!card) return <NotFound />;

  const onCloseClick = () => navigate(`/boards/${card.boardId}`);

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
