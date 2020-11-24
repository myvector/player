import React from 'react';
import style from './controlBlock.module.css';

export default function (props) {
  const prev = (e) => {
    e.stopPropagation();
    props.prev('prev');
  };

  const next = (e) => {
    e.stopPropagation();
    props.prev('next');
  };

  let btnPlay =
    props.statePlay && !props.ended ? (
      <polygon
        className={style.st0}
        points='34.5,37.6 22.4,44.6 22.4,30.5 22.4,16.4 34.5,23.4 46.6,30.5 	'
      />
    ) : (
      <g className={style.pause}>
        <rect className={style.st0} width='7.1' height='21.4' />
        <rect x='9.9' className={style.st0} width='7.1' height='21.4' />
      </g>
    );

  return (
    <div className={style.controlBtn}>
      <svg
        version='1.1'
        id='prev'
        xmlns='http://www.w3.org/2000/svg'
        xmlnsXlink='http://www.w3.org/1999/xlink'
        x='0px'
        y='0px'
        viewBox='0 0 19.6 21.4'
        xmlSpace='preserve'
        className={style.prev}
        onClick={prev}
      >
        <g>
          <g>
            <polygon
              className={style.st0}
              points='19.6,21.4 4.6,10.7 19.6,0 		'
            />
            <rect x='0' y='2.1' className={style.st0} width='3' height='17.1' />
          </g>
        </g>
      </svg>
      <svg
        version='1.1'
        viewBox='0 0 61 61'
        className={style.play}
        onClick={props.play}
      >
        <g>
          <g>
            {btnPlay}
            <circle className={style.st1} cx='30.5' cy='30.5' r='30' />
            <path
              className={style.st2}
              d='M30.5,61C13.7,61,0,47.3,0,30.5S13.7,0,30.5,0C47.3,0,61,13.7,61,30.5S47.3,61,30.5,61z M30.5,1
C14.2,1,1,14.2,1,30.5S14.2,60,30.5,60S60,46.8,60,30.5S46.8,1,30.5,1z'
            />
          </g>
        </g>
      </svg>
      <svg className={style.next} onClick={next}>
        <use xlinkHref='#prev'></use>
      </svg>
    </div>
  );
}
