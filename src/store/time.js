import { observable, action, computed } from 'mobx';
export default class Time {
  @observable currentTime = 0;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.oneSec = 1;
    this.interval = null;
  }

  onChangeTime(procent) {
    this.rootStore.sound.audio.currentTime = this.trackTimeEnded(
      this.visualTime(procent)
    );
  }

  trackTimeEnded = (ended) => {
    if (ended == null && this.rootStore.sound.statePlay) {
      this.rootStore.sound.audio.onended();

      return this.currentTime;
    } else if (ended == null && !this.rootStore.sound.statePlay) {
      this.rootStore.sound.audio.onended();

      return this.currentTime;
    } else {
      return ended;
    }
  };

  @action visualTime(procent) {
    if (!isNaN(this.rootStore.sound.audio.duration)) {
      let duration = this.rootStore.sound.audio.duration.toFixed(2);
      this.currentTime = (duration * procent) / 100;

      if (this.currentTime >= duration) {
        this.currentTime = duration;

        return null;
      } else if (this.currentTime <= 0) {
        this.currentTime = 0;
      }

      return this.currentTime;
    } else {
      return 0;
    }
  }

  @action tick() {
    this.currentTime = this.rootStore.sound.audio.currentTime;
  }

  @computed get timer() {
    return (this.interval = setInterval(() => this.tick(), 400));
  }

  @action timeStop() {
    clearInterval(this.interval);
  }

  @computed get oneSecondLine() {
    let longSound = this.rootStore.sound.audio.duration;
    if (isNaN(this.rootStore.sound.audio.duration)) {
      let time = this.rootStore.track.track.date.split(':');
      longSound =
        parseInt(time[0]) * 60 + parseInt(time[1]) * 60 + parseInt(time[2]);
    }

    return (this.oneSecondProcent(longSound) * this.currentTime).toFixed(2);
  }

  ////////////////////////////////////// show time //////////////////////////////////////

  @computed get soundTime() {
    return this.soundTimeFormatLastFunc();
  }

  get lengthSong() {
    if (isNaN(this.rootStore.sound.audio.duration)) {
      let time = String(this.rootStore.track.track.date);
      return time.slice(3);
    } else {
      return this.takeTimeFormat(this.rootStore.sound.audio.duration);
    }
  }

  soundTimeFormatLastFunc(current = this.currentTime) {
    if (current == null) current = this.currentTime;
    return this.takeTimeFormat(current);
  }

  oneSecondProcent = (value) => {
    if (!isNaN(value) || value == undefined) {
      return ((this.oneSec / value) * 100).toFixed(4);
    } else {
      return 0;
    }
  };

  takeTimeFormat = (sec) => {
    return this.format(...this.timeFormat(sec));
  };

  format(minutes, seconds) {
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
    return minutes + ':' + seconds;
  }

  timeFormat(seconds) {
    let minutes = (seconds / 60) | 0;
    let sec = seconds % 60 | 0;
    return [minutes, sec];
  }
}
