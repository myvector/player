import React from 'react';
import MoreControl from '~c/playerControl/moreControl';
import { routeMap } from '~/router/';

export default function (props) {
  return (
    <MoreControl
      playListAddress={routeMap.playList}
      historyPush={props.historyPush}
      mode={props.mode}
      select={props.select}
      changeFavorite={props.changeFavorite}
      favorite={props.favorite}
    />
  );
}
