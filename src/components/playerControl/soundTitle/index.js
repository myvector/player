import React from 'react';
import style from './soundTitle.module.css';

function title(props) {
  return (
    <div>
      <h2 className={style.title}>{props.title}</h2>
      <p className={style.text}>{props.band}</p>
    </div>
  );
}
export default title;
