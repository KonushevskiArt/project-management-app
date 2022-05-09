import styles from './creat-card-form.module.scss';
import { ReactComponent as CloseIcon } from './cars-close.svg';
import useCreatCardForm from 'hooks/useCreatCardForm';

interface IProps {
  onCloseClick: (event: { preventDefault: () => void }) => void;
}

const CreatCardForm = ({ onCloseClick }: IProps) => {
  const { /* textareaState */ handlers, textareaEl } = useCreatCardForm();

  return (
    <form onSubmit={handlers.onSubmit}>
      <span className={styles['textarea-box']}>
        <textarea
          onKeyDown={handlers.onKeyDown}
          className={styles.textarea}
          placeholder="Enter a title for this card…"
          defaultValue=""
          /*   onInput={handlers.onInput} */
          autoFocus
          ref={textareaEl}
        />
      </span>
      <span className={styles.buttons}>
        <input className={styles['submit-button']} type="submit" value="Add card"></input>
        <button className={styles['close-button']} onClick={onCloseClick}>
          <CloseIcon className={styles['close-icon']} />
        </button>
      </span>
    </form>
  );
};

export default CreatCardForm;
