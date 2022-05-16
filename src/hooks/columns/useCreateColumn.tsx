import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ToastOptions, toast } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
import { ColumnService } from 'utils/services/Column.service';
import { INewColumn } from 'utils/services/models';

export const useCreateColumn = (
  boardId: string,
  setIsAddingColumn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
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
      onSuccess: () => {
        setIsAddingColumn(false);
        toast.success('Column created successfuly!', toastOption);
        queryClient.invalidateQueries(pathRoutes.column.getAll.absolute(boardId));
      },
    }
  );

  return { mutate, isLoading };
};
