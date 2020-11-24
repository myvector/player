import React from 'react';
import withStore from '~/hocs/withStore';
import { routeMap } from '~/router/';
import HeadList from '~c/trackList/head/';

class Head extends React.Component {
  search = () => {
    this.props.route.history.push(routeMap.search);
  };

  fullScreen = () => {
    const doc = window.document;
    const docEl = doc.documentElement;

    const requestFullScreen =
      docEl.requestFullscreen ||
      docEl.mozRequestFullScreen ||
      docEl.webkitRequestFullScreen;
    const cancelFullScreen =
      doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen;

    if (
      !doc.fullscreenElement &&
      !doc.mozFullScreenElement &&
      !doc.webkitFullscreenElement
    ) {
      requestFullScreen.call(docEl);
    } else {
      cancelFullScreen.call(doc);
    }
  };

  render() {
    return (
      <>
        <HeadList fullScreen={this.fullScreen} search={this.search} />
      </>
    );
  }
}

export default withStore(Head);
