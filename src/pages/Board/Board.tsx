import TaskContent from 'pages/TaskContent';
import React, { createContext, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import { Route, Routes, useParams } from 'react-router';
import { routes } from 'utils/routes';
import { BoardService } from 'utils/services/Board.service';
// import ListOfColumns from './components/ListOfColumns';
import s from './style.module.scss';
import LinearProgress from '@mui/material/LinearProgress';
import Columns from './components/Columns';
import { IBoard, IColumn, IDragItemParams } from 'interfaces';
import { pathRoutes } from 'utils/pathRoutes';
import { SetUserIdInLocalStorage } from 'utils/setUserIdInLocalStorage';

type ContextType = {
  board: IBoard;
  oldColumns: IColumn[];
  dragItem: React.MutableRefObject<IDragItemParams | undefined>;
  dragNode: React.MutableRefObject<HTMLDivElement | undefined>;
  setColumns: React.Dispatch<React.SetStateAction<IColumn[]>>;
  setOldColumns: React.Dispatch<React.SetStateAction<IColumn[]>>;
  dragging: boolean;
  setDragging: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BoardContext = createContext({} as ContextType);

const Board: React.FC = () => {
  const { boardId = '' } = useParams();
  const dragItem = useRef<IDragItemParams>();
  const dragNode = useRef<HTMLDivElement>();
  const [dragging, setDragging] = useState(false);
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [oldColumns, setOldColumns] = useState<IColumn[]>([]);
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

  if (error) return <div>Network error...</div>;

  return (
    <div className={s.container}>
      {isLoading && <LinearProgress />}
      {board && (
        <>
          <BoardContext.Provider
            value={{
              board: board,
              dragItem: dragItem,
              dragNode: dragNode,
              setColumns: setColumns,
              dragging: dragging,
              setDragging: setDragging,
              setOldColumns: setOldColumns,
              oldColumns: oldColumns,
            }}
          >
            <h4 className={s.title}>{board.title}</h4>
            <div className={s.board}>
              {/* <ListOfColumns columns={board.columns} boardId={boardId} /> */}
              {columns && <Columns columns={columns} boardId={boardId} />}
            </div>
          </BoardContext.Provider>
        </>
      )}
      <Routes>
        <Route path={routes.tasks.content.absolute()} element={<TaskContent />} />
      </Routes>
    </div>
  );
};

export default Board;
