import { FormEventHandler, useEffect, useRef } from 'react';
import styles from '../task-content-discription.module.scss';

interface IProps {
  placeholder: string;
  value: string;
  onChange: FormEventHandler<HTMLTextAreaElement>;
  isDisabled: boolean;
  onCancelClick: () => void;
  onSaveClick: () => void;
}

const TaskContentDescriptionEdit = ({
  placeholder,
  value,
  onChange,
  onCancelClick,
  onSaveClick,
  isDisabled,
}: IProps) => {
  const textareaEl = useRef<HTMLTextAreaElement>(null);
  useEffect(() => {
    if (textareaEl && textareaEl.current) {
      textareaEl.current.selectionStart = value.length;
    }
  }, []);
  return (
    <div>
      <textarea
        className={styles.edit_form}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        autoFocus
        ref={textareaEl}
        disabled={isDisabled}
      ></textarea>
      <div className={styles.buttons}>
        <button className={styles.button_save} onClick={onSaveClick} disabled={isDisabled}>
          Save
        </button>
        <button className={styles.button_cancel} onClick={onCancelClick} disabled={isDisabled}>
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskContentDescriptionEdit;
