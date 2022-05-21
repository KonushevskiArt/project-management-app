import { useDeleteColumnById } from 'hooks/columns/useDeleteColumnById';
import styles from './column-header.module.scss';

interface IProps {
  title: string;
  boardId: string;
  columnId: string;
}

const ColumnHeader = ({ title, boardId, columnId }: IProps) => {
  const { mutate } = useDeleteColumnById(boardId, columnId);

  const removeColumnHandler = () => mutate();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <button className={styles.remove} onClick={removeColumnHandler}>
        remove
      </button>
    </div>
  );
};

export default ColumnHeader;
