import styles from './columns.module.scss';
import ColumnCreater from '../ColumnCreater';
import { IColumn } from 'interfaces';
import Column from './Column';

interface IProps {
  columns: IColumn[];
  boardId: string;
}

const Columns = ({ columns, boardId }: IProps) => (
  <div className={styles.container}>
    {columns
      .sort((column1, column2) => column1.order - column2.order)
      .map((column: IColumn, columnIdx: number) => (
        <Column key={column.id} column={column} boardId={boardId} columnIdx={columnIdx} />
      ))}
    <ColumnCreater />
  </div>
);

export default Columns;
