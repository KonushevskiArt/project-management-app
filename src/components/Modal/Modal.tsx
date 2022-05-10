import styles from './modal.module.scss';

interface Props {
  isOpened?: boolean;
  handleClickOutside: (event: React.MouseEvent<HTMLElement>) => void;
  children: React.ReactNode;
}

const Modal: React.FC<Props> = ({ isOpened = true, children, handleClickOutside }) => (
  <div className={`${styles.wrapper} ${styles.open}`} onClick={handleClickOutside}>
    {children}
  </div>
);
export default Modal;
