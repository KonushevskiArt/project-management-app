import React, { createContext, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { Route, Routes, useNavigate, useParams } from 'react-router';
import { routes } from 'utils/routes';
import { BoardService } from 'utils/services/Board.service';
import styles from './styles.module.scss';
import Columns from './components/Columns';
import { DragItem, IBoard, IColumn, IDragItemParams } from 'interfaces';
import { pathRoutes } from 'utils/pathRoutes';
import { SetUserIdInLocalStorage } from 'utils/setUserIdInLocalStorage';
import TaskContent from './components/TaskContent';
import LinearProgress from '@mui/material/LinearProgress';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

type ContextType = {
  board: IBoard;
  oldColumns: React.MutableRefObject<IColumn[]>;
  dragItem: React.MutableRefObject<IDragItemParams | null>;
  dragNode: React.MutableRefObject<HTMLDivElement | null>;
  typeDragItem: React.MutableRefObject<DragItem>;
  setColumns: React.Dispatch<React.SetStateAction<IColumn[]>>;
  isDragging: boolean;
  setIsDragging: React.Dispatch<React.SetStateAction<boolean>>;
  idDraggingTask: React.MutableRefObject<string>;
  idDraggingColumn: React.MutableRefObject<string>;
};

export const BoardContext = createContext({} as ContextType);

const Board: React.FC = () => {
  const { boardId = '' } = useParams();
  const dragItem = useRef<IDragItemParams>(null);
  const dragNode = useRef<HTMLDivElement>(null);
  const idDraggingTask = useRef<string>('');
  const idDraggingColumn = useRef<string>('');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [columns, setColumns] = useState<IColumn[]>([]);
  const oldColumns = useRef<IColumn[]>([]);
  const typeDragItem = useRef<DragItem>(DragItem.task);
  const navigate = useNavigate();

  SetUserIdInLocalStorage();

  const {
    isLoading,
    error,
    data: board,
  } = useQuery({
    queryKey: pathRoutes.board.getOneById.absolute(boardId),
    queryFn: () => BoardService.getOneById(boardId),
    onSuccess: (data) => setColumns(data.columns as IColumn[]),
  });

  if (isLoading)
    return (
      <>
        <LinearProgress />
        <div style={{ display: 'flex', height: 'calc(100vh - 108px)' }}></div>
      </>
    );
  if (error) return <div>Network error...</div>;
  return (
    <div className={styles.container}>
      {board && (
        <BoardContext.Provider
          value={{
            board: board,
            dragItem: dragItem,
            dragNode: dragNode,
            setColumns: setColumns,
            isDragging: isDragging,
            setIsDragging: setIsDragging,
            idDraggingTask: idDraggingTask,
            oldColumns: oldColumns,
            typeDragItem: typeDragItem,
            idDraggingColumn: idDraggingColumn,
          }}
        >
          <div style={{ display: 'flex' }}>
            <ArrowBackIcon
              onClick={() => {
                navigate('/');
              }}
              sx={{ marginRight: '10px', ':hover': { cursor: 'pointer', fill: '#4c94bd' } }}
            />
            <h4 className={styles.title}>{board.title}</h4>
          </div>
          <div className={styles.board}>
            {columns && <Columns columns={columns} boardId={boardId} />}
          </div>
        </BoardContext.Provider>
      )}
      <Routes>
        <Route path={routes.tasks.content.absolute()} element={<TaskContent />} />
      </Routes>
    </div>
  );
};

export default Board;
