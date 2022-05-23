import CreatTask from 'pages/Board/components/CreatTask';
import { useQuery } from 'react-query';
import { pathRoutes } from 'utils/pathRoutes';
import { ColumnService } from 'utils/services/Column.service';
import styles from './column.module.scss';
import { IColumn } from 'interfaces';
import Tasks from '../../Tasks';
import ColumnHeader from './ColumnHeader';

interface IProps {
  column: IColumn;
  boardId: string;
}
const Column = ({ column: initialColumn, boardId }: IProps) => {
  const { error, data: column } = useQuery({
    queryKey: pathRoutes.columns.getOneById.absolute(boardId, initialColumn.id),
    queryFn: () => ColumnService.getOneById(boardId, initialColumn.id),
    initialData: () => initialColumn,
  });

  if (error || !column) return <div>{`No data :(`}</div>;

  return (
    <div className={styles.body}>
      <ColumnHeader title={column.title} columnId={column.id} boardId={boardId} />
      {column?.tasks && <Tasks columnId={column.id} tasks={column.tasks} />}
      <CreatTask columnId={column.id} />
    </div>
  );
};

export default Column;
