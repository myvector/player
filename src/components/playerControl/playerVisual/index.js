import React from 'react';
import style from './visual.module.css';

export default function(props) {
  return (
    <div className={style.visual}>
      <div className={style.visualInner}>
        <img src={props.src}></img>
      </div>
    </div>
  );
}
