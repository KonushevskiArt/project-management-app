import { useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import { routes } from 'utils/routes';
import { TaskService } from 'utils/services/Task.service';
import { getNewTaskBody } from 'utils/tasksService';

export interface IGetBoardById {
  boardId: string;
}
export interface IGetColumnById extends IGetBoardById {
  columnId: string;
}

export interface ICreatTask extends IGetColumnById {
  body: {
    title: string;
    order: number;
    description: string;
    userId: string;
  };
}
export interface IGetTaskById extends IGetColumnById {
  taskId: string;
}

const useCreatCardForm = () => {
  const textareaEl = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { boardId = '', columnId = '' } = useParams();

  const { isLoading, isSuccess, isError, mutate } = useMutation({
    mutationFn: (props: ICreatTask) => TaskService.create(props),
    onSuccess: () => queryClient.invalidateQueries(routes.boards.absolute(boardId)),
  });
  useEffect(() => {
    if (textareaEl && textareaEl.current) {
      textareaEl.current.focus();
    }
  });

  const submitValue = async (value: string) => {
    const newTaskBody = await getNewTaskBody({
      boardId,
      columnId,
      title: value,
    });
    mutate(newTaskBody);
  };

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const textarea: HTMLTextAreaElement | null = textareaEl.current;
    if (textarea) {
      const value = textarea.value.trim();
      if (value) {
        submitValue(value);
        textarea.value = '';
      }
    }
  };

  const onKeyDown = (event: { key?: string; preventDefault: () => void }) => {
    if (event.key === 'Enter') {
      onSubmit(event);
    }
  };

  const onCloseClick = () => navigate(`/boards/${boardId}`);

  return {
    handlers: {
      onSubmit,
      onKeyDown,
      onCloseClick,
    },
    isDisabled: isLoading,
    textareaEl,
  };
};

export default useCreatCardForm;
