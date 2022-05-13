import { Route, Routes, useParams } from 'react-router';
import mockApi from 'MockApi';
import { useQuery } from 'react-query';
import Loader from 'components/Loader';
import NotFound from 'pages/NotFound';
import TaskContent from 'pages/TaskContent';
import Columns from './Columns';

const Board = () => {
  const { boardId = '', columnId, taskId } = useParams();

  const {
    isLoading,
    error,
    data: board,
  } = useQuery(
    ['boards', boardId],
    () => {
      try {
        return mockApi.getBoardById({ boardId }).then((res) => res);
      } catch (error) {
        throw Error('!!!');
      }
    },
    {
      retry: false,
    }
  );

  const columnById = board?.columns.find(({ id }) => columnId === id);
  const cardById = columnById?.tasks.find(({ id }) => taskId === id);

  if (error) return <NotFound />;
  if (isLoading) return <Loader />;
  return (
    <div>
      <h4>{board?.title}</h4>
      <Columns columns={board?.columns} />
      <Routes>
        <Route path="columns/:columnId/tasks/:taskId" element={<TaskContent card={cardById} />} />
      </Routes>
    </div>
  );
};

export default Board;
