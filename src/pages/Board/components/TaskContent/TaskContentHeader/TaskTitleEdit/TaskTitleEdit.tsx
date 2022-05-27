import { FormEventHandler, useEffect, useRef, useState } from 'react';
import styles from './task-title-edit.module.scss';

interface IProps {
  value: string;
  onChange: FormEventHandler<HTMLInputElement>;
  onSubmit: () => void;
  onKeyDown: FormEventHandler<HTMLInputElement>;
  onCancel: () => void;
}

const TaskTitleEdit = ({ value, onChange, onKeyDown, onSubmit, onCancel }: IProps) => {
  const textareaEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaEl && textareaEl.current) {
      textareaEl.current.selectionStart = value.length;
      textareaEl.current.selectionEnd = value.length;
    }
  }, []);
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.edit_form}
        defaultValue={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoFocus
        ref={textareaEl}
      ></input>
      <div className={styles.buttons}>
        <button className={styles.button_save} onClick={onSubmit}>
          save
        </button>
        <button className={styles.button_cancel} onClick={onCancel}>
          cancel
        </button>
      </div>
    </div>
  );
};

export default TaskTitleEdit;
