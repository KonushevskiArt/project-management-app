import CreatTask from 'pages/Board/components/CreatTask';
import { useDeleteColumnById } from 'hooks/columns/useDeleteColumnById';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import { ColumnService } from 'utils/services/Column.service';
import Tasks from '../TaskList';

import styles from './column.module.scss';
import { IColumn } from 'interfaces';

interface IProps {
  column: IColumn;
}

const Column = ({ column }: IProps) => {
  const { boardId = '', columnId = column.id } = useParams();
  // console.log(boardId, columnId, column.id);

  // const { error, data } = useQuery({
  //   queryKey: pathRoutes.column.getOneById.absolute(boardId, columnId),
  //   queryFn: () => ColumnService.getOneById(boardId, columnId),
  //   initialData: () => column,
  // });

  const { mutate, isLoading } = useDeleteColumnById(boardId, column.id);

  const removeColumnHandler = () => mutate();

  // if (error || !data) return <div>{`No data :(`}</div>;
  return (
    <div className={styles.body}>
      {column.title}
      {/* <Tasks tasks={column.tasks} columnId={columnId} /> */}
      {/* <CreatTask columnId={column.id} /> */}
      <button onClick={removeColumnHandler}>remove column</button>
    </div>
  );
};

export default Column;
