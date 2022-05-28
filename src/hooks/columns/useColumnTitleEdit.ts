import { IColumn, IUpdateColumn } from 'interfaces';
import { FormEventHandler, useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import { ColumnService } from 'utils/services/Column.service';

export default function (column: IColumn) {
  const { boardId = '' } = useParams();
  const queryClient = useQueryClient();
  const { title, id: columnId } = column;
  const [newTitle, setValue] = useState(title);
  const [isTitleEdit, setIsTitleEdit] = useState(false);

  const { mutate, data } = useMutation({
    mutationFn: (props: IUpdateColumn) => ColumnService.updateOneById(boardId, columnId, props),
    onSuccess: () => {
      console.log(data);
      queryClient.invalidateQueries(pathRoutes.board.getOneById.absolute(boardId));
    },
  });

  const onChange: FormEventHandler<HTMLInputElement> = (e) => {
    setValue((e.target as HTMLTextAreaElement).value);
  };

  const onKeyDown: FormEventHandler<HTMLInputElement> = (event) => {
    if ((event as { key?: string }).key === 'Enter') {
      onSubmit();
    }
  };

  const onCancel = () => {
    setValue(title);
    setIsTitleEdit(false);
  };

  const onSubmit = () => {
    console.log('onSubmit');
    if (column && newTitle?.trim()) {
      mutate({
        title: newTitle.trim(),
        order: column.order,
      });
    }
    setValue(newTitle?.trim());
    setIsTitleEdit(false);
  };

  const onClick = () => setIsTitleEdit(true);

  return {
    newTitle,
    isTitleEdit,
    setIsTitleEdit,
    handlers: {
      onKeyDown,
      onChange,
      onClick,
      onCancel,
      onSubmit,
    },
  };
}
