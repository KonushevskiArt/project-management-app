import { FormEventHandler, useState } from 'react';
import { AiFillCreditCard as TitleIcon } from 'react-icons/ai';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import styles from '../task-content.module.scss';
import TaskTitleEdit from './TaskTitleEdit';

interface IProps {
  title: string;
  columnTitle?: string;
  onCloseClick: () => void;
}

const TaskContentHeader = ({ title, columnTitle, onCloseClick }: IProps) => {
  const [value, setValue] = useState(title);
  const [isTitleEdit, setIsTitleEdit] = useState(false);

  const onChange: FormEventHandler<HTMLTextAreaElement> = (e) => {
    setValue((e.target as HTMLTextAreaElement).value);
  };
  const onBlur: FormEventHandler<HTMLTextAreaElement> = () => {
    setIsTitleEdit(false);
    console.log(value);
  };

  const onClick = () => setIsTitleEdit(true);

  return (
    <header className={styles.header}>
      <TitleIcon className={styles.icon} />
      {isTitleEdit ? (
        <TaskTitleEdit value={value} onChange={onChange} onBlur={onBlur} />
      ) : (
        <h2 className={styles.title} onClick={onClick}>
          {title}
        </h2>
      )}
      <p className={styles.subtext}>
        in list <span className={styles.column}>{columnTitle}</span>{' '}
      </p>
      <span className={styles.close} onClick={onCloseClick}>
        <CloseIcon className={styles['close-icon']} />
      </span>
    </header>
  );
};

export default TaskContentHeader;
