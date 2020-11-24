import React from 'react';
import style from './visualization.module.css';

import withStore from '~/hocs/withStore';
import HeaderCom from '~c/playerControl/header';
import Canvas from '~c/visualization/';

function Visualization(props) {
  return (
    <div className={style.info}>
      <HeaderCom goBack={props.history.goBack}></HeaderCom>
      <Canvas key={props.stores.sound.statePlay} />
      {props.stores.sound.statePlay}
    </div>
  );
}

export default withStore(Visualization);
