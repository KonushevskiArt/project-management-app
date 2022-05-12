import CardContentHeader from './CardContentHeader';
import CardContentSidebar from './CardContentSidebar';
import CardContentDescription from './CardContentDescription';
import CardContentActivity from './CardContentActivity';

import styles from './card-content.module.scss';
import { ITask } from 'interfaces';
import NotFound from 'components/not-found';
import Modal from 'components/Modal';
import { useNavigate } from 'react-router';

interface IProps {
  card?: ITask | undefined;
}

const CardContent = ({ card }: IProps) => {
  const navigate = useNavigate();
  const onCloseClick = () => navigate(`/board`);

  if (!card) return <NotFound />;
  return (
    <Modal handleClickOutside={onCloseClick}>
      <div className={`${styles.wrapper} ${styles.open}`}>
        <CardContentHeader title={card.title} onCloseClick={onCloseClick} />
        <div className={styles.main}>
          <div className={styles.body}>
            <CardContentDescription description={card.description} />
            <CardContentActivity />
          </div>
          <CardContentSidebar />
        </div>
      </div>
    </Modal>
  );
};

export default CardContent;
