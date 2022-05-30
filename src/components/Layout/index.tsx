import React from 'react';
import s from './modal.module.scss';

type Props = {
  children: JSX.Element;
};

const Layout = ({ children }: Props) => {
  return (
    <div className={s.wrapper__box}>
      <div className={s.wrapper}>{children}</div>
    </div>
  );
};

export default Layout;
