import { IoMdList as DescriptionIcon } from 'react-icons/io';
import styles from '../task-content.module.scss';

interface IProps {
  description: string;
}

const TaskContentDescription = ({ description }: IProps) => (
  <section className={styles.description}>
    <DescriptionIcon className={styles.icon} />
    <h3 className={styles.subtitle}>Description</h3>
    <p>{description}</p>
  </section>
);

export default TaskContentDescription;
