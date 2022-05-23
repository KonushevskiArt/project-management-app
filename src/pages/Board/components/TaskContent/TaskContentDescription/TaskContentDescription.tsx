import useTaskDescriptionEdit from 'hooks/useTaskDescriptionEdit';
import { IoMdList as DescriptionIcon } from 'react-icons/io';
import styles from '../task-content.module.scss';
import TaskContentDescriptionEdit from './TaskContentDescriptionEdit';

interface IProps {
  description: string;
}

export const defaultDescription = 'Add a more detailed description...';

const TaskContentDescription = ({ description }: IProps) => {
  const { newDescription, isEdit, isLoading, handlers } = useTaskDescriptionEdit(
    description === ' ' ? '' : description
  );
  console.log(newDescription);
  return (
    <section className={styles.description}>
      <DescriptionIcon className={styles.icon} />
      <h3 className={styles.subtitle}>Description</h3>
      {isEdit ? (
        <TaskContentDescriptionEdit
          value={newDescription}
          placeholder={defaultDescription}
          onChange={handlers.onChange}
          onCancelClick={handlers.onCancelClick}
          onSaveClick={handlers.onSaveClick}
          isDisabled={isLoading}
        />
      ) : (
        <div className={styles.description_text} onClick={handlers.onClick}>
          {newDescription === '' ? defaultDescription : description}
        </div>
      )}
    </section>
  );
};

export default TaskContentDescription;
