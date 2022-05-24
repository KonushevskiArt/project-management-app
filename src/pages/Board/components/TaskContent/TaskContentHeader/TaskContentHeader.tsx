import { useLanguage } from 'hooks/useLanguage';
import { ITask, ITEXT, IUpdataTask } from 'interfaces';
import { FormEventHandler, useState } from 'react';
import { AiFillCreditCard as TitleIcon } from 'react-icons/ai';
import { IoMdClose as CloseIcon } from 'react-icons/io';
import { useMutation, useQueryClient } from 'react-query';
import { useParams } from 'react-router';
import { pathRoutes } from 'utils/pathRoutes';
import { TaskService } from 'utils/services/Task.service';
import styles from '../task-content.module.scss';
import TaskTitleEdit from './TaskTitleEdit';

const TEXT_TASK_CONTENT_HEADER: ITEXT = {
  inList: {
    en: 'in list',
    ru: 'в колонке',
  },
};

interface IProps {
  title: string;
  columnTitle?: string;
  onCloseClick: () => void;
}

const TaskContentHeader = ({ title, columnTitle, onCloseClick }: IProps) => {
  const { boardId = '', columnId = '', taskId = '' } = useParams();
  const [value, setValue] = useState(title);
  const [isTitleEdit, setIsTitleEdit] = useState(false);
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: (props: IUpdataTask) => TaskService.updateOneById(taskId, props),
    onSuccess: () => {
      queryClient.invalidateQueries(pathRoutes.task.getOneById.absolute(boardId, columnId, taskId));
    },
  });
  const lang = useLanguage();
  const task = queryClient.getQueryData<ITask | undefined>(
    pathRoutes.task.getOneById.absolute(boardId, columnId, taskId)
  );
  const onChange: FormEventHandler<HTMLInputElement> = (e) => {
    setValue((e.target as HTMLTextAreaElement).value);
  };

  const onBlur: FormEventHandler<HTMLInputElement> = () => {
    if (task && value.trim()) {
      mutate({
        title: value.trim(),
        order: task.order,
        description: task.description,
        userId: task.userId,
        boardId,
        columnId,
      });
    }
    setValue(value.trim());
    setIsTitleEdit(false);
  };

  const onClick = () => setIsTitleEdit(true);

  return (
    <header className={styles.header}>
      <TitleIcon className={styles.icon} />
      {isTitleEdit ? (
        <TaskTitleEdit value={value} onChange={onChange} onBlur={onBlur} />
      ) : (
        <h2 className={styles.title} onClick={onClick}>
          {value}
        </h2>
      )}
      <p className={styles.subtext}>
        {TEXT_TASK_CONTENT_HEADER.inList[lang]} <span className={styles.column}>{columnTitle}</span>{' '}
      </p>
      <span className={styles.close} onClick={onCloseClick}>
        <CloseIcon className={styles['close-icon']} />
      </span>
    </header>
  );
};

export default TaskContentHeader;
