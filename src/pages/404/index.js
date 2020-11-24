import React from 'react';
import E404 from '~c/error/404/';
import { routeMap } from '~/router/';
import withStore from '~/hocs/withStore';

function error(props) {
  function back() {
    if (props.stores.track.track.id == undefined) {
      props.stores.id3.catchPage404().then(() => {
        props.history.push(routeMap.home);
      });
    } else {
      props.history.push(routeMap.home);
    }
  }

  return <E404 back={back} />;
}

export default withStore(error);
