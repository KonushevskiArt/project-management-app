import { IColumn, IUpdateTask } from 'interfaces';
import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastOptions } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
import { TaskService } from 'utils/services/Task.service';

const toastOption = {
  position: 'bottom-right',
  hideProgressBar: true,
  autoClose: 2000,
} as ToastOptions;

export const useUpdateTaskById = (
  boardId: string,
  columnId: string,
  taskId: string,
  setColumns: React.Dispatch<React.SetStateAction<IColumn[]>>,
  oldColumns: IColumn[]
) => {
  const queryClient = useQueryClient();

  const { mutate, isLoading } = useMutation(
    pathRoutes.task.updateOneById.absolute(boardId, columnId, taskId),
    (updatedTask: IUpdateTask) => TaskService.updateOneById(boardId, columnId, taskId, updatedTask),
    {
      onError: () => {
        setColumns(oldColumns);
        toast.error('Task updating failed by network error!', toastOption);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(pathRoutes.board.getOneById.absolute(boardId));
      },
    }
  );

  return { mutate, isLoading };
};
