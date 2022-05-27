import CreatTask from 'pages/Board/components/CreatTask';
import { useQuery } from 'react-query';
import { pathRoutes } from 'utils/pathRoutes';
import { ColumnService } from 'utils/services/Column.service';
import styles from './column.module.scss';
import { IColumn } from 'interfaces';
import Tasks from '../../Tasks';
import ColumnHeader from './ColumnHeader';
import { memo } from 'react';

interface IProps {
  column: IColumn;
  boardId: string;
}
const Column = ({ column, boardId }: IProps) => {
  if (!column) return <div>{`No data :(`}</div>;

  return (
    <div className={styles.body}>
      <ColumnHeader title={column.title} columnId={column.id} boardId={boardId} />
      {column?.tasks && <Tasks columnId={column.id} tasks={column.tasks} />}
      <CreatTask columnId={column.id} />
    </div>
  );
};

export default memo(Column);
