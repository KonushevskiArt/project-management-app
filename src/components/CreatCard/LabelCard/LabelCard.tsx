import { ReactComponent as PlusIcon } from './plus-small.svg';
import styles from './label-card.module.scss';

interface IProps {
  label: string;
  onClick: () => void;
}

const LabelCard = ({ label, onClick }: IProps) => (
  <div className={styles.box} onClick={onClick}>
    <PlusIcon className={styles.icon} />
    <span className={styles.text}>{label}</span>
  </div>
);
export default LabelCard;
