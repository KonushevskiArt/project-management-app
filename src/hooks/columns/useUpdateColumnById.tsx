import { IColumn, IUpdateColumn } from 'interfaces';
import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastOptions } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
import { ColumnService } from 'utils/services/Column.service';

const toastOption = {
  position: 'bottom-right',
  hideProgressBar: true,
  autoClose: 2000,
} as ToastOptions;

export const useUpdateColumnById = (
  boardId: string,
  columnId: string,
  setColumns: React.Dispatch<React.SetStateAction<IColumn[]>>,
  oldColumns: IColumn[]
) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    pathRoutes.columns.updateOneById.absolute(boardId, columnId),
    (updatedColumn: IUpdateColumn) => ColumnService.updateOneById(boardId, columnId, updatedColumn),
    {
      onError: () => {
        setColumns(oldColumns);
        toast.error('Column updating failed by network error!', toastOption);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(pathRoutes.board.getOneById.absolute(boardId));
      },
    }
  );

  return { mutate, isLoading };
};
