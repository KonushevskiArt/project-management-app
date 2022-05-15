import { BoardCtx } from 'pages/Board';
import React from 'react';
import { useMutation } from 'react-query';
import { toast, ToastOptions } from 'react-toastify';
import { ColumnService } from 'utils/services/Column.service';

export const useDeleteColumnById = (boardId: string, columnId: string) => {
  const { removeColumn } = React.useContext(BoardCtx);
  const toastOption = {
    position: 'bottom-center',
    hideProgressBar: true,
    autoClose: 5000,
  } as ToastOptions;

  const { mutate, isLoading } = useMutation(
    'delete column' + columnId,
    () => ColumnService.deleteColumnById(boardId, columnId),
    {
      onError: (error: Error) => {
        console.log(error);
        toast.error('Failed remove by network error!', toastOption);
      },
      onSuccess: () => {
        removeColumn(columnId);
        toast.success('Column deleted successfuly!', toastOption);
      },
    }
  );

  return { mutate, isLoading };
};
