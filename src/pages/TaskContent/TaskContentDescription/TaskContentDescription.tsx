import useTaskDescriptionEdit from 'hooks/useTaskDescriptionEdit';
import { FormEventHandler, useState } from 'react';
import { IoMdList as DescriptionIcon } from 'react-icons/io';
import styles from '../task-content.module.scss';
import TaskContentDescriptionEdit from './TaskContentDescriptionEdit';

interface IProps {
  description: string;
}

export const defaultDescription = 'Add a more detailed description...';

const TaskContentDescription = ({ description }: IProps) => {
  const { value, isEdit, isLoading, handlers } = useTaskDescriptionEdit(
    description === '_' ? '' : description
  );

  return (
    <section className={styles.description}>
      <DescriptionIcon className={styles.icon} />
      <h3 className={styles.subtitle}>Description</h3>
      {isEdit ? (
        <TaskContentDescriptionEdit
          value={value}
          placeholder={defaultDescription}
          onChange={handlers.onChange}
          onCancelClick={handlers.onCancelClick}
          onSaveClick={handlers.onSaveClick}
          isDisabled={isLoading}
        />
      ) : (
        <div className={styles.description_text} onClick={handlers.onClick}>
          {description === '_' ? defaultDescription : description}
        </div>
      )}
    </section>
  );
};

export default TaskContentDescription;
