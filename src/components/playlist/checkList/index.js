import React from 'react';
import style from './checkList.module.css';
import TrackCom from '~c/trackList/bodyList/track';

export default function (props) {
  const check = props.choice ? '#ff9900' : '#000';
  return (
    <li className={style.list} onClick={() => props.add(props.id)}>
      <TrackCom
        title={props.title}
        text={props.text}
        id={props.id}
        info={props.info}
      />
      <div className={style.add} style={{ borderColor: check }}>
        <div className={style.plus}>
          <svg
            style={{ fill: check }}
            version='1.1'
            id='plus'
            xmlns='http://www.w3.org/2000/svg'
            xmlnsXlink='http://www.w3.org/1999/xlink'
            x='0px'
            y='0px'
            viewBox='0 0 125.5 129.4'
            xmlSpace='preserve'
          >
            <g>
              <path d='M70.5,0v57.1h55v14.6h-55v57.6H55V71.7H0V57.1h55V0H70.5z' />
            </g>
          </svg>
        </div>
      </div>
    </li>
  );
}
