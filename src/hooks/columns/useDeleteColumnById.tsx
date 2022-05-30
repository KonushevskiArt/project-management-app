import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastOptions } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
import { ColumnService } from 'utils/services/Column.service';

const toastOption = {
  position: 'bottom-right',
  hideProgressBar: true,
  autoClose: 2000,
} as ToastOptions;

export const useDeleteColumnById = (boardId: string, columnId: string) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(() => ColumnService.deleteOneById(boardId, columnId), {
    onError: () => {
      toast.error('Failed remove by network error!', toastOption);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(pathRoutes.board.getOneById.absolute(boardId));
    },
  });

  const removeColumnHandler = () => mutate();

  return { removeColumnHandler, isLoading };
};
