import TaskContentHeader from './TaskContentHeader';
import TaskContentSidebar from './TaskContentSidebar';
import TaskContentDescription from './TaskContentDescription';
import TaskContentActivity from './TaskContentActivity';

import styles from './task-content.module.scss';
import { IColumn, ITask } from 'interfaces';
import NotFound from 'pages/NotFound';
import Modal from 'components/Modal';
import { useNavigate, useParams } from 'react-router';
import { QueryClient, useQuery } from 'react-query';
import mockApi from 'MockApi';

interface IProps {
  card?: ITask;
  columnTitle?: string;
}

const queryClient = new QueryClient();

const TaskContent = ({ card, columnTitle }: IProps) => {
  const { boardId = '', columnId = '', taskId } = useParams();

  const { data: column } = useQuery(
    ['columns', boardId, columnId],
    () => {
      try {
        return mockApi.getColumnById({ columnId, boardId }).then((res) => res);
      } catch (error) {
        throw Error('!!!');
      }
    },
    {
      initialData: () => queryClient.getQueryData(['columns', boardId, columnId]),
    }
  );

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
