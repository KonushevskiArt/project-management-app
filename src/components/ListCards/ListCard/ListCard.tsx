import { ITask } from 'interfaces';
import styles from './list-card.module.scss';

interface IProps {
  card: ITask;
}

const Card = ({ card }: IProps) => {
  return <li className={styles.card}>{card.title}</li>;
};

export default Card;
