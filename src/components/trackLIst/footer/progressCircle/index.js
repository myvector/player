import React from 'react';
import style from '../playFooter.module.css';

export default function(props) {
  return (
    <svg
      id={style.progressCircle}
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      x='0px'
      y='0px'
      viewBox='0 0 21 21'
      xmlSpace='preserve'
    >
      <g>
        <path
          className={style.backCircle}
          d='M10.5,0.5c5.5,0,10,4.5,10,10s-4.5,10-10,10s-10-4.5-10-10S5,0.5,10.5,0.5'
        />
        <path
          className={style.activeCircle}
          style={{
            strokeDashoffset: (63 - (63 * props.oneSecondLine) / 100).toFixed(4)
          }}
          d='M10.5,0.5c5.5,0,10,4.5,10,10s-4.5,10-10,10s-10-4.5-10-10S5,0.5,10.5,0.5'
        />
      </g>
    </svg>
  );
}
