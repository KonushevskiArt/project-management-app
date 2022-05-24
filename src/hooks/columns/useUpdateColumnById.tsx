import { IColumn, IUpdatedColumn } from 'interfaces';
import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastOptions } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
import { routes } from 'utils/routes';
import { ColumnService } from 'utils/services/Column.service';

export const useUpdateColumnById = (
  boardId: string,
  columnId: string,
  setColumns: React.Dispatch<React.SetStateAction<IColumn[]>>,
  oldColumns: IColumn[]
) => {
  const queryClient = useQueryClient();
  const toastOption = {
    position: 'bottom-right',
    hideProgressBar: true,
    autoClose: 3000,
  } as ToastOptions;

  const { mutate, isLoading } = useMutation(
    pathRoutes.column.updateOneById.absolute(boardId, columnId),
    (updatedColumn: IUpdatedColumn) =>
      ColumnService.updateOneById(boardId, columnId, updatedColumn),
    {
      onError: (error: Error) => {
        console.log(error);
        setColumns(oldColumns);
        toast.error('Column updating failed by network error!', toastOption);
      },
      onSuccess: () => {
        toast.success('Column updated successfuly!', toastOption);
        queryClient.invalidateQueries(routes.boards.absolute(boardId));
      },
    }
  );

  return { mutate, isLoading };
};
