import CreatTask from 'pages/Board/components/CreatTask';
import { useQuery } from 'react-query';
import { ColumnService } from 'utils/services/Column.service';
import styles from './column.module.scss';
import { DragItem, IColumn, IDragItemParams } from 'interfaces';
import Tasks from '../../Tasks';
import ColumnHeader from './ColumnHeader';
import { routes } from 'utils/routes';
import { useContext } from 'react';
import { BoardContext } from 'pages/Board/Board';
import { useUpdateColumnById } from 'hooks/columns/useUpdateColumnById';

interface IProps {
  column: IColumn;
  boardId: string;
  columnIdx: number;
}
const Column = ({ column, boardId, columnIdx }: IProps) => {
  const {
    board,
    oldColumns,
    dragging,
    setDragging,
    dragItem,
    dragNode,
    setColumns,
    setOldColumns,
    setTypeDragItem,
    typeDragItem,
    setIdxOfDragColumn,
  } = useContext(BoardContext);
  const { mutate } = useUpdateColumnById(board.id, column.id, setColumns, oldColumns);

  const { error } = useQuery({
    queryKey: routes.columns.absolute(boardId, column.id),
    queryFn: () => ColumnService.getOneById(boardId, column.id),
    initialData: () => column,
  });

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, params: IDragItemParams) => {
    // e.stopPropagation();
    dragItem.current = params;
    dragNode.current = e.target as HTMLDivElement;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    setIdxOfDragColumn(columnIdx);
    setOldColumns(board.columns || []);
    setTypeDragItem(DragItem.column);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnd = () => {
    setDragging(false);
    if (dragNode.current) {
      const currentNode = dragNode.current as HTMLDivElement;
      currentNode.removeEventListener('dragend', handleDragEnd);
      if (board.columns && dragItem.current) {
        const updatedColumn = {
          title: column.title,
          order: dragItem.current.columnIdx + 1,
        };
        mutate(updatedColumn);
      }
      dragItem.current = undefined;
      dragNode.current = undefined;
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, params: IDragItemParams) => {
    e.stopPropagation();
    if (dragging && column.tasks && !column.tasks.length && typeDragItem === DragItem.task) {
      if (e.target !== dragNode.current) {
        const currentItem = dragItem.current as IDragItemParams;
        setColumns((prevList) => {
          const newList = JSON.parse(JSON.stringify(prevList));
          const currentTask = newList[currentItem?.columnIdx].tasks.splice(
            currentItem.taskIdx,
            1
          )[0];
          newList[params.columnIdx].tasks.splice(params.taskIdx - 1, 0, currentTask);
          dragItem.current = params;
          return newList;
        });
      }
    } else {
      if (typeDragItem === DragItem.column) {
        const currentItem = dragItem.current as IDragItemParams;
        if (e.target !== dragNode.current) {
          setColumns((prevList) => {
            const newList = JSON.parse(JSON.stringify(prevList)) as IColumn[];
            const currentColumn = newList.splice(currentItem.columnIdx, 1)[0];
            newList.splice(params.columnIdx, 0, currentColumn);
            dragItem.current = params;
            return newList;
          });
        }
      }
    }
  };

  if (error || !column) return <div>{`No data :(`}</div>;

  const taskClasses =
    dragging && dragItem.current?.columnIdx === columnIdx && typeDragItem === DragItem.column
      ? `${styles.column} ${styles.dragging}`
      : styles.column;

  return (
    <div
      draggable={true}
      onDragEnd={() => handleDragEnd()}
      onDragEnter={(e) => handleDragEnter(e, { columnIdx, taskIdx: 0 })}
      onDragStart={(e) => handleDragStart(e, { columnIdx, taskIdx: 0 })}
      className={taskClasses}
    >
      <div className={styles.wrapper}>
        <ColumnHeader title={column.title} columnId={column.id} boardId={boardId} />
        {column.tasks && column.tasks.length && (
          <Tasks columnId={column.id} tasks={column.tasks} columnIdx={columnIdx} />
        )}
        <CreatTask columnId={column.id} />
      </div>
    </div>
  );
};

export default Column;
