import { IColumn, IUpdatedBoardParams } from 'interfaces';
import { useMutation } from 'react-query';
import { toast, ToastOptions } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
import { BoardService } from 'utils/services/Board.service';

export const useUpdateColumnsBoardById = (
  boardId: string
  // setIsEditBoard: React.Dispatch<React.SetStateAction<boolean>>,
  // setCurrentTitle: React.Dispatch<React.SetStateAction<string>>
) => {
  const toastOption = {
    position: 'bottom-center',
    hideProgressBar: true,
    autoClose: 5000,
  } as ToastOptions;

  const { mutate, isLoading } = useMutation(
    pathRoutes.board.updateOneById.absolute(boardId),
    (columns: IColumn[]) => BoardService.updateColumnsOneById(boardId, columns),
    {
      onError: (error: Error) => {
        console.log(error);
        toast.error("Failed update board's title by network error!", toastOption);
      },
      onSuccess: () => {
        toast.success("Board's title updated successfuly!", toastOption);
      },
    }
  );

  return { mutate, isLoading };
};
