import styles from './column-control.module.scss';
import { FaEllipsisH as ControlIcon } from 'react-icons/fa';
import ColumnControlDropdown from '../ColumnControlDropdown';
import { RefObject, useCallback, useEffect, useRef, useState } from 'react';
import { useDeleteColumnById } from 'hooks/columns/useDeleteColumnById';
import Modal from 'components/Modal';
import ConfirmPopup from 'components/ConfirmPopup';
import { ITEXT } from 'interfaces';
import { useLanguage } from 'hooks/useLanguage';
import useControlColumn from 'hooks/columns/useControlColumn';

const TEXT_COLUMN_CONTROL: ITEXT = {
  title: {
    en: 'List Actions',
    ru: 'Действия со списком',
  },
  remove: {
    en: 'Delete list?',
    ru: 'Удалить список?',
  },
};

interface IProps {
  boardId: string;
  columnId: string;
}

const ColumnControl = ({ boardId, columnId }: IProps) => {
  const { controlRef, isControlOpen, isRemove, handlers } = useControlColumn(boardId, columnId);
  const lang = useLanguage();

  return (
    <div className={styles.container} ref={controlRef} data-id={columnId}>
      <button className={styles.button} disabled={isControlOpen} onClick={handlers.onOpenClick}>
        <ControlIcon className={styles.icon} />
      </button>
      {isControlOpen && (
        <ColumnControlDropdown
          title={TEXT_COLUMN_CONTROL.title[lang]}
          onCloseClick={handlers.onCloseClick}
          onEditClick={handlers.onEditClick}
          onRemoveClick={handlers.onRemoveClick}
        />
      )}
      {isRemove && (
        <Modal handleClickOutside={handlers.onCancelClick}>
          <ConfirmPopup
            title={TEXT_COLUMN_CONTROL.remove[lang]}
            onLeftClick={handlers.onCancelClick}
            onRightClick={handlers.onRemoveColumn}
          />
        </Modal>
      )}
    </div>
  );
};

export default ColumnControl;
