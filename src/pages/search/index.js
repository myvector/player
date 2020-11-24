import React from 'react';
import withStore from '~/hocs/withStore';
import Search from '~c/search/';
import style from './search.module.css';
import { routeMap, urlBuilder } from '~/router/';

class SearchPage extends React.Component {
  constructor(props) {
    super(props);
    this.empty = true;
    this.clearResult = false;
  }

  search = (e) => {
    if (e.target.value.length == 0) {
      this.empty = true;
    } else {
      this.empty = false;
    }
    this.props.stores.search.requestSearch(e);
  };

  home = () => {
    this.props.history.push(routeMap.home);
    this.leavePage();
  };

  playTheSong = (id) => {
    if (
      id == this.props.stores.track.track.id &&
      !this.props.stores.sound.statePlay
    ) {
      return true;
    } else if (
      id == this.props.stores.track.track.id &&
      this.props.stores.sound.statePlay
    ) {
      return 'continuePlay';
    } else {
      return false;
    }
  };

  checkTrack = (id) => {
    this.leavePage();

    if (!this.playTheSong(id)) {
      this.props.stores.trackList.defaultTrackList();
      this.props.stores.sound.playListTrackPlay(id);
      this.props.stores.sound.soundSourceOnPlay();
    } else if (this.playTheSong(id) == 'continuePlay') {
      this.props.stores.sound.playTrack();
    }

    this.props.history.replace(urlBuilder('play', { id }));
  };

  leavePage = () => {
    this.empty = true;
    this.props.stores.search.requestSearch(null);
  };

  render() {
    let searchTrack;

    if (this.props.stores.search.returnResultFind.length == 0 && !this.empty) {
      searchTrack = (
        <p className={style.item}>К сожелению не удалось ничего найти</p>
      );
    } else if (
      this.props.stores.search.returnResultFind.length !== 0 &&
      !this.clearResult
    ) {
      searchTrack = this.props.stores.search.returnResultFind.map((el, i) => {
        return (
          <p
            className={style.item}
            key={el.id}
            onClick={() => this.checkTrack(el.id)}
          >
            {el.title}
          </p>
        );
      });
    }

    return (
      <div className={style.innerSearch}>
        <Search search={this.search} home={this.home}>
          <div className={style.wrapResult}>{searchTrack}</div>
        </Search>
      </div>
    );
  }
}

export default withStore(SearchPage);
