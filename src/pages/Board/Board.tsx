import { Route, Routes, useParams } from 'react-router';
import { useQuery } from 'react-query';
import Loader from 'components/Loader';
import NotFound from 'pages/NotFound';
import TaskContent from 'pages/TaskContent';
import Columns from './Columns';
import { getBoardById } from 'api';
import { pathRoutes } from 'utils/pathRoutes';

const Board = () => {
  const { boardId = '' } = useParams();

  const {
    isLoading,
    error,
    data: board,
  } = useQuery({
    queryKey: pathRoutes.boards.getOneById.absolute(boardId),
    queryFn: () => getBoardById({ boardId }),
  });

  if (isLoading) return <Loader />;
  if (error || !board) return <NotFound />;

  return (
    <div>
      <h4>{board.title}</h4>
      <Columns columns={board.columns} />
      <Routes>
        <Route path="columns/:columnId/tasks/:taskId/content" element={<TaskContent />} />
      </Routes>
    </div>
  );
};

export default Board;
