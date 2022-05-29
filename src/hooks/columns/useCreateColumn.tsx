import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ToastOptions, toast } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
import { ColumnService } from 'utils/services/Column.service';
import { INewColumn } from 'interfaces';
import { useLanguage } from 'hooks/useLanguage';

const toastOption = {
  position: 'bottom-right',
  hideProgressBar: true,
  autoClose: 2000,
} as ToastOptions;

interface ILANG {
  [key: string]: string;
}

interface ITEXT {
  [key: string]: ILANG;
}

const TEXT_PAGE: Readonly<ITEXT> = {
  errorMessage: {
    en: 'Column creating failed by network error!',
    ru: 'Создание столбца не удалось из-за сетевой ошибки!',
  },
  successMessage: {
    en: 'Column created successfully!',
    ru: 'Колонка создана успешно!',
  },
};

export const useCreateColumn = (
  boardId: string,
  setIsAddingColumn: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const lang = useLanguage();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(
    (newColumn: INewColumn) => {
      return ColumnService.create(boardId, newColumn);
    },
    {
      onError: () => {
        toast.error(TEXT_PAGE.errorMessage[lang], toastOption);
      },
      onSuccess: () => {
        setIsAddingColumn(false);
        queryClient.invalidateQueries(pathRoutes.board.getOneById.absolute(boardId));
      },
    }
  );

  return { mutate, isLoading };
};
