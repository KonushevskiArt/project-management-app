import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastOptions } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
import { routes } from 'utils/routes';
import { ColumnService } from 'utils/services/Column.service';

export const useDeleteColumnById = (boardId: string, columnId: string) => {
  const queryClient = useQueryClient();
  const toastOption = {
    position: 'bottom-center',
    hideProgressBar: true,
    autoClose: 5000,
  } as ToastOptions;

  const { mutate, isLoading } = useMutation(
    'delete column' + columnId,
    () => ColumnService.deleteOneById(boardId, columnId),
    {
      onError: (error: Error) => {
        console.log(error);
        toast.error('Failed remove by network error!', toastOption);
      },
      onSuccess: () => {
        toast.success('Column deleted successfuly!', toastOption);
        queryClient.invalidateQueries(routes.boards.absolute(boardId));
      },
    }
  );

  return { mutate, isLoading };
};
