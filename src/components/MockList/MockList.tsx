import CreatCard from 'components/CreatCard';
import styles from './list.module.scss';

const MockList = () => {
  return (
    <div className={styles.list}>
      <h4 className={styles['list-title']}>MockList</h4>
      <CreatCard />
    </div>
  );
};
export default MockList;
