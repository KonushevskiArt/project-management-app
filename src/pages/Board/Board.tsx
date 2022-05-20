import Loader from 'components/Loader';
import NotFound from 'pages/NotFound';
import TaskContent from 'pages/TaskContent';
import React from 'react';
import { useQuery } from 'react-query';
import { Route, Routes, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { pathRoutes } from 'utils/pathRoutes';
import { routes } from 'utils/routes';
import { BoardService } from 'utils/services/Board.service';
import Columns from './components/Columns';
import styles from './board.module.scss';

console.log(routes.boards.absolute());

const Board: React.FC = () => {
  const { boardId = '' } = useParams();

  const {
    isLoading,
    error,
    data: board,
  } = useQuery({
    queryKey: routes.boards.absolute(boardId),
    queryFn: () => BoardService.getOneById(boardId),
  });

  if (isLoading) return <Loader />;
  if (error || !board) return <NotFound />;
  return (
    <div className={styles.container}>
      <Link to="/">Move to home</Link>
      <h4>{board.title}</h4>
      <div className={styles.content}>
        {board?.columns && <Columns columns={board.columns} boardId={boardId} />}
      </div>
      <Routes>
        <Route path={routes.tasks.content.absolute()} element={<TaskContent />} />
      </Routes>
    </div>
  );
};

export default Board;
