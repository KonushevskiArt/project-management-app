import { getAllColumns } from 'api';
import Loader from 'components/Loader';
import { IColumn } from 'interfaces';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import Column from './Column';

interface IProps {
  columns: IColumn[];
}

const Columns = ({ columns }: IProps) => {
  const { boardId = '' } = useParams();

  const { error, data } = useQuery({
    queryKey: pathRoutes.columns.getAll.absolute(boardId),
    queryFn: () => getAllColumns({ boardId }),
    initialData: () => columns,
  });

  if (error || !data) return <div>{`No data :(`}</div>;
  return (
    <div>
      {data.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
};

export default Columns;
