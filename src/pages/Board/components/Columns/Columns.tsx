import styles from './columns.module.scss';
import ColumnCreater from '../ColumnCreater';
import { IColumn } from 'interfaces';
import Column from 'pages/Board/components/Columns/Column';

interface IProps {
  columns: IColumn[];
  boardId: string;
}

const Columns = ({ columns, boardId }: IProps) => (
  <div className={styles.container}>
    {columns.map((column: IColumn) => (
      <Column key={column.id} column={column} boardId={boardId} />
    ))}
    <ColumnCreater />
  </div>
);

export default Columns;
