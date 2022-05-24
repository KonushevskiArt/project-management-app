import { useLanguage } from 'hooks/useLanguage';
import useTaskDescriptionEdit from 'hooks/tasks/useTaskDescriptionEdit';
import { ITEXT } from 'interfaces';
import { IoMdList as DescriptionIcon } from 'react-icons/io';
import styles from '../task-content.module.scss';
import TaskContentDescriptionEdit from './TaskContentDescriptionEdit';

const TEXT_TASK_CONTENT_DESCRIPTION: ITEXT = {
  title: {
    en: 'Description',
    ru: 'Описание',
  },
  defaultDescription: {
    en: 'Add a more detailed description...',
    ru: 'Добавить более подробное описание...',
  },
};

interface IProps {
  description: string;
}

const TaskContentDescription = ({ description }: IProps) => {
  const { newDescription, isEdit, isLoading, handlers } = useTaskDescriptionEdit(
    description === ' ' ? '' : description
  );

  const lang = useLanguage();

  return (
    <section className={styles.description}>
      <DescriptionIcon className={styles.icon} />
      <h3 className={styles.subtitle}>{TEXT_TASK_CONTENT_DESCRIPTION.title[lang]}</h3>
      {isEdit ? (
        <TaskContentDescriptionEdit
          value={newDescription}
          placeholder={TEXT_TASK_CONTENT_DESCRIPTION.defaultDescription[lang]}
          onChange={handlers.onChange}
          onCancelClick={handlers.onCancelClick}
          onSaveClick={handlers.onSaveClick}
          isDisabled={isLoading}
        />
      ) : (
        <div className={styles.description_text} onClick={handlers.onClick}>
          {newDescription === ''
            ? TEXT_TASK_CONTENT_DESCRIPTION.defaultDescription[lang]
            : description}
        </div>
      )}
    </section>
  );
};

export default TaskContentDescription;
