import { IoMdList as DescriptionIcon } from 'react-icons/io';
import styles from '../list-card-content.module.scss';

const ListCardContentDescription = () => {
  return (
    <section>
      <div className={styles.title}>
        <DescriptionIcon className={styles.icon} />
        <h3 className={styles['subtitle-text']}>Title</h3>
      </div>
    </section>
  );
};

export default ListCardContentDescription;
