import { creatTask } from 'api';
import mockApi from 'MockApi';
import { useRef } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';

const useCreatCardForm = () => {
  const textareaEl = useRef(null);
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { boardId = '', columnId = '' } = useParams();
  console.log(boardId);
  console.log(columnId);
  const onSuccess = () =>
    queryClient.invalidateQueries(pathRoutes.tasks.relative(boardId, columnId));

  const { isLoading, isSuccess, isError, mutate } = useMutation(creatTask(onSuccess));

  const submitValue = (value: string) => {
    console.log(`submit: ${value}`);
    mutate({
      boardId,
      columnId,
      body: {
        title: value,
        order: 5,
        description: '',
        userId: '',
      },
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
