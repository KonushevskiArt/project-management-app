import { ReactComponent as PlusIcon } from './plus-small.svg';
import styles from './creat-task-label.module.scss';

interface IProps {
  label: string;
}

const CreatTaskLabel = ({ label }: IProps) => (
  <span draggable={false} className={styles.box}>
    <PlusIcon className={styles.icon} />
    <span draggable={false} className={styles.text}>
      {label}
    </span>
  </span>
);
export default CreatTaskLabel;
