import styles from './columns.module.scss';
import ColumnCreater from '../ColumnCreater';
import { IColumn } from 'interfaces';
import Column from 'pages/Board/components/Columns/Column';

interface IProps {
  columns: IColumn[];
  boardId: string;
}

const Columns = ({ columns, boardId }: IProps) => {
  const lastColumnOrder = columns.length > 0 ? columns[columns.length - 1].order : 1;

  return (
    <div className={styles.container}>
      {columns.map((column: IColumn) => (
        <Column key={column.id} column={column} boardId={boardId} />
      ))}
      <ColumnCreater lastColumnOrder={lastColumnOrder} />
    </div>
  );
};

export default Columns;
