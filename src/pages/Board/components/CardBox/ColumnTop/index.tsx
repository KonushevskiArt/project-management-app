import React, { FocusEvent, useState } from 'react';
import s from './style.module.scss';

interface IProps {
  name?: string;
}

const ColumnTop = ({ name = 'some name' }: IProps) => {
  const [isEditName, setIsEditName] = useState(false);

  const clickTitleHandler = () => {
    setIsEditName(true);
  };

  const changeHandler = () => {
    console.log('name input change');
  };

  const blurInputHandler = (e: FocusEvent<HTMLInputElement>) => {
    setIsEditName(false);
    if (e.currentTarget) {
      console.log(e.currentTarget.value);
    }
  };

  return (
    <div className={s.columnTop}>
      {!isEditName ? (
        <h3 onClick={clickTitleHandler} className={s.title}>
          {name}
        </h3>
      ) : (
        <div className={s.inputWrapper}>
          <input
            autoFocus
            onChange={changeHandler}
            onBlur={blurInputHandler}
            className={s.titleInput}
            type="text"
            value={name}
          />
        </div>
      )}
      <button onClick={() => console.log('show menu')} className={`${s.button} ${s.buttonEdit}`}>
        <svg width="12" height="12" fill="var(--text-color-gray)">
          <use xlinkHref="sprite.svg#menu"></use>
        </svg>
      </button>
    </div>
  );
};

export default ColumnTop;
