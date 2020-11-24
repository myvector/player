import React from 'react';
import style from './modal.module.css';

export default function (props) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
      }}
      className={style.modal}
    >
      {props.children}
    </div>
  );
}
