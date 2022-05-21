import { Link, Route, Routes, useParams } from 'react-router-dom';
import { routes } from 'utils/routes';
import CreatTaskForm from './CreatTaskForm';
import CreatTaskLabel from './CreatTaskLabel';

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
        <Route path={routes.tasks.creat.absolute()} element={<CreatTaskForm />} />
      )}
      <Route
        path="/*"
        element={
          <Link to={routes.tasks.creat.absolute(columnId)}>
            <CreatTaskLabel label={TEXT_CREAT_CARD.label} />
          </Link>
        }
      />
    </Routes>
  );
};

export default CreatTask;
