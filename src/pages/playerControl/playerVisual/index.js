import React from 'react';
import withStore from '~/hocs/withStore';
import PlayerVisual from '~c/playerControl/playerVisual/';

function img(props) {
  return <PlayerVisual src={props.stores.track.cover.cover1} />;
}
export default withStore(img);
