import CreatTaskLabel from './CreatTaskLabel';
import CreatTaskForm from './CreatTaskForm';
import { Link, Route, Routes } from 'react-router-dom';

const TEXT_CREAT_CARD = {
  label: 'Add a card',
};

interface IProps {
  columnId?: string;
}

const CreatTask = ({ columnId }: IProps) => {
  return (
    <Routes>
      <Route path={`columns/${columnId}`} element={<CreatTaskForm />} />
      <Route
        path="/*"
        element={
          <Link to={`columns/${columnId}`}>
            <CreatTaskLabel label={TEXT_CREAT_CARD.label} />
          </Link>
        }
      />
    </Routes>
  );
};

export default CreatTask;
