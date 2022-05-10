import { IoIosList as ActivityIcon } from 'react-icons/io';
import styles from '../list-card-content.module.scss';

const ListCardContentActivity = () => {
  return (
    <section>
      <div className={styles.title}>
        <ActivityIcon className={styles.icon} />
        <h3 className={styles['subtitle-text']}>Title</h3>
      </div>
    </section>
  );
};

export default ListCardContentActivity;
