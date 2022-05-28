import { IColumn } from 'interfaces';
import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Updater } from 'react-query/types/core/utils';
import { useParams } from 'react-router';
import { toast, ToastOptions } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
import { TaskService } from 'utils/services/Task.service';

const toastOption: ToastOptions = {
  position: 'bottom-right',
  hideProgressBar: true,
  autoClose: 2000,
};

export default function (columnId: string, taskId: string) {
  const { boardId = '' } = useParams();
  const [isRemove, setRemove] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => TaskService.deleteOneById(boardId, columnId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries(pathRoutes.board.getOneById.absolute(boardId));
    },
    /*   onMutate: () => {
      const column: IColumn | undefined = queryClient.getQueryData(
        pathRoutes.board.getOneById.absolute(boardId)
      );
      const tasks = column?.tasks;
      const newTasks = tasks?.filter((task) => taskId !== task.id);
      if (column && newTasks) {
        const updater: Updater<IColumn | undefined, IColumn> = {
          ...column,
          tasks: newTasks,
        };
        queryClient.setQueryData(
          pathRoutes.columns.getOneById.absolute(boardId, columnId),
          updater
        );
      }
    }, */
    onError: () => {
      toast.error('Failed to remove task!', toastOption);
    },
  });

  const onClickOutside = () => {
    setRemove(false);
  };

  const onLabelClick = () => {
    setRemove(true);
  };

  const onCanselClick = () => {
    setRemove(false);
  };

  const onOkClick = () => {
    mutate();
    setRemove(false);
  };

  return {
    isRemove,
    onLabelClick,
    onClickOutside,
    onOkClick,
    onCanselClick,
  };
}
