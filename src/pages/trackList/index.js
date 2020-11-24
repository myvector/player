import React from 'react';
import style from './trackList.module.css';
import Head from '~p/trackList/head';
import BodyList from '~p/trackList/BodyList';
import Footer from '~p/trackList/footer';
import withStore from '~/hocs/withStore';

function trackList(props) {
  return (
    <div className={style.page}>
      <Head route={props} />
      <BodyList
        empty={props.stores.trackList.getEmptyTrackList}
        history={props.history}
        list={props.stores.list.trackListSound}
        changeList={props.stores.playList.changeTrackListOnPlayList}
        id3={props.stores.id3}
        sound={props.stores.sound}
        track={props.stores.track}
      />
      {props.stores.trackList.getEmptyTrackList ? null : (
        <Footer route={props} />
      )}
    </div>
  );
}

export default withStore(trackList);
