import React from 'react';
import style from './menu.module.css';

export default function (props) {
  let height = props.height ? style.height : style.heightAuto;
  return (
    <nav className={style.menu + ' ' + height}>
      <ul>{props.children}</ul>
    </nav>
  );
}
