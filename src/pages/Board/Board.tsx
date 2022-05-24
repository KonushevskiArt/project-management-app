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
import { DragItem, IBoard, IColumn, IDragItemParams } from 'interfaces';
import { pathRoutes } from 'utils/pathRoutes';
import { SetUserIdInLocalStorage } from 'utils/setUserIdInLocalStorage';

type ContextType = {
  board: IBoard;
  oldColumns: IColumn[];
  dragItem: React.MutableRefObject<IDragItemParams | undefined>;
  dragNode: React.MutableRefObject<HTMLDivElement | undefined>;
  typeDragItem: DragItem;
  setTypeDragItem: React.Dispatch<React.SetStateAction<DragItem>>;
  setColumns: React.Dispatch<React.SetStateAction<IColumn[]>>;
  setOldColumns: React.Dispatch<React.SetStateAction<IColumn[]>>;
  dragging: boolean;
  idxOfDragColumn: number;
  setIdxOfDragColumn: React.Dispatch<React.SetStateAction<number>>;
  setDragging: React.Dispatch<React.SetStateAction<boolean>>;
};

export const BoardContext = createContext({} as ContextType);

const Board: React.FC = () => {
  const { boardId = '' } = useParams();
  const dragItem = useRef<IDragItemParams>();
  const dragNode = useRef<HTMLDivElement>();
  const [dragging, setDragging] = useState(false);
  const [columns, setColumns] = useState<IColumn[]>([]);
  const [idxOfDragColumn, setIdxOfDragColumn] = useState(0);
  const [oldColumns, setOldColumns] = useState<IColumn[]>([]);
  const [typeDragItem, setTypeDragItem] = useState<DragItem>(DragItem.task);
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
              typeDragItem: typeDragItem,
              setTypeDragItem: setTypeDragItem,
              idxOfDragColumn: idxOfDragColumn,
              setIdxOfDragColumn: setIdxOfDragColumn,
            }}
          >
            <h4 className={s.title}>{board.title}</h4>
            <div className={s.board}>
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
