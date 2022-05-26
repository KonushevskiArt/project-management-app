import { IColumn, IUpdatedTask } from 'interfaces';
import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastOptions } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
import { TaskService } from 'utils/services/Task.service';

export const useUpdateTaskById = (
  boardId: string,
  columnId: string,
  taskId: string,
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
    pathRoutes.task.updateOneById.absolute(boardId, columnId, taskId),
    (updatedTask: IUpdatedTask) =>
      TaskService.updateOneById(boardId, columnId, taskId, updatedTask),
    {
      onError: (error: Error) => {
        console.log(error);
        setColumns(oldColumns);
        toast.error('Task updating failed by network error!', toastOption);
      },
      onSuccess: () => {
        toast.success('Task updated successfuly!', toastOption);
        queryClient.invalidateQueries(pathRoutes.board.getOneById.absolute(boardId));
      },
    }
  );

  return { mutate, isLoading };
};
