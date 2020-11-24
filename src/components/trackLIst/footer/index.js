import React from 'react';
import style from './playFooter.module.css';

export default function (props) {
  let play = props.statePlay ? (
    <svg
      onClick={(e) => {
        e.stopPropagation();
        props.play();
      }}
      className={style.icon}
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      x='0px'
      y='0px'
      viewBox='0 0 16.2 17.1'
      xmlSpace='preserve'
    >
      <polygon className='st0' points='0,0 0,17.1 16.2,8.6 ' />
    </svg>
  ) : (
    <svg
      onClick={(e) => {
        e.stopPropagation();
        props.play();
      }}
      version='1.1'
      className={style.icon}
      xmlns='http://www.w3.org/2000/svg'
      xmlnsXlink='http://www.w3.org/1999/xlink'
      x='0px'
      y='0px'
      viewBox='0 0 15.8 17'
      xmlSpace='preserve'
    >
      <g>
        <g>
          <rect className='st0' width='5.6' height='17' />
          <rect x='10.2' className='st0' width='5.6' height='17' />
        </g>
      </g>
    </svg>
  );

  return (
    <div className={style.play__block}>
      {play}
      <svg
        onClick={(e) => {
          e.stopPropagation();
          props.next('next');
        }}
        className={style.icon}
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        x='0px'
        y='0px'
        viewBox='0 0 15.7 17.1'
        xmlSpace='preserve'
      >
        <g>
          <g>
            <polygon className='st0' points='0,17.1 12,8.6 0,0' />
            <rect x='13.3' y='1.7' className='st0' width='2.4' height='13.7' />
          </g>
        </g>
      </svg>
    </div>
  );
}
