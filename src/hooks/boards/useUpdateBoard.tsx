import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastOptions } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
import { BoardService } from 'utils/services/Board.service';

export const useUpdateBoardById = (
  boardId: string,
  setIsEditBoard: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  const toastOption = {
    position: 'bottom-center',
    hideProgressBar: true,
    autoClose: 5000,
  } as ToastOptions;

  const { mutate, isLoading } = useMutation(
    pathRoutes.board.updateOneById.absolute(boardId),
    (title: string) => BoardService.updateOneById(boardId, title),
    {
      onError: (error: Error) => {
        setIsEditBoard(false);
        console.log(error);
        toast.error("Failed update board's title by network error!", toastOption);
      },
      onSuccess: () => {
        setIsEditBoard(false);
        queryClient.invalidateQueries(pathRoutes.board.getOneById.absolute(boardId));
        toast.success("Board's title updated successfuly!", toastOption);
      },
    }
  );

  return { mutate, isLoading };
};
