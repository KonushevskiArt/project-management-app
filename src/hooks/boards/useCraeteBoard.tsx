import { INewBoard } from 'interfaces';
import { useQueryClient, useMutation } from 'react-query';
import { ToastOptions, toast } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
import { BoardService } from 'utils/services/Board.service';

export const useCreateBoard = () => {
  const queryClient = useQueryClient();
  const toastOption = {
    position: 'bottom-center',
    hideProgressBar: true,
    autoClose: 5000,
  } as ToastOptions;

  const { mutate, isLoading } = useMutation(
    pathRoutes.board.create.absolute(),
    (params: INewBoard) => BoardService.create(params),
    {
      onError: (error: Error) => {
        console.log(error);
        toast.error('Failed crate new board by network error!', toastOption);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(pathRoutes.board.getAll.absolute());
        toast.success('New board created successfuly!', toastOption);
      },
    }
  );

  return { mutate, isLoading };
};
