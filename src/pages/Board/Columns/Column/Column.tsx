import { getColumnById } from 'api';
import CreatTask from 'components/CreatTask';
import { IColumn } from 'interfaces';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import Tasks from '../../Tasks';

import styles from './column.module.scss';

interface IProps {
  column: IColumn;
}

const Column = ({ column }: IProps) => {
  const { boardId = '', columnId = column.id } = useParams();

  const { error, data } = useQuery({
    queryKey: pathRoutes.columns.getOneById.absolute(boardId, columnId),
    queryFn: () => getColumnById({ columnId, boardId }),
    initialData: () => column,
  });

  if (error || !data) return <div>{`No data :(`}</div>;
  return (
    <div className={styles.body}>
      {data.title}
      <Tasks tasks={column.tasks} />
      <CreatTask columnId={column.id} />
    </div>
  );
};

export default Column;
