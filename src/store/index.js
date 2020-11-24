import soundStore from './sound';
import timeStore from './time';
import id3Store from './id3';
import listStore from './sort';
import searchStore from './search';
import equalizerStore from './equalizer';
import trackStore from './track';
import mediaSessionStore from './mediaSession';
import playListSrore from './playList';
import autoNameStore from './autoName';
import searchArrayIdStore from './searchArrayId';
import trackListStore from './trackList';
import visualizationStore from './visualization';
import notificationStore from './notifications';

import * as sound from '~/api/listOfSongs.js';
import * as dataSend from '~/api/dataTrack.js';
import * as dataTrack from '~/api/loadTrack.js';
import * as dataEqualizer from '~/api/equalizerSettings';
import * as dataPlayLists from '~/api/dataPlayList';
import {
  ERROR,
  MESSAGE_SAVE_PLAYLIST,
  MESSAGE_SAVE_EQUALIZER,
  MESSAGE_SAVE_FAVORITE_TRACK,
  MESSAGE_TRACK_HAVE,
  NOT_SAVE,
  DELETE_TRACK,
  DELETE_PLAYLIST,
  DELETE_EQUALIZER,
  getMessageText,
} from '../../typeMessage';

class RootStore {
  constructor() {
    this.api = {
      sound,
      dataSend,
      dataTrack,
      dataEqualizer,
      dataPlayLists,
    };

    this.storage = localStorage;
    this.location = window.location.pathname;

    if ('mediaSession' in navigator) {
      this.mediaSession = navigator.mediaSession;
    }

    this.messageType = {
      ERROR,
      MESSAGE_SAVE_PLAYLIST,
      MESSAGE_SAVE_EQUALIZER,
      MESSAGE_SAVE_FAVORITE_TRACK,
      MESSAGE_TRACK_HAVE,
      NOT_SAVE,
      DELETE_TRACK,
      DELETE_PLAYLIST,
      DELETE_EQUALIZER,
    };

    this.getMessageText = getMessageText;

    this.id3 = new id3Store(this);
    this.trackList = new trackListStore(this);
    this.audio = new Audio();
    const audioContext = window.AudioContext || window.webkitAudioContext;
    this.audioCtx = new audioContext();

    this.playList = new playListSrore(this);
    this.autoName = new autoNameStore(this);
    this.media = new mediaSessionStore(this);
    this.track = new trackStore(this);
    this.sound = new soundStore(this);
    this.time = new timeStore(this);
    this.list = new listStore(this);
    this.search = new searchStore(this);
    this.notifications = new notificationStore(this);

    this.equalizer = new equalizerStore(this);
    this.visualization = new visualizationStore(this);

    this.arraySearchId = new searchArrayIdStore(this);
  }
}

export default new RootStore();
