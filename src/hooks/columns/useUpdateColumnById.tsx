import { useLanguage } from 'hooks/useLanguage';
import { IColumn, IUpdateColumn } from 'interfaces';
import { useMutation, useQueryClient } from 'react-query';
import { toast, ToastOptions } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
import { ColumnService } from 'utils/services/Column.service';

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
    en: 'Column updating failed by network error!',
    ru: 'Обновление колонки не удалось из-за сетевой ошибки!',
  },
};

export const useUpdateColumnById = (
  boardId: string,
  columnId: string,
  setColumns: React.Dispatch<React.SetStateAction<IColumn[]>>,
  oldColumns: IColumn[]
) => {
  const queryClient = useQueryClient();
  const lang = useLanguage();

  const { mutate, isLoading } = useMutation(
    pathRoutes.columns.updateOneById.absolute(boardId, columnId),
    (updatedColumn: IUpdateColumn) => ColumnService.updateOneById(boardId, columnId, updatedColumn),
    {
      onError: () => {
        setColumns(oldColumns);
        toast.error(TEXT_PAGE.errorMessage[lang], toastOption);
      },
      onSuccess: () => {
        // queryClient.invalidateQueries(pathRoutes.board.getOneById.absolute(boardId));
      },
    }
  );

  return { mutate, isLoading };
};
