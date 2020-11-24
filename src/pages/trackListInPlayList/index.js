import React from 'react';
import style from './trackListInPlayList.module.css';
import HeaderCom from '~c/playerControl/header';
import withStore from '~/hocs/withStore';
import BodyList from '~p/trackList/BodyList';
import Footer from '~p/trackList/footer';
import E404 from '~c/error/404/';
import { routeMap } from '~/router/';

class TrackListInPlayList extends React.Component {
  back = () => {
    this.props.stores.id3.catchPage404().then(() => {
      this.props.history.push(routeMap.home);
    });
  };
  render() {
    const playList = this.props.stores.playList.getCheckPlayListUrl(
      this.props.match.params.id
    );

    return playList !== '404' ? (
      <div className={style.playList}>
        <HeaderCom goBack={this.props.history.goBack}></HeaderCom>
        <BodyList
          history={this.props.history}
          style={'playList'}
          empty={this.props.stores.trackList.getEmptyTrackList}
          changeList={this.props.stores.playList.changeTrackListOnPlayList}
          checkChangeListInThisPlace={true}
          deletePlayList={this.props.stores.playList.deleteTrackInPlayList}
          list={playList}
          id3={this.props.stores.id3}
          sound={this.props.stores.sound}
          track={this.props.stores.track}
        />
        {this.props.stores.trackList.getEmptyTrackList ? null : (
          <Footer route={this.props} />
        )}
      </div>
    ) : (
      <E404 router={this.props} back={this.back} />
    );
  }
}

export default withStore(TrackListInPlayList);
