import TaskContent from 'pages/TaskContent';
import React from 'react';
import { useQuery } from 'react-query';
import { Route, Routes, useParams } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import { BoardService } from 'utils/services/Board.service';
import ListOfColumns from './components/ListOfColumns';
import s from './style.module.scss';
import LinearProgress from '@mui/material/LinearProgress';

const BoardPage: React.FC = () => {
  const { boardId = '' } = useParams();

  const {
    isLoading,
    error,
    data: board,
  } = useQuery({
    queryKey: pathRoutes.board.getOneById.absolute(boardId),
    queryFn: () => BoardService.getOneById(boardId),
  });

  if (error) return <div>Network error...</div>;

  return (
    <div className={s.container}>
      {isLoading && <LinearProgress />}
      {board && (
        <>
          <h4 className={s.title}>{board.title}</h4>
          <div className={s.board}>
            <ListOfColumns columns={board.columns} boardId={boardId} />
          </div>
        </>
      )}
      <Routes>
        <Route path="columns/:columnId/tasks/:taskId/content" element={<TaskContent />} />
      </Routes>
    </div>
  );
};

export default BoardPage;
