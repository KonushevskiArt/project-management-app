import { useLanguage } from 'hooks/useLanguage';
import { ITEXT } from 'interfaces';
import { Link, Route, Routes, useParams } from 'react-router-dom';
import { routes } from 'utils/routes';
import CreatTaskForm from './CreatTaskForm';
import CreatTaskLabel from './CreatTaskLabel';

const TEXT_CREAT_CARD: ITEXT = {
  label: {
    en: 'Add a card',
    ru: 'Добавить карточку',
  },
};

interface IProps {
  columnId?: string;
}

const CreatTask = ({ columnId }: IProps) => {
  const { columnId: id } = useParams();
  const lang = useLanguage();
  return (
    <Routes>
      {columnId === id && (
        <Route path={routes.tasks.creat.absolute()} element={<CreatTaskForm />} />
      )}
      <Route
        path="/*"
        element={
          <Link draggable={false} to={routes.tasks.creat.absolute(columnId)}>
            <CreatTaskLabel label={TEXT_CREAT_CARD.label[lang]} />
          </Link>
        }
      />
    </Routes>
  );
};

export default CreatTask;
