import CreatCard from 'components/CreatTask';
import { IColumn } from 'interfaces';
import mockApi from 'MockApi';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import Tasks from '../../Tasks';

import styles from './column.module.scss';

interface IProps {
  column: IColumn;
}

const Column = ({ column }: IProps) => {
  const { boardId = '', columnId = column.id } = useParams();
  const { isLoading, error, data, isSuccess } = useQuery(
    ['columns', boardId, columnId],
    () => {
      try {
        return mockApi.getColumnById({ columnId, boardId }).then((res) => res);
      } catch (error) {
        throw Error('!!!');
      }
    },
    {
      initialData: column,
      retry: false,
    }
  );
  if (error) return <div>No data</div>;
  return (
    <div className={styles.body}>
      {data?.title}
      <Tasks tasks={column.tasks} columnId={column.id} />
      <CreatCard columnId={column.id} />
    </div>
  );
};

export default Column;
