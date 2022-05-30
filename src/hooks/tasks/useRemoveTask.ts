import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { toast, ToastOptions } from 'react-toastify';
import { pathRoutes } from 'utils/pathRoutes';
import { TaskService } from 'utils/services/Task.service';

const toastOption: ToastOptions = {
  position: 'bottom-right',
  hideProgressBar: true,
  autoClose: 2000,
};

export default function (columnId: string, taskId: string) {
  const { boardId = '' } = useParams();
  const [isRemove, setRemove] = useState(false);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: () => TaskService.deleteOneById(boardId, columnId, taskId),
    onSuccess: () => {
      queryClient.invalidateQueries(pathRoutes.board.getOneById.absolute(boardId));
    },

    onError: () => {
      toast.error('Failed to remove task!', toastOption);
    },
  });

  const onClickOutside = () => {
    setRemove(false);
  };

  const onLabelClick = () => {
    setRemove(true);
  };

  const onCanselClick = () => {
    setRemove(false);
  };

  const onOkClick = () => {
    mutate();
    setRemove(false);
  };

  return {
    isRemove,
    onLabelClick,
    onClickOutside,
    onOkClick,
    onCanselClick,
  };
}
