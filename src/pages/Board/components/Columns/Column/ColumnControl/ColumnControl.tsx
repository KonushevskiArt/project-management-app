import styles from './styles.module.scss';
import { FaEllipsisH as ControlIcon } from 'react-icons/fa';
import ColumnControlDropdown from '../ColumnControlDropdown';
import { Dispatch, SetStateAction } from 'react';
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
  setIsTitleEdit: Dispatch<SetStateAction<boolean>>;
}

const ColumnControl = ({ boardId, columnId, setIsTitleEdit }: IProps) => {
  const { isControlOpen, isRemove, handlers } = useControlColumn(boardId, columnId);
  const lang = useLanguage();
  const onEdit = () => {
    setIsTitleEdit(true);
    handlers.onEditClick();
  };

  return (
    <div className={styles.container} data-id={columnId}>
      <button className={styles.button} disabled={isControlOpen} onClick={handlers.onOpenClick}>
        <ControlIcon className={styles.icon} />
      </button>
      {isControlOpen && (
        <ColumnControlDropdown
          title={TEXT_COLUMN_CONTROL.title[lang]}
          onCloseClick={handlers.onCloseClick}
          onEditClick={onEdit}
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
