import CreatTask from 'pages/Board/components/CreatTask';
import { useQuery } from 'react-query';
import { ColumnService } from 'utils/services/Column.service';
import styles from './column.module.scss';
import { IColumn } from 'interfaces';
import Tasks from '../../Tasks';
import ColumnHeader from './ColumnHeader';
import { routes } from 'utils/routes';
import { useContext } from 'react';
import { BoardContext } from 'pages/Board/Board';
import { HandleDragEnterOfColumn } from 'utils/dragndrop/handleDragEnterOfColumn';

interface IProps {
  column: IColumn;
  boardId: string;
  columnIdx: number;
}
const Column = ({ column, boardId, columnIdx }: IProps) => {
  const { dragging, dragItem, dragNode, setColumns } = useContext(BoardContext);

  const { error } = useQuery({
    queryKey: routes.columns.absolute(boardId, column.id),
    queryFn: () => ColumnService.getOneById(boardId, column.id),
    initialData: () => column,
  });

  if (error || !column) return <div>{`No data :(`}</div>;

  return (
    <div
      onDragEnter={
        dragging && column.tasks && !column.tasks.length
          ? (e) => {
              HandleDragEnterOfColumn(e, { columnIdx, taskIdx: 0 }, dragItem, dragNode, setColumns);
            }
          : undefined
      }
      className={styles.body}
    >
      <ColumnHeader title={column.title} columnId={column.id} boardId={boardId} />
      {column.tasks && <Tasks columnId={column.id} tasks={column.tasks} columnIdx={columnIdx} />}
      <CreatTask columnId={column.id} />
    </div>
  );
};

export default Column;
