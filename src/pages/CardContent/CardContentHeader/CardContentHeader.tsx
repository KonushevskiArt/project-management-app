import { AiFillCreditCard as TitleIcon } from 'react-icons/ai';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import styles from '../card-content.module.scss';

interface IProps {
  title: string;
  onCloseClick: () => void;
}

const CardContentHeader = ({ title, onCloseClick }: IProps) => (
  <header className={styles.header}>
    <TitleIcon className={styles.icon} />
    <h2 className={styles.title}>{title}</h2>
    <p className={styles.subtext}>
      in list <span className={styles.column}>dfn</span>{' '}
    </p>

    <span className={styles.close} onClick={onCloseClick}>
      <CloseIcon className={styles['close-icon']} />
    </span>
  </header>
);

export default CardContentHeader;
