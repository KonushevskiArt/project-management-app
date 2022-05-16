import { ImAttachment as AttachmentIcon } from 'react-icons/im';
import { AiOutlineArrowRight as MoveIcon } from 'react-icons/ai';
import styles from './task-content-sidebar.module.scss';

const TaskContentSidebar = () => (
  <aside className={styles.container}>
    <div>
      <h4 className={styles.title}>Add to card</h4>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <AttachmentIcon className={styles['li-icon']} />
          <span className={styles['li-text']}>Attachment</span>
        </li>
      </ul>
    </div>
    <div>
      <h4 className={styles.title}>Actions</h4>
      <ul className={styles.ul}>
        <li className={styles.li}>
          <MoveIcon className={styles['li-icon']} />
          <span className={styles['li-text']}>Move</span>
        </li>
      </ul>
    </div>
  </aside>
);

export default TaskContentSidebar;
