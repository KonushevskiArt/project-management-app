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
    isDragging,
    dragItem,
    dragNode,
    setColumns,
    idDraggingColumn,
    setIsDragging,
    typeDragItem,
  } = useContext(BoardContext);
  const { mutate } = useUpdateColumnById(
    board.id,
    idDraggingColumn.current,
    setColumns,
    oldColumns.current
  );

  const { error } = useQuery({
    queryKey: routes.columns.absolute(boardId, column.id),
    queryFn: () => ColumnService.getOneById(boardId, column.id),
    initialData: () => column,
  });

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, params: IDragItemParams) => {
    // e.stopPropagation();
    dragItem.current = params;
    idDraggingColumn.current = column.id;
    dragNode.current = e.target as HTMLDivElement;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    oldColumns.current = board.columns || [];
    typeDragItem.current = DragItem.column;
    setTimeout(() => {
      setIsDragging(true);
    }, 0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (dragNode.current) {
      const currentNode = dragNode.current as HTMLDivElement;
      currentNode.removeEventListener('dragend', handleDragEnd);
      if (board.columns && dragItem.current) {
        const updatedColumn = {
          title: column.title,
          order: board.columns[dragItem.current.columnIdx].order,
        };
        mutate(updatedColumn);
      }
      dragItem.current = null;
      dragNode.current = null;
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, params: IDragItemParams) => {
    e.stopPropagation();
    if (
      isDragging &&
      column.tasks &&
      !column.tasks.length &&
      typeDragItem.current === DragItem.task
    ) {
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
      if (typeDragItem.current === DragItem.column) {
        const currentItem = dragItem.current as IDragItemParams;
        if (e.target !== dragNode.current) {
          setColumns((prevList) => {
            const newList = JSON.parse(JSON.stringify(prevList)) as IColumn[];
            const currentColumn = newList.splice(currentItem.columnIdx, 1)[0];
            if (board.columns && dragItem.current) {
              currentColumn.order = board.columns[dragItem.current.columnIdx].order;
            }
            newList.splice(params.columnIdx, 0, currentColumn);
            dragItem.current = params;
            return newList;
          });
        }
      }
    }
  };
  const taskClasses =
    isDragging &&
    dragItem.current?.columnIdx === columnIdx &&
    typeDragItem.current === DragItem.column
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
      <div className={styles.body}>
        <ColumnHeader column={column} boardId={boardId} />
        {column?.tasks && <Tasks columnId={column.id} tasks={column.tasks} columnIdx={columnIdx} />}
        <CreatTask columnId={column.id} />
      </div>
    </div>
  );
};

export default Column;
