import { RefObject, useRef, useState } from 'react';
import { useDeleteColumnById } from './useDeleteColumnById';

export default function (boardId: string, columnId: string) {
  const { removeColumnHandler: onRemoveColumn } = useDeleteColumnById(boardId, columnId);
  const [isControlOpen, setIsControlOpen] = useState(false);
  const [isRemove, setIsRemove] = useState(false);
  const controlRef: RefObject<HTMLDivElement> = useRef(null);

  const onClickOutside = (ev: MouseEvent) => {
    const target: HTMLDivElement | null = (ev.target as HTMLDivElement)?.closest(`[ data-id]`);

    if (!target || target.dataset.id !== columnId) {
      onCloseClick();
    }
  };

  const onOpenClick = () => {
    window.addEventListener('click', onClickOutside, true);
    setIsControlOpen(true);
  };

  const onCloseClick = () => {
    window.removeEventListener('click', onClickOutside, true);
    setIsControlOpen(false);
  };
  const onEditClick = () => {
    console.log('onEditClick');
  };
  const onRemoveClick = () => {
    setIsRemove(true);
  };

  const onCancelClick = () => {
    setIsRemove(false);
    setIsControlOpen(true);
    window.addEventListener('click', onClickOutside, true);
  };

  return {
    controlRef,
    isControlOpen,
    isRemove,
    handlers: {
      onOpenClick,
      onCloseClick,
      onEditClick,
      onRemoveClick,
      onCancelClick,
      onRemoveColumn,
    },
  };
}
