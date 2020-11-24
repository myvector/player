import React from 'react';
import Track from '~c/trackList/bodyList/track';
import style from './footer.module.css';
import withStore from '~/hocs/withStore';
import Play from '~c/trackList/footer/';
import { urlBuilder } from '~/router/';
import ProgressCircle from '~c/trackList/footer/progressCircle/';

class footer extends React.Component {
  play = () => {
    this.props.route.history.push(
      urlBuilder('play', { id: this.props.stores.track.track.id })
    );
  };

  render() {
    return (
      <div className={style.footer}>
        <Track
          inner={style.innerText}
          track={style.footerTrack}
          title={this.props.stores.track.track.title}
          text={this.props.stores.track.track.band}
          img={this.props.stores.track.track.image2}
          animation={this.props.stores.sound.statePlay}
          optionDisabled={true}
          play={this.play}
        >
          <Play
            play={this.props.stores.sound.play}
            statePlay={this.props.stores.sound.statePlay}
            next={this.props.stores.track.nextPrevChangeTrack}
          />

          <ProgressCircle
            oneSecondLine={this.props.stores.time.oneSecondLine}
          />
        </Track>
      </div>
    );
  }
}

export default withStore(footer);
