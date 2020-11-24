import React from 'react';
import style from './playList.module.css';
import HeaderCom from '~c/playerControl/header';
import withStore from '~/hocs/withStore';
import AddPlayList from '~p/playlist/newPlayList/';
import List from '~p/playList/list/';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class PlayList extends React.Component {
  render() {
    let list = [];

    for (let key in this.props.stores.playList.trackListSound) {
      const playList = this.props.stores.playList.trackListSound[key];

      list.push(
        <CSSTransition
          key={key}
          classNames={'menuWrap'}
          timeout={{ enter: 200, exit: 200 }}
        >
          <List
            checkRefresh={
              this.props.stores.playList.getRefreshPlayListTakeNameHasName
            }
            refreshData={this.props.stores.playList.refreshTrackListSound}
            history={this.props.history}
            current={playList.length}
            title={key}
            delete={this.props.stores.playList.deletePlayList}
            checkPlayList={this.props.stores.playList.actionCheckPlayList}
          />
        </CSSTransition>
      );
    }

    return (
      <div className={style.playList}>
        <HeaderCom goBack={this.props.history.goBack}></HeaderCom>
        <div className={style.wrapPlayList}>
          <AddPlayList />
          <TransitionGroup component='div' className={style.innerList}>
            {list}
          </TransitionGroup>
        </div>
      </div>
    );
  }
}

export default withStore(PlayList);
