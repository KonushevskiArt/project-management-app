import { useUpdateTaskById } from 'hooks/tasks/useUpdateTaskById';
import { DragItem, IDragItemParams, ITask } from 'interfaces';
import { BoardContext } from 'pages/Board/Board';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { routes } from 'utils/routes';
import styles from './task.module.scss';

interface IProps {
  task: ITask;
  columnId: string;
  columnIdx: number;
  taskIdx: number;
}

const Task = ({ task, columnId, columnIdx, taskIdx }: IProps) => {
  const navigate = useNavigate();
  const {
    board,
    oldColumns,
    dragging,
    setDragging,
    dragItem,
    dragNode,
    setColumns,
    setOldColumns,
    typeDragItem,
    setTypeDragItem,
  } = useContext(BoardContext);

  const { mutate } = useUpdateTaskById(board.id, columnId, task.id, setColumns, oldColumns);

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, params: IDragItemParams) => {
    e.stopPropagation();
    setTypeDragItem(DragItem.task);
    dragItem.current = params;
    dragNode.current = e.target as HTMLDivElement;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    setOldColumns(board.columns || []);
    setTimeout(() => {
      setDragging(true);
    }, 0);
  };

  const handleDragEnd = () => {
    setDragging(false);
    if (dragNode.current) {
      const currentNode = dragNode.current as HTMLDivElement;
      currentNode.removeEventListener('dragend', handleDragEnd);
      const userId = localStorage.getItem('userId');
      if (board.columns && dragItem.current && userId !== null) {
        const updatedTask = {
          title: task.title,
          order: dragItem.current.taskIdx + 1,
          description: task.description,
          columnId: board.columns[dragItem.current?.columnIdx].id,
          boardId: board.id,
          userId: userId,
        };
        mutate(updatedTask);
      }
      dragItem.current = undefined;
      dragNode.current = undefined;
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, params: IDragItemParams) => {
    e.stopPropagation();
    if (e.target !== dragNode.current && typeDragItem === DragItem.task) {
      const currentItem = dragItem.current as IDragItemParams;
      setColumns((prevList) => {
        const newList = JSON.parse(JSON.stringify(prevList));
        const currentTask = newList[currentItem?.columnIdx].tasks.splice(currentItem.taskIdx, 1)[0];
        newList[params.columnIdx].tasks.splice(params.taskIdx, 0, currentTask);
        dragItem.current = params;
        return newList;
      });
    }
  };

  const onLinkClick = () => {
    navigate(routes.tasks.content.absolute(columnId, task.id));
  };

  const taskClasses =
    dragging &&
    dragItem.current?.columnIdx === columnIdx &&
    dragItem.current?.taskIdx === taskIdx &&
    typeDragItem === 'task'
      ? `${styles.task} ${styles.dragging}`
      : styles.task;

  return (
    <div
      draggable={true}
      onDragEnd={() => handleDragEnd()}
      onDragStart={(e) => handleDragStart(e, { columnIdx, taskIdx })}
      onDragEnter={(e) => handleDragEnter(e, { columnIdx, taskIdx })}
      className={taskClasses}
      onClick={onLinkClick}
    >
      <span className={styles.link}>{task.title}</span>
    </div>
  );
};

export default Task;
