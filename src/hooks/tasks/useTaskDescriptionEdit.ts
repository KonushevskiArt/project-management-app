import { ITask, IUpdateTask } from 'interfaces';
import { FormEventHandler, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { toast, ToastOptions } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
import { TaskService } from 'utils/services/Task.service';

const toastOption: ToastOptions = {
  position: 'bottom-right',
  hideProgressBar: true,
  autoClose: 2000,
};

export default function (task: ITask) {
  const { description } = task;
  const { boardId = '', columnId = '', taskId = '' } = useParams();
  const [isEdit, setIsEdit] = useState(false);

  const [newDescription, setValue] = useState(description);

  const queryClient = useQueryClient();

  const { isLoading, mutate } = useMutation({
    mutationFn: (props: IUpdateTask) => TaskService.updateOneById(boardId, columnId, taskId, props),
    onSuccess: () => {
      setIsEdit(false);
      setValue(newDescription);
      queryClient.invalidateQueries(pathRoutes.board.getOneById.absolute(boardId));
    },
    onError: () => {
      toast.error('Failed to edit description!', toastOption);
    },
  });

  const onClick = () => setIsEdit(true);

  const onChange: FormEventHandler<HTMLTextAreaElement> = (e) => {
    setValue((e.target as HTMLTextAreaElement).value);
  };
  const onCancelClick = () => {
    setValue(description);
    setIsEdit(false);
  };

  const onSaveClick = () => {
    setValue(newDescription.trim());
    if (task) {
      mutate({
        title: task.title,
        order: task.order,
        description: newDescription || ' ',
        userId: task.userId,
        boardId,
        columnId,
      });
    }
  };

  return {
    newDescription,
    isEdit,
    isLoading,
    handlers: {
      onClick,
      onChange,
      onCancelClick,
      onSaveClick,
    },
  };
}
