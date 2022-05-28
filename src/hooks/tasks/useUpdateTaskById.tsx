import { useLanguage } from 'hooks/useLanguage';
import { IColumn, IUpdateTask } from 'interfaces';
import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastOptions } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
import { TaskService } from 'utils/services/Task.service';

interface ILANG {
  [key: string]: string;
}

interface ITEXT {
  [key: string]: ILANG;
}

const TEXT_PAGE: Readonly<ITEXT> = {
  errorMessage: {
    en: 'Task updating failed by network error!',
    ru: 'Обновление задачи не удалось из-за сетевой ошибки!',
  },
};

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
  const lang = useLanguage();

  const { mutate, isLoading } = useMutation(
    pathRoutes.task.updateOneById.absolute(boardId, columnId, taskId),
    (updatedTask: IUpdateTask) => TaskService.updateOneById(boardId, columnId, taskId, updatedTask),
    {
      onError: () => {
        setColumns(oldColumns);
        toast.error(TEXT_PAGE.errorMessage[lang], toastOption);
      },
      onSuccess: () => {
        queryClient.invalidateQueries(pathRoutes.board.getOneById.absolute(boardId));
      },
    }
  );

  return { mutate, isLoading };
};
