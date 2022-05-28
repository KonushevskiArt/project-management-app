import { IBoard } from 'interfaces';
import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastOptions } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
import { BoardService } from 'utils/services/Board.service';

export const useDeleteBoardById = (boardId: string) => {
  const queryClient = useQueryClient();
  const toastOption = {
    position: 'bottom-center',
    hideProgressBar: true,
    autoClose: 5000,
  } as ToastOptions;

  const { mutate, isLoading } = useMutation(
    pathRoutes.board.deleteOneById.absolute(boardId),
    () => BoardService.deleteOneById(boardId),
    {
      onError: (error: Error) => {
        console.log(error);
        toast.error('Failed remove board by network error!', toastOption);
      },
      onSuccess: (data) => {
        toast.success('Board removed successfuly!', toastOption);
        queryClient.invalidateQueries(pathRoutes.board.getAll.absolute());
      },
    }
  );

  return { mutate, isLoading };
};
