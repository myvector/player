import React from 'react';
import TimeLineСom from '~c/playerControl/timeLine';
import withStore from '~/hocs/withStore';

class TimeLinePage extends React.Component {
  state = {
    time: '0:00',
    move: false,
    line: this.props.stores.time.oneSecondLine + ' %',
  };

  eventMouseDown = (procent) => {
    this.setState({
      time: this.props.stores.time.soundTimeFormatLastFunc(
        this.props.stores.time.visualTime(procent)
      ),
      move: true,
    });
  };

  eventMove = (procent) => {
    this.setState({
      time: this.props.stores.time.soundTimeFormatLastFunc(
        this.props.stores.time.visualTime(procent)
      ),
      line: procent,
      move: true,
    });
  };

  eventMouseUp = (procent) => {
    this.props.stores.time.onChangeTime(procent);
    this.setState({
      move: false,
    });
  };

  eventTouchEnd = (procent) => {
    if (!isNaN(procent) && procent) {
      this.props.stores.time.onChangeTime(procent);
      this.setState({
        move: false,
        line: this.props.stores.time.oneSecondLine,
      });
    }
  };

  render() {
    let time, line;

    if (this.state.move) {
      time = this.state.time;
      line = this.state.line;
    } else {
      line = this.props.stores.time.oneSecondLine;
      time = this.props.stores.time.soundTime;
    }

    return (
      <TimeLineСom
        lengthSong={this.props.stores.time.lengthSong}
        eventMove={this.eventMove}
        eventMouseDown={this.eventMouseDown}
        eventTouchStart={this.eventTouchStart}
        eventTouchEnd={this.eventTouchEnd}
        time={time}
        line={line}
        eventMouseUp={this.eventMouseUp}
        move={this.state.move}
        test={this.state.test}
      />
    );
  }
}
export default withStore(TimeLinePage);
