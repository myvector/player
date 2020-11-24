import style from '../track.module.css';
import React from 'react';
import Setting from '~c/universal/setting/';

export default function (props) {
  let trackClass = props.track ? props.track + ' ' + style.track : style.track;
  let innerText = props.inner
    ? props.inner + ' ' + style.innerInfo
    : style.innerInfo;

  let src = props.img;
  let equilizerIcon = null;

  let animState;
  if (props.animation) {
    animState = { animationPlayState: 'paused' };
  }

  if (props.equilizer) {
    equilizerIcon = !props.statePlay ? (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={style.equilizer}
        viewBox='0 0 50 100'
      >
        <g>
          <title>Audio Equilizer</title>
          <rect className={style.bar} transform='translate(0,0)' y='15'></rect>
          <rect className={style.bar} transform='translate(25,0)' y='15'></rect>
          <rect className={style.bar} transform='translate(50,0)' y='15'></rect>
        </g>
      </svg>
    ) : (
      <svg
        xmlns='http://www.w3.org/2000/svg'
        className={style.equilizer + ' ' + style.pause}
        viewBox='0 0 50 100'
      >
        <g>
          <title>Audio Equilizer</title>
          <rect className={style.bar} transform='translate(0,0)' y='15'></rect>
          <rect className={style.bar} transform='translate(25,0)' y='15'></rect>
          <rect className={style.bar} transform='translate(50,0)' y='15'></rect>
        </g>
      </svg>
    );
  }

  return props.info ? (
    <div className={innerText}>
      <h2 className={style.title}>{props.title}</h2>
      <p className={style.text}>{props.text}</p>
    </div>
  ) : (
    <div className={trackClass} onClick={props.play}>
      <div className={style.innerImg}>
        <img style={animState} src={src} className={style.img}></img>
      </div>
      <div className={innerText}>
        <h2 className={style.title}>{props.title}</h2>
        <p className={style.text}>{props.text}</p>
      </div>
      {props.children}

      {equilizerIcon}
      {props.optionDisabled ? (
        <></>
      ) : (
        <Setting text={'Удалить трек из очереди'} delete={props.delete} />
      )}
    </div>
  );
}
