import { ITask } from 'interfaces';
import { Link } from 'react-router-dom';
import styles from './card.module.scss';

interface IProps {
  card: ITask;
}

const Card = ({ card }: IProps) => (
  <li className={styles.card}>
    <Link className={styles.link} to={card.id}>
      {card.title}
    </Link>
  </li>
);

export default Card;
