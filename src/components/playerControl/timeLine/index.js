import React from 'react';
import style from './timeLine.module.css';
import LineRange from '~c/universal/line/';

function TimeLineCom(props) {
  return (
    <div className={style.timeInner}>
      <p className={style.text}>{props.time}</p>
      <div className={style.innerLine}>
        <LineRange
          changedValue={props.line}
          eventObj={{
            eventMove: props.eventMove,
            eventMouseDown: props.eventMouseDown,
            eventMouseUp: props.eventMouseUp,
            eventTouchEnd: props.eventTouchEnd
          }}
          event={true}
        />
      </div>
      <p className={style.text}>{props.lengthSong}</p>
    </div>
  );
}

export default TimeLineCom;
