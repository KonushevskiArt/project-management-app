import Loader from 'components/Loader';
import NotFound from 'pages/NotFound';
import TaskContent from 'pages/Board/components/TaskContent';
import React from 'react';
import { useQuery } from 'react-query';
import { Route, Routes, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { routes } from 'utils/routes';
import { BoardService } from 'utils/services/Board.service';
import Columns from './components/Columns';
import styles from './board.module.scss';
import { pathRoutes } from 'utils/pathRoutes';

const Board: React.FC = () => {
  const { boardId = '' } = useParams();

  const {
    isLoading,
    error,
    data: board,
  } = useQuery({
    queryKey: pathRoutes.board.getOneById.absolute(boardId),
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
    </div>
  );
};

export default Board;
