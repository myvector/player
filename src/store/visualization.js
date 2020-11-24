export default class Visualization {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.audioContext = this.rootStore.audioCtx;

    this.analyser = this.audioContext.createAnalyser();
    this.source = this.rootStore.equalizer.source;

    this.source.connect(this.analyser);
    this.analyser.connect(this.audioContext.destination);

    this.bufferLength = this.analyser.frequencyBinCount;
    this.dataArray = new Uint8Array(this.bufferLength);
    this.requestId;
  }

  stopRequestAnimation = () => {
    cancelAnimationFrame(this.requestId);
  };

  request = (draw, ctx) => {
    const render = () => {
      this.requestId = requestAnimationFrame(render);
      this.analyser.getByteFrequencyData(this.dataArray);
      draw(this.dataArray, ctx, this.bufferLength);
    };
    render();
  };

  showVis = () => {
    this.showVisualization = false;
  };

  hideVis = () => {
    this.showVisualization = true;
  };
}
