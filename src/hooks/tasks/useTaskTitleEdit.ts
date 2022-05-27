import { useLanguage } from 'hooks/useLanguage';
import { ITask, IUpdataTask } from 'interfaces';
import { FormEventHandler, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import { TaskService } from 'utils/services/Task.service';

export default function (title: string) {
  const { boardId = '', columnId = '', taskId = '' } = useParams();
  const [newTitle, setValue] = useState(title);
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (props: IUpdataTask) => TaskService.updateOneById(taskId, props),
    onSuccess: () => {
      queryClient.invalidateQueries(pathRoutes.task.getOneById.absolute(boardId, columnId, taskId));
    },
  });
  const task = queryClient.getQueryData<ITask | undefined>(
    pathRoutes.task.getOneById.absolute(boardId, columnId, taskId)
  );
  const onChange: FormEventHandler<HTMLInputElement> = (e) => {
    setValue((e.target as HTMLTextAreaElement).value);
  };

  const onKeyDown: FormEventHandler<HTMLInputElement> = (event) => {
    if ((event as { key?: string }).key === 'Enter') {
      onSubmit();
    }
  };

  const onCancel = () => {
    setValue(title);
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
