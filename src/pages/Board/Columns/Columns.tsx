import { IColumn } from 'interfaces';
import mockApi from 'MockApi';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import Column from './Column';

interface IProps {
  columns?: IColumn[];
}

const Columns = ({ columns }: IProps) => {
  const { boardId = '' } = useParams();
  const { isLoading, error, data } = useQuery(
    ['columns', boardId],
    () => {
      try {
        return mockApi.getAllColumns({ boardId }).then((res) => res);
      } catch (error) {
        throw Error('!!!');
      }
    },
    {
      initialData: columns,
      retry: false,
    }
  );

  return (
    <div>
      {columns?.map((column) => (
        <Column key={column.id} column={column} />
      ))}
    </div>
  );
};

export default Columns;
