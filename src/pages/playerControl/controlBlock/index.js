import React from 'react';
import withStore from '~/hocs/withStore';
import ControlCom from '~c/playerControl/controlBlock';
import { urlBuilder } from '~/router/';

class ControlBlock extends React.PureComponent {
  next = (type) => {
    this.props.stores.track.nextPrevChangeTrack(type);
    const id = this.props.stores.track.track.id;
    this.props.router.history.replace(urlBuilder('play', { id }));
  };

  componentDidUpdate(prevProps) {
    this.changePageTrackEnded();
  }

  changePageTrackEnded = () => {
    if (
      this.props.stores.track.track.id !== this.props.router.match.params.id &&
      this.props.stores.sound.nextTrackEndedPlay
    ) {
      const id = this.props.stores.track.track.id;
      this.props.router.history.replace(urlBuilder('play', { id }));
    }
    this.props.stores.sound.nextTrackEndedPlay = false;
  };

  render() {
    return (
      <ControlCom
        next={this.next}
        prev={this.next}
        play={this.props.stores.sound.play}
        statePlay={this.props.stores.sound.statePlay}
        ended={this.props.stores.sound.audio.ended}
      />
    );
  }
}

export default withStore(ControlBlock);
