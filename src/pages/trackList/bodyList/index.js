import React from 'react';
import style from './bodyList.module.css';
import TrackCom from '~c/trackList/bodyList/track';
import withStore from '~/hocs/withStore';
import { urlBuilder, routeMap } from '~/router/';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

class BodyList extends React.PureComponent {
  play = (id) => {
    if (
      this.props.track.checkIfTheSameTrackIsSelected(id) &&
      !this.props.sound.statePlay
    ) {
      this.props.sound.pauseTrackList(id);
    } else {
      this.props
        .changeList(this.props.list, this.props.checkChangeListInThisPlace)
        .then(() => {
          this.props.sound.playTrackList(id);
        })
        .then(() => {
          this.props.history.push(urlBuilder('play', { id }));
        });
    }
  };

  delete = (id) => {
    if (this.props.checkChangeListInThisPlace) {
      this.props.deletePlayList(id);
    } else {
      this.props.stores.trackList.deleteTrack(id);
    }
  };

  render() {
    let list = this.props.list
      ? this.props.list.map((el, i) => {
          if (this.props.track.track.id == el.id) {
            return (
              <CSSTransition //playing
                key={el.id}
                classNames={'menuWrap'}
                timeout={{ enter: 200, exit: 200 }}
              >
                <TrackCom
                  img={el.image2}
                  title={el.title}
                  text={el.band}
                  id={el.id}
                  equilizer={true}
                  statePlay={this.props.stores.sound.statePlay}
                  key={el.id}
                  play={this.play}
                  delete={this.delete}
                />
              </CSSTransition>
            );
          } else {
            return (
              <CSSTransition // no playing
                key={el.id}
                classNames={'menuWrap'}
                timeout={{ enter: 200, exit: 200 }}
              >
                <TrackCom
                  img={el.image2}
                  title={el.title}
                  text={el.band}
                  id={el.id}
                  key={el.id}
                  play={this.play}
                  delete={this.delete}
                />
              </CSSTransition>
            );
          }
        })
      : null;

    const styles =
      this.props.style == 'playList'
        ? style.bodyList + ' ' + style.playList
        : style.bodyList;

    const innerList = (
      <TransitionGroup component={'div'} className={styles}>
        {list}
      </TransitionGroup>
    );

    const emptyTrack = <div className={style.empty}>Нету треков</div>;
    return <>{this.props.empty ? emptyTrack : innerList} </>;
  }
}

export default withStore(BodyList);
