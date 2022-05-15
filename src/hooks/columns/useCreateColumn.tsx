import { AxiosResponse } from 'axios';
import { BoardCtx } from 'pages/Board';
import React from 'react';
import { useMutation } from 'react-query';
import { ToastOptions, toast } from 'react-toastify';
import { ColumnService } from 'utils/services/Column.service';
import { INewColumn, IResponseNewColumn } from 'utils/services/models';

export const useCreateColumn = (
  boardId: string,
  setIsAddingColumn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { addColumn } = React.useContext(BoardCtx);
  const toastOption = {
    position: 'bottom-center',
    hideProgressBar: true,
    autoClose: 5000,
  } as ToastOptions;

  const { mutate, isLoading } = useMutation(
    'add new column',
    (newColumn: INewColumn) => {
      return ColumnService.createColumn(boardId, newColumn);
    },
    {
      onError: (error: Error) => {
        console.log(error);
        toast.error('Column creating failed by network error!', toastOption);
      },
      onSuccess: ({ data }: AxiosResponse<IResponseNewColumn>) => {
        const newColumn = data;
        addColumn(newColumn);
        setIsAddingColumn(false);
        toast.success('Column created successfuly!', toastOption);
      },
    }
  );

  return { mutate, isLoading };
};
