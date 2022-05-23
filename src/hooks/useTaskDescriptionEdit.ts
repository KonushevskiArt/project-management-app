import { IColumn, ITask, IUpdatedTask } from 'interfaces';
import { FormEventHandler, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { routes } from 'utils/routes';
import { TaskService } from 'utils/services/Task.service';

export default function (description: string) {
  const { boardId = '', columnId = '', taskId = '' } = useParams();
  const [isEdit, setIsEdit] = useState(false);

  const [value, setValue] = useState(description);

  const queryClient = useQueryClient();

  const column = queryClient.getQueryData<IColumn | undefined>(
    routes.columns.absolute(boardId, columnId)
  );
  const task = column?.tasks?.find(({ id }: { id: string }) => id === taskId) as ITask | undefined;

  const { isLoading, isSuccess, isError, mutate } = useMutation({
    mutationFn: (props: IUpdatedTask) =>
      TaskService.updateOneById(boardId, columnId, taskId, props),
    onSuccess: () => {
      setIsEdit(false);
      queryClient.invalidateQueries(routes.columns.absolute(boardId, columnId));
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
    if (!value.trim()) {
      return;
    }
    if (task) {
      mutate({
        title: task.title,
        order: task.order,
        description: value.trim(),
        userId: task.userId,
        boardId,
        columnId,
      });
    }
    setValue(value.trim());
  };

  return {
    value,
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
