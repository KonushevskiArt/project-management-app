import { AiFillCreditCard as TitleIcon } from 'react-icons/ai';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import styles from '../list-card-content.module.scss';
//import styles from './list-card-content-header.module.scss';

//AiFillCreditCard
//IoCloseOutline
//IoMdList

const ListCardContentHeader = () => {
  return (
    <header className={styles.header}>
      <div className={styles.title}>
        <TitleIcon className={styles.icon} />
        <h2 className={styles['title-text']}>Title</h2>
      </div>
      <span className={styles.close}>
        <CloseIcon className={styles.icon} />
      </span>
    </header>
  );
};

export default ListCardContentHeader;
