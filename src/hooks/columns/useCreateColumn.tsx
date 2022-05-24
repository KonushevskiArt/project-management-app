import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ToastOptions, toast } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
import { ColumnService } from 'utils/services/Column.service';
import { INewColumn } from 'interfaces';

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
    pathRoutes.column.create.absolute(boardId),
    (newColumn: INewColumn) => {
      return ColumnService.create(boardId, newColumn);
    },
    {
      onError: (error: Error) => {
        console.log(error);
        toast.error('Column creating failed by network error!', toastOption);
      },
      onSuccess: () => {
        setIsAddingColumn(false);
        toast.success('Column created successfuly!', toastOption);
        queryClient.invalidateQueries(pathRoutes.board.getOneById.absolute(boardId));
      },
    }
  );

  return { mutate, isLoading };
};
