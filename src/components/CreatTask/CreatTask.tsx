import CreatTaskLabel from './CreatTaskLabel';
import CreatTaskForm from './CreatTaskForm';
import { Link, Route, Routes, useParams } from 'react-router-dom';

const TEXT_CREAT_CARD = {
  label: 'Add a card',
};

interface IProps {
  columnId?: string;
}

const CreatTask = ({ columnId }: IProps) => {
  const { columnId: id } = useParams();

  return (
    <Routes>
      {columnId === id && (
        <Route path={`columns/${columnId}/tasks/creat-task`} element={<CreatTaskForm />} />
      )}
      <Route
        path="/*"
        element={
          <Link to={`columns/${columnId}/tasks/creat-task`}>
            <CreatTaskLabel label={TEXT_CREAT_CARD.label} />
          </Link>
        }
      />
    </Routes>
  );
};

export default CreatTask;
