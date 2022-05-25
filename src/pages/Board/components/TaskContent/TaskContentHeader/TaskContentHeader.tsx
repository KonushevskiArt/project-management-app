import useTaskTitleEdit from 'hooks/tasks/useTaskTitleEdit';
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
  const { newTitle, isTitleEdit, handlers } = useTaskTitleEdit(title);

  const lang = useLanguage();

  return (
    <header className={styles.header}>
      <TitleIcon className={styles.icon} />
      {isTitleEdit ? (
        <TaskTitleEdit
          value={newTitle}
          onChange={handlers.onChange}
          onBlur={handlers.onBlur}
          onKeyDown={handlers.onKeyDown}
        />
      ) : (
        <h2 className={styles.title} onClick={handlers.onClick}>
          {newTitle}
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
