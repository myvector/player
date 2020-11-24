import { observable, action, computed } from 'mobx';
export default class Sound {
  @observable statePlay = true;
  @observable playMode = 'loop';

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.audio = this.rootStore.audio;
    this.mediaSession = this.rootStore.mediaSession;
    this.audio.controls = true;
    this.promisePlay;
    this.nextTrackEndedPlay = false;
    this.interval = null;
    this.mod = ['loopOne', 'loop', 'random'];

    this.messageType = rootStore.messageType;

    this.audio.onplaying = (e) => {
      this.playFlags();
      this.rootStore.equalizer.audioContext.resume().then(() => {
        this.rootStore.time.timer;
      });
    };

    this.audio.onended = (e) => {
      if (!this.audio.paused) {
        this.rootStore.time.timeStop();
      }
      this.descriptionMode();
    };

    this.audio.onpause = (e) => {
      this.rootStore.time.timeStop();
      this.statePlay = true;
    };

    this.rootStore.media.handlerAction(
      this.rootStore.track.nextPrevChangeTrack,
      this.rootStore.track.nextPrevChangeTrack
    );
  }

  @action play = () => {
    if (!this.statePlay) {
      this.pause();
    } else {
      this.playTrack();
    }
  };

  playTrack() {
    this.promisePlay = this.audio.play();

    this.checkPromisePlayUndefined(() => {
      this.promisePlay
        .then((val) => {
          if (this.statePlay) {
            this.audio.play();
          }
        })
        .catch(() => {
          this.rootStore.notifications.addMessage(this.messageType.ERROR);
        });
    });
  }

  @action pause = () => {
    this.checkPromisePlayUndefined(() => {
      this.promisePlay
        .then((_) => {
          this.audio.pause();
          this.statePlay = true;
        })
        .catch(() => {
          this.rootStore.notifications.addMessage(this.messageType.ERROR);
        });
    });
  };

  checkPromisePlayUndefined = (func) => {
    if (this.promisePlay !== undefined) {
      func();
    }
  };

  pauseTrackList = (id) => {
    this.playListTrackPlay(id);
    this.pause();
  };

  playTrackList = (id) => {
    this.playListTrackPlay(id);

    if (this.rootStore.track.tracksAlreadyBeenPlayed.id == id) {
      this.playTrack();
    } else {
      this.soundSourceOnPlay();
    }
  };

  @action soundSourceOnPlay() {
    this.playTrack();
    this.changeSrcAudioWhenSongChange();
  }

  @action changeSrcAudioWhenSongChange = () => {
    this.checkPromisePlayUndefined(() => {
      this.promisePlay
        .then((_) => {
          this.audio.src = this.rootStore.track.track.src;
          this.rootStore.track.tracksAlreadyBeenPlayed = this.rootStore.track.track;
        })
        .then(() => {
          this.audio.play();
        })
        .catch(() => {
          this.rootStore.notifications.addMessage(this.messageType.ERROR);
        });
    });
  };

  @action playFlags = () => {
    this.rootStore.time.timeStop();
    this.statePlay = false;
  };

  @action playListTrackPlay(id) {
    let trackPlaying = this.rootStore.track.takeTrack(id);
    this.rootStore.track.changeTrack(trackPlaying);
  }

  //select Play Mode

  @action selectPlayMode = () => {
    let index = this.mod.findIndex((el) => {
      return el === this.playMode;
    });

    this.playMode = this.mod[index - 1];

    if (index - 1 < 0) {
      this.playMode = this.mod[this.mod.length - 1];
    } else {
      this.playMode = this.mod[index - 1];
    }
  };

  @computed get descriptionMode() {
    this.nextTrackEndedPlay = true;
    return () => {
      switch (this.playMode) {
        case 'loopOne':
          this.audio.load();
          this.audio.play();
          break;

        case 'loop':
          this.rootStore.track.nextPrevChangeTrack('next');
          break;

        case 'random':
          let num = this.getRandomInt(
            0,
            this.rootStore.trackList.trackList.length
          );

          if (
            this.rootStore.trackList.trackList[num].id == // repeat track
            this.rootStore.track.getIdTrackPlay
          ) {
            this.rootStore.track.nextPrevChangeTrack('next');
            break;
          }

          this.playListTrackPlay(this.rootStore.trackList.trackList[num].id);
          this.rootStore.id3.takeDataOneTrack(
            this.rootStore.trackList.trackList[num].id
          );

          this.changeSrcAudioWhenSongChange();
          break;
      }
    };
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
