import { IoMdList as DescriptionIcon } from 'react-icons/io';
import styles from '../card-content.module.scss';

interface IProps {
  description: string;
}

const CardContentDescription = ({ description }: IProps) => (
  <section className={styles.description}>
    <DescriptionIcon className={styles.icon} />
    <h3 className={styles.subtitle}>Description</h3>
    <p>{description}</p>
  </section>
);

export default CardContentDescription;
