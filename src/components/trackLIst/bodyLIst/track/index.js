import React from 'react';
import TrackCom from './view/';

export default class Track extends React.PureComponent {
  play = () => {
    this.props.play(this.props.id);
  };

  delete = () => {
    this.props.delete(this.props.id);
  };

  render() {
    return (
      <TrackCom
        info={this.props.info}
        animation={this.props.animation}
        img={this.props.img}
        inner={this.props.inner}
        title={this.props.title}
        text={this.props.text}
        id={this.props.id}
        equilizer={this.props.equilizer}
        statePlay={this.props.statePlay}
        play={this.play}
        optionDisabled={this.props.optionDisabled}
        track={this.props.track}
        delete={this.delete}
      >
        {this.props.children}
      </TrackCom>
    );
  }
}
