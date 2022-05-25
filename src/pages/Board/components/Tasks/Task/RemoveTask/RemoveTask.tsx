import ConfirmPopup from 'components/ConfirmPopup';
import Modal from 'components/Modal';
import useRemoveTask from 'hooks/tasks/useRemoveTask';
import { useLanguage } from 'hooks/useLanguage';
import { ITEXT } from 'interfaces';
import { AiFillDelete as RemoveIcon } from 'react-icons/ai';
import styles from '../task.module.scss';

const TEXT_REMOVE_TASK: ITEXT = {
  title: {
    en: 'Delete card?',
    ru: 'Удалить карточку?',
  },
};

interface IProps {
  columnId: string;
  taskId: string;
}

const RemoveTask = ({ columnId, taskId }: IProps) => {
  const lang = useLanguage();
  const { isRemove, onLabelClick, onClickOutside, onOkClick, onCanselClick } = useRemoveTask(
    columnId,
    taskId
  );

  return (
    <span>
      <RemoveIcon className={styles.remove} onClick={onLabelClick} />
      {isRemove && (
        <Modal handleClickOutside={onClickOutside}>
          <ConfirmPopup
            title={TEXT_REMOVE_TASK.title[lang]}
            onLeftClick={onCanselClick}
            onRightClick={onOkClick}
          />
        </Modal>
      )}
    </span>
  );
};

export default RemoveTask;
