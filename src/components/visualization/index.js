import React from 'react';
import withStore from '~/hocs/withStore';

class Canvas extends React.Component {
  constructor(props) {
    super(props);

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    if (this.props.stores.sound.statePlay) {
      this.props.stores.visualization.stopRequestAnimation();
    }

    window.addEventListener('orientationchange', this.resize);
    window.addEventListener('resize', this.resize);
  }

  resize = () => {
    let timeOut = null;
    this.props.stores.visualization.stopRequestAnimation();
    timeOut = setTimeout(() => {
      clearTimeout(timeOut);
      this.refs.canvas.width = window.innerWidth;
      this.refs.canvas.height = window.innerHeight;

      this.props.stores.visualization.request(this.updateCanvas, this.ctx);
      this.props.stores.visualization.stopRequestAnimation();
      this.checkShowVisualization();
    }, 200);
  };

  checkShowVisualization = () => {
    if (this.props.stores.sound.statePlay) {
      this.props.stores.visualization.stopRequestAnimation();
    } else {
      this.props.stores.visualization.stopRequestAnimation();
      this.props.stores.visualization.request(this.updateCanvas, this.ctx);
    }
  };

  componentDidMount() {
    this.ctx = this.refs.canvas.getContext('2d');
    this.props.stores.visualization.request(this.updateCanvas, this.ctx);
  }

  componentDidUpdate() {
    console.log('сработал componentDidUpdate');
    this.checkShowVisualization();
  }

  componentWillUnmount() {
    this.props.stores.visualization.stopRequestAnimation(this.refs.canvas);
    window.removeEventListener('resize', this.resize);
    window.removeEventListener('orientationchange', this.resize);
  }

  updateCanvas(dataArray, ctx) {
    const barWidth = window.innerWidth / 60 / 2;

    ctx.fillStyle = 'rgba(94, 36, 77, 1)';
    ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);

    let barHeight;
    let x = 0;
    let bars = 60;

    let times = 1.7;
    if (window.innerHeight < window.innerWidth) {
      times = 0.75;
    }

    for (let i = 0; i < bars; i++) {
      barHeight = dataArray[i] * times;

      ctx.fillStyle = `rgb(256,256,256)`;
      ctx.fillRect(x, window.innerHeight - barHeight, barWidth, barHeight);

      x += barWidth * 2;
    }
  }
  render() {
    return (
      <canvas
        ref='canvas'
        id='canvas'
        width={this.width}
        height={this.height}
      ></canvas>
    );
  }
}

export default withStore(Canvas);
