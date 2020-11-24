import React from 'react';
import style from './setting.module.css';

export default function (props) {
  return (
    <svg
      onClick={props.click}
      version='1.1'
      id='Слой_1'
      x='0px'
      y='0px'
      className={style.circle}
      xmlSpace='preserve'
      style={{ width: '6px', height: '18px', fill: '#fff' }}
    >
      <g>
        <circle className={style.st0} cx='2.5' cy='2.5' r='2.5' />
        <circle className={style.st0} cx='2.5' cy='15' r='2.5' />
        <circle className={style.st0} cx='2.5' cy='8.8' r='2.5' />
      </g>
    </svg>
  );
}
