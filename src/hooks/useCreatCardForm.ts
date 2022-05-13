import mockApi from 'MockApi';
import { useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router';

const useCreatCardForm = () => {
  const textareaEl = useRef(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { boardId = '', columnId = '' } = useParams();

  const { isLoading, isSuccess, isError, mutate } = useMutation(
    (newTask: { title: string; order: number; description: string }) =>
      mockApi.creatTask({ boardId, columnId, body: { ...newTask, userId: '' } }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['tasks', boardId, columnId]);
      },
    }
  );

  const submitValue = (value: string) => {
    console.log(`submit: ${value}`);
    mutate({
      title: value,
      order: 5,
      description: '',
    });
  };

  const onSubmit = (event: { preventDefault: () => void }) => {
    event.preventDefault();

    const textarea: HTMLTextAreaElement | null = textareaEl.current;
    if (textarea) {
      const value = (textarea as HTMLTextAreaElement).value.trim();
      if (value) {
        submitValue(value);
        (textarea as HTMLTextAreaElement).value = '';
      }
      (textarea as HTMLTextAreaElement).focus();
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
