import { ImAttachment as AttachmentIcon } from 'react-icons/im';
import { AiOutlineArrowRight as MoveIcon } from 'react-icons/ai';
import styles from './task-content-sidebar.module.scss';
import { ITEXT } from 'interfaces';
import { useLanguage } from 'hooks/useLanguage';

const TEXT_TASK_CONTENT_SIDEBAR: ITEXT = {
  title: {
    en: 'Add to card',
    ru: 'Добавить на карточку',
  },
  attachment: {
    en: 'Attachment',
    ru: 'Вложения',
  },
  move: {
    en: 'Move',
    ru: 'Перемещение',
  },
};

const TaskContentSidebar = () => {
  const lang = useLanguage();

  return (
    <aside className={styles.container}>
      <div>
        <h4 className={styles.title}>{TEXT_TASK_CONTENT_SIDEBAR.title[lang]}</h4>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <AttachmentIcon className={styles['li-icon']} />
            <span className={styles['li-text']}>Attachment</span>
          </li>
        </ul>
      </div>
      <div>
        <h4 className={styles.title}>{TEXT_TASK_CONTENT_SIDEBAR.attachment[lang]}</h4>
        <ul className={styles.ul}>
          <li className={styles.li}>
            <MoveIcon className={styles['li-icon']} />
            <span className={styles['li-text']}>{TEXT_TASK_CONTENT_SIDEBAR.move[lang]}</span>
          </li>
        </ul>
      </div>
    </aside>
  );
};
export default TaskContentSidebar;
