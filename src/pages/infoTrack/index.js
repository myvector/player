import React from 'react';
import style from './inforTrack.module.css';
import withStore from '~/hocs/withStore';
import HeaderCom from '~c/playerControl/header';

class TrackList extends React.Component {
  constructor(props) {
    super(props);
    this.props.stores.id3.takeInfoAboutTrack(this.props.stores.track.track.id);
  }
  render() {
    return (
      <div className={style.info}>
        <HeaderCom goBack={this.props.history.goBack}></HeaderCom>
        <div className={style.innerInfo}>
          <div className={style.innerImage}>
            <img
              src={this.props.stores.track.allInfoTrack.cover1}
              className={style.image}
            />
          </div>
          <ul className={style.list}>
            <li>
              <div className={style.text}>
                <span className={style.boldText}>Название песни:</span>{' '}
                {this.props.stores.track.allInfoTrack.title}
              </div>
            </li>
            <li>
              <div className={style.text}>
                <span className={style.boldText}>Альбом:</span>{' '}
                {this.props.stores.track.allInfoTrack.album}
              </div>
            </li>
            <li>
              <div className={style.text}>
                <span className={style.boldText}>Исполнитель:</span>{' '}
                {this.props.stores.track.allInfoTrack.artist}
              </div>
            </li>
            <li>
              <div className={style.text}>
                <span className={style.boldText}>Год:</span>{' '}
                {this.props.stores.track.allInfoTrack.year}
              </div>
            </li>
            <li>
              <div className={style.text}>
                <span className={style.boldText}> Жанр:</span>{' '}
                {this.props.stores.track.allInfoTrack.genre}
              </div>
            </li>
            <li>
              <div className={style.text}>
                <span className={style.boldText}> Группа:</span>{' '}
                {this.props.stores.track.allInfoTrack.band}
              </div>
            </li>
            <li>
              <div className={style.text}>
                <span className={style.boldText}> Битрейт:</span>{' '}
                {this.props.stores.track.allInfoTrack.bitrate + 'Kb/s'}
              </div>
            </li>
            <li>
              <div className={style.text}>
                <span className={style.boldText}>Время исполнения:</span>{' '}
                {this.props.stores.track.allInfoTrack.date}
              </div>
            </li>
            <li>
              <div className={style.text}>
                <span className={style.boldText}> Формат файла:</span>{' '}
                {this.props.stores.track.allInfoTrack.date}
              </div>
            </li>
            <li>
              <div className={style.text}>
                <span className={style.boldText}> Комментарий:</span>{' '}
                {this.props.stores.track.allInfoTrack.comment}
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default withStore(TrackList);
