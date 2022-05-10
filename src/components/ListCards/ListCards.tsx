import CreatCard from 'components/CreatCard';
import { ITask } from 'interfaces';
import ListCard from './ListCard';
import styles from './list-cards.module.scss';

interface IProps {
  cards: ITask[];
}

const ListCards = ({ cards }: IProps) => {
  return (
    <ul className={styles.list}>
      {cards.map((card) => (
        <ListCard card={card} key={card.id} />
      ))}
      <CreatCard />
    </ul>
  );
};
export default ListCards;
