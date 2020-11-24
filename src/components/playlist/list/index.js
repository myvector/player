import React from 'react';
import style from './list.module.css';
import Setting from '~c/universal/setting/';

export default function (props) {
  return (
    <div className={style.wrapList} onClick={props.click}>
      <div>
        <h4 className={style.trackListTitle}>{props.title}</h4>
        <div className={style.currentTrack}>
          Количество треков {props.current}
        </div>
      </div>
      <Setting
        text={'Удалить плейлист'}
        delete={() => props.delete(props.title)}
      />
    </div>
  );
}
