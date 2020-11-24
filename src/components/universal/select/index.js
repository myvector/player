import React from 'react';
import style from './select.module.css';

export default function (props) {
  return (
    <div className={style.select} onClick={props.onClick}>
      <p className={style.selectText}>{props.text}</p>
    </div>
  );
}
