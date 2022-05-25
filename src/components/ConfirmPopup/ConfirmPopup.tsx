import { useLanguage } from 'hooks/useLanguage';
import { ITEXT } from 'interfaces';
import styles from './confirm-modal.module.scss';

const TEXT_CONFIRM_POPUP: ITEXT = {
  cancel: {
    en: 'cancel',
    ru: 'отмена',
  },
  ok: {
    en: 'ok',
    ru: 'да',
  },
};

interface IProps {
  title: string;
  onLeftClick: () => void;
  onRightClick: () => void;
}

const ConfirmPopup = ({ title, onLeftClick, onRightClick }: IProps) => {
  const lang = useLanguage();
  return (
    <div className={styles.wrapper}>
      <div className={styles.title}>{title}</div>
      <div className={styles.buttons}>
        <input
          type="submit"
          className={styles.button}
          onClick={onLeftClick}
          value={TEXT_CONFIRM_POPUP.cancel[lang]}
        />
        <input
          type="submit"
          className={styles.button}
          onClick={onRightClick}
          value={TEXT_CONFIRM_POPUP.ok[lang]}
          autoFocus={true}
        />
      </div>
    </div>
  );
};

export default ConfirmPopup;
