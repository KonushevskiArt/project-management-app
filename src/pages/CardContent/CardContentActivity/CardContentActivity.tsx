import { IoIosList as ActivityIcon } from 'react-icons/io';
import styles from '../card-content.module.scss';

const CardContentActivity = () => (
  <section className={styles.activity}>
    <ActivityIcon className={styles.icon} />
    <h3 className={styles.subtitle}>Activity</h3>
  </section>
);

export default CardContentActivity;
