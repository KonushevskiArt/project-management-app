import { useDeleteColumnById } from 'hooks/columns/useDeleteColumnById';
import { useLanguage } from 'hooks/useLanguage';
import { ITEXT } from 'interfaces';
import styles from './column-header.module.scss';

const TEXT_COLUMN_HEADER: ITEXT = {
  remove: {
    en: 'remove',
    ru: 'удалить',
  },
};

interface IProps {
  title: string;
  boardId: string;
  columnId: string;
}

const ColumnHeader = ({ title, boardId, columnId }: IProps) => {
  const { removeColumnHandler } = useDeleteColumnById(boardId, columnId);
  const lang = useLanguage();

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <button className={styles.remove} onClick={removeColumnHandler}>
        {TEXT_COLUMN_HEADER.remove[lang]}
      </button>
    </div>
  );
};

export default ColumnHeader;
