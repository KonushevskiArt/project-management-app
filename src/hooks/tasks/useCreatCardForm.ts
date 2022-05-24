import { useEffect, useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import { toast, ToastOptions } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
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
    description: string;
    userId: string;
  };
}
export interface IGetTaskById extends IGetColumnById {
  taskId: string;
}

const toastOption: ToastOptions = {
  position: 'bottom-right',
  hideProgressBar: true,
  autoClose: 2000,
};

const useCreatCardForm = () => {
  const textareaEl = useRef<HTMLTextAreaElement>(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { boardId = '', columnId = '' } = useParams();

  const { isLoading, mutate } = useMutation({
    mutationFn: (props: ICreatTask) => TaskService.create(props),
    onSuccess: () => {
      queryClient.invalidateQueries(pathRoutes.columns.getOneById.absolute(boardId, columnId));
    },
    onError: () => {
      toast.error('Failed to create task!', toastOption);
    },
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
