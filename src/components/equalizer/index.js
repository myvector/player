import React from 'react';
import style from './equalizer.module.css';
import Line from '~c/universal/line/';

export default function (props) {
  return (
    <div className={style.wrapLine}>
      <Line
        id={props.id}
        value={props.value}
        vertical={props.vertical}
        eventObj={{
          eventMouseUp: props.onChange,
          eventTouchEnd: props.onChange,
          eventMove: props.onChange,
        }}
        key={props.compare + ':' + props.value}
      ></Line>
      <p className={style.value}>{props.hz}</p>
    </div>
  );
}
