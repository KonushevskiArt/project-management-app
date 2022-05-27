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
    isDragging,
    setIsDragging,
    dragItem,
    dragNode,
    setColumns,
    typeDragItem,
    idDraggingTask,
  } = useContext(BoardContext);

  const { mutate } = useUpdateTaskById(
    board.id,
    columnId,
    idDraggingTask.current,
    setColumns,
    oldColumns.current
  );

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, params: IDragItemParams) => {
    e.stopPropagation();
    typeDragItem.current = DragItem.task;
    dragItem.current = params;
    idDraggingTask.current = task.id;
    dragNode.current = e.target as HTMLDivElement;
    dragNode.current.addEventListener('dragend', handleDragEnd);
    oldColumns.current = board.columns || [];
    setTimeout(() => {
      setIsDragging(true);
    }, 0);
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (dragNode.current) {
      const currentNode = dragNode.current as HTMLDivElement;
      currentNode.removeEventListener('dragend', handleDragEnd);
      const userId = localStorage.getItem('userId');
      if (board.columns && dragItem.current && userId !== null) {
        const tasks = board.columns[dragItem.current.columnIdx].tasks || [];
        const numberOfTasks = tasks.length;
        const currentTask = tasks[dragItem.current.taskIdx];
        const updatedTask = {
          title: task.title,
          description: task.description,
          boardId: board.id,
          userId: userId,
          order: currentTask ? currentTask.order : numberOfTasks + 1,
          columnId: board.columns[dragItem.current?.columnIdx].id,
        };
        mutate(updatedTask);
      }
      dragItem.current = null;
      dragNode.current = null;
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>, params: IDragItemParams) => {
    e.stopPropagation();
    if (e.target !== dragNode.current && typeDragItem.current === DragItem.task) {
      const currentItem = dragItem.current as IDragItemParams;
      setColumns((prevList) => {
        const newList = JSON.parse(JSON.stringify(prevList));
        const currentTask = newList[currentItem.columnIdx].tasks.splice(currentItem.taskIdx, 1)[0];
        newList[params.columnIdx].tasks.splice(params.taskIdx, 0, currentTask);
        const stateTasks = board.columns![params.columnIdx].tasks;
        const stateTask = stateTasks![params.taskIdx];
        currentTask.order = stateTask ? stateTask.order : stateTasks!.length + 1;
        dragItem.current = params;
        return newList;
      });
    }
  };

  const onLinkClick = () => {
    navigate(routes.tasks.content.absolute(columnId, task.id));
  };

  const taskClasses =
    isDragging &&
    dragItem.current?.columnIdx === columnIdx &&
    dragItem.current?.taskIdx === taskIdx &&
    typeDragItem.current === DragItem.task
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
