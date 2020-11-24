import React from 'react';
import Header from '~p/playerControl/header/';
import PlayerVisual from '~p/playerControl/playerVisual/';
import ControlBlock from '~p/playerControl/controlBlock';
import style from './playerControl.module.css';
import E404 from '~c/error/404/';
import { routeMap, urlBuilder } from '~/router/';
import withStore from '~/hocs/withStore';

import TimeLine from '~p/playerControl/timeLine';
import MoreControl from '~p/playerControl/moreControl';
import SoundTitle from '~c/playerControl/soundTitle';

class playerControl extends React.Component {
  constructor(props) {
    super(props);
    if (this.checkTrackIdUndefined()) {
      const matchId = this.props.match.params.id;
      this.checkPageExist(matchId);
    } else {
      this.compareUrlAndTrackId();
      this.notLoadDateTheSameTrack();
    }
  }

  state = {
    E404: false,
  };

  E404Check = () => {
    this.setState({ E404: true });
  };

  back = () => {
    this.props.stores.id3.catchPage404().then(() => {
      this.props.history.push(routeMap.home);
    });
  };

  componentDidMount() {
    if (this.props.stores.trackList.getEmptyTrackList) {
      this.props.history.replace(routeMap.home);
    }
  }

  checkPageExist = (matchId) => {
    this.props.stores.track.takeTrack(matchId)
      ? this.props.stores.track.changeSrcTrack(matchId)
      : this.E404Check();
  };

  compareUrlAndTrackId = () => {
    if (this.props.match.params.id !== this.props.stores.track.track.id) {
      this.props.history.replace(
        urlBuilder('play', {
          id: this.props.stores.track.track.id,
        })
      );
    }
  };

  notLoadDateTheSameTrack = () => {
    if (
      !this.props.stores.track.checkIfTheSameTrackIsSelected(
        this.props.stores.track.track.id
      )
    ) {
      this.props.stores.id3.takeDataOneTrack(this.props.stores.track.track.id);
    }
  };

  checkTrackIdUndefined = () =>
    this.props.stores.track.track.id !== undefined ? false : true;

  componentDidUpdate(prevProps) {
    if (this.props.location == prevProps.location && !this.state.E404) {
      this.props.history.replace(
        urlBuilder('play', {
          id: this.props.stores.track.track.id,
        })
      );
    }
  }

  render() {
    let page = this.state.E404 ? (
      <E404 router={this.props} back={this.back} />
    ) : (
      <>
        <Header history={this.props.history} />
        <PlayerVisual />
        <ControlBlock router={this.props} E404Check={this.E404Check} />
        <TimeLine />
        <MoreControl
          historyPush={this.props.history.push}
          mode={this.props.stores.sound.playMode}
          select={this.props.stores.sound.selectPlayMode}
          favorite={this.props.stores.track.favorite}
          changeFavorite={this.props.stores.track.changeFavorite}
        />
        <SoundTitle
          title={this.props.stores.track.track.title}
          band={this.props.stores.track.track.band}
        />
      </>
    );

    return <div className={style.page}>{page}</div>;
  }
}

export default withStore(playerControl);
