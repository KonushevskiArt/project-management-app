import React, { useState } from 'react';
import s from './style.module.scss';
import AddIcon from '@mui/icons-material/Add';

const BoardCreater = () => {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperClasses = isOpen ? `${s.wrapper} ${s.wrapperActive}` : s.wrapper;
  const boardCreater = isOpen ? `${s.boardCreater} ${s.boardCreaterActive}` : s.boardCreater;
  return (
    <div className={boardCreater}>
      <div className={wrapperClasses}>
        {!isOpen && (
          <button onClick={() => setIsOpen(true)} className={s.btnAdd}>
            <AddIcon fontSize="large" />
          </button>
        )}
        {isOpen && (
          <input
            className={s.inputAdd}
            autoFocus={true}
            onBlur={() => setIsOpen(false)}
            type="text"
          />
        )}
      </div>
    </div>
  );
};

export default BoardCreater;
