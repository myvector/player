import React from 'react';
import style from './sort.module.css';

export default function (props) {
  return (
    <div className={style.sort}>
      <h5 className={style.title}>Сортировка треков</h5>
      <div onClick={props.sort} className={style.text}>
        По названию
      </div>
    </div>
  );
}
