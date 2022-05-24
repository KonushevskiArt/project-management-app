import { FormEventHandler, useEffect, useRef, useState } from 'react';
import styles from './task-title-edit.module.scss';

interface IProps {
  value: string;
  onChange: FormEventHandler<HTMLInputElement>;
  onBlur: FormEventHandler<HTMLInputElement>;
  onKeyDown: FormEventHandler<HTMLInputElement>;
}

const TaskTitleEdit = ({ value, onChange, onBlur, onKeyDown }: IProps) => {
  const textareaEl = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (textareaEl && textareaEl.current) {
      textareaEl.current.selectionStart = value.length;
      textareaEl.current.selectionEnd = value.length;
    }
  }, []);
  return (
    <input
      className={styles.edit_form}
      defaultValue={value}
      onChange={onChange}
      onBlur={onBlur}
      onKeyDown={onKeyDown}
      autoFocus
      ref={textareaEl}
    ></input>
  );
};

export default TaskTitleEdit;
