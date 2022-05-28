import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastOptions } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
import { ColumnService } from 'utils/services/Column.service';

export const useDeleteColumnById = (boardId: string, columnId: string) => {
  const queryClient = useQueryClient();
  const toastOption = {
    position: 'bottom-center',
    hideProgressBar: true,
    autoClose: 5000,
  } as ToastOptions;

  const { mutate, isLoading } = useMutation(() => ColumnService.deleteOneById(boardId, columnId), {
    onError: () => {
      toast.error('Failed remove by network error!', toastOption);
    },
    onSuccess: () => {
      toast.success('Column deleted successfuly!', toastOption);
      queryClient.invalidateQueries(pathRoutes.board.getOneById.absolute(boardId));
    },
  });

  const removeColumnHandler = () => mutate();

  return { removeColumnHandler, isLoading };
};
