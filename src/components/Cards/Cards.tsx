import CreatCard from 'components/CreatCard';
import Loader from 'components/Loader';
import { ITask } from 'interfaces';
import ListCard from './Card';
import styles from './cards.module.scss';

interface IProps {
  cards: ITask[];
}

const Cards = ({ cards }: IProps) => (
  <ul className={styles.list}>
    {cards.map((card) => (
      <ListCard card={card} key={card.id} />
    ))}
    <CreatCard />
  </ul>
);

export default Cards;
