import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ToastOptions, toast } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
import { ColumnService } from 'utils/services/Column.service';
import { INewColumn } from 'interfaces';

const toastOption = {
  position: 'bottom-center',
  hideProgressBar: true,
  autoClose: 5000,
} as ToastOptions;

export const useCreateColumn = (
  boardId: string,
  setIsAddingColumn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (newColumn: INewColumn) => {
      return ColumnService.create(boardId, newColumn);
    },
    {
      onError: (error: Error) => {
        toast.error('Column creating failed by network error!', toastOption);
      },
      onSuccess: () => {
        setIsAddingColumn(false);
        queryClient.invalidateQueries(pathRoutes.board.getOneById.absolute(boardId));
      },
    }
  );

  return { mutate, isLoading };
};
