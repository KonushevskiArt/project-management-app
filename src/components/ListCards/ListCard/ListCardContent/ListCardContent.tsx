import ListCardContentHeader from './ListCardContentHeader';
import ListCardContentSidebar from './ListCardContentSidebar';

import styles from './list-card-content.module.scss';
import ListCardContentDescription from './ListCardContentDescription';
import ListCardContentActivity from './ListCardContentActivity';

const ListCardContent = () => {
  return (
    <div className={`${styles.wrapper} ${styles.open}`}>
      <ListCardContentHeader />
      <div className={styles.body}>
        <div>
          <ListCardContentDescription />
          <ListCardContentActivity />
        </div>
        <ListCardContentSidebar />
      </div>
    </div>
  );
};

export default ListCardContent;
