import { ITask, IUpdateTask } from 'interfaces';
import { FormEventHandler, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import { TaskService } from 'utils/services/Task.service';

export default function (task: ITask) {
  const { boardId = '', columnId = '', taskId = '' } = useParams();
  const [newTitle, setValue] = useState(task.title);
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (props: IUpdateTask) => TaskService.updateOneById(boardId, columnId, taskId, props),
    onSuccess: () => {
      queryClient.invalidateQueries(pathRoutes.board.getOneById.absolute(boardId));
    },
  });

  const onChange: FormEventHandler<HTMLInputElement> = (e) => {
    setValue((e.target as HTMLTextAreaElement).value);
  };

  const onKeyDown: FormEventHandler<HTMLInputElement> = (event) => {
    if ((event as { key?: string }).key === 'Enter') {
      onSubmit();
    }
  };

  const onCancel = () => {
    setValue(task.title);
    setIsTitleEdit(false);
  };

  const onSubmit = () => {
    if (task && newTitle.trim()) {
      mutate({
        title: newTitle.trim(),
        order: task.order,
        description: task.description,
        userId: task.userId,
        boardId,
        columnId,
      });
    }
    setValue(newTitle.trim());
    setIsTitleEdit(false);
  };

  const onClick = () => setIsTitleEdit(true);

  return {
    newTitle,
    isTitleEdit,
    setIsTitleEdit,
    handlers: {
      onKeyDown,
      onChange,
      onClick,
      onCancel,
      onSubmit,
    },
  };
}
