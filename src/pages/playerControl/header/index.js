import React from 'react';
import HeaderCom from '~c/playerControl/header';
import withStore from '~/hocs/withStore';
import Menu from '~p/playerControl/menu/';
import styles from './header.module.css';
import { routeMap } from '~/router/';

class Header extends React.Component {
  checkLastTrack = () => {
    if (this.props.stores.trackList.getEmptyTrackList) {
      this.props.history.push(routeMap.home);
    }
  };

  deleteTrack = (id) => {
    if (!this.props.stores.playList.getPlayListCheck) {
      this.props.stores.trackList.deleteTrack(id);
      this.checkLastTrack();
    } else {
      new Promise((res) => {
        this.props.stores.playList.deleteTrackInPlayList(id);
        res();
      }).then(() => {
        if (
          !this.props.stores.playList.trackListSound[
            this.props.stores.playList.playListCheck
          ].length
        ) {
          this.props.history.replace(routeMap.home);
        }
      });
    }
  };

  render() {
    return (
      <>
        <HeaderCom
          style={styles.header}
          goBack={this.props.history.goBack}
          open={this.openMenu}
          openRightMenu={this.openRightMenu}
        >
          <Menu
            id={this.props.stores.track.track.id}
            deleteTrack={this.deleteTrack}
          />
        </HeaderCom>
      </>
    );
  }
}

export default withStore(Header);
