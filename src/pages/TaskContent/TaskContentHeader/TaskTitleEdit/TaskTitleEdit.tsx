import { FormEventHandler, useEffect, useRef, useState } from 'react';
import styles from './task-title-edit.module.scss';

interface IProps {
  value: string;
  onChange: FormEventHandler<HTMLTextAreaElement>;
  onBlur: FormEventHandler<HTMLTextAreaElement>;
}

const TaskTitleEdit = ({ value, onChange, onBlur }: IProps) => {
  const textareaEl = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaEl && textareaEl.current) {
      textareaEl.current.selectionStart = value.length;
      textareaEl.current.selectionEnd = value.length;
    }
  }, [value]);
  return (
    <textarea
      className={styles.edit_form}
      defaultValue={value}
      onChange={onChange}
      onBlur={onBlur}
      autoFocus
      ref={textareaEl}
    ></textarea>
  );
};

export default TaskTitleEdit;
