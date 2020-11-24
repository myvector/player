import { observable, action, computed } from 'mobx';
export default class PlayList {
  @observable trackListIdObj = {};
  @observable trackListSound = {};

  @observable userPlayListName = {};
  @observable playListCheck = 'default';
  @observable innerSystemPlayListName = 'default';
  @observable upLoad = false;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = rootStore.api;
    this.typeNameAutoPlayList = 'Мой плейлист';
    this.findTrackListIdObj = {};

    this.refreshPlayListTakeName = [];
    this.messageType = rootStore.messageType;
  }

  // create \\

  @action newPlayList = (playList, name) => {
    this.trackListIdObj = { ...this.trackListIdObj, ...playList };

    this.createTrackListSound();
    this.refreshPlayListArrayIndex(name);

    this.rootStore.autoName.numberIncrease(
      name,
      this.userPlayListName,
      this.typeNameAutoPlayList
    );
    return this.sendPlayList()
      .then(() => {
        this.rootStore.notifications.addMessage(
          this.messageType.MESSAGE_SAVE_PLAYLIST
        );
      })
      .catch(() => {
        this.rootStore.notifications.addMessage(this.messageType.ERROR);
      });
  };

  createTrackListSound = () => {
    for (let key in this.trackListIdObj) {
      this.refreshTrackListSound(key);
    }
    return this.trackListSound;
  };

  // load \\

  sendPlayList = (sendtrackList = this.trackListIdObj) => {
    const trackList = sendtrackList;
    return this.api.dataPlayLists.sendData(
      trackList,
      this.rootStore.id3.storage.track
    );
  };

  @action upLoadPlayList = (list) => {
    this.trackListIdObj = { ...list };
    this.createTrackListSound();
    this.upLoad = true;
    this.upDataMapTrack();
  };

  upDataMapTrack = () => {
    for (let key in this.trackListIdObj) {
      this.refreshPlayListArrayIndex(key);
    }
  };

  // delete \\

  @action deleteTrackMainTrackList = (id) => {
    for (let key in this.trackListIdObj) {
      this.deleteTrackInAllObj(id, key);
    }

    if (this.getPlayListCheck) {
      this.doForDeleteTrackWhenPlayListCheck();
    } else {
      this.rootStore.trackList.defaultTrackList();
    }
  };

  @action deleteTrackInAllObj = (id, key) => {
    if (this.findTrackListIdObj[key][id]) {
      this.checkIsThereAlreadyPlaylistInTheListToUpdate(key);
      this.trackListSound[key].pop();
      delete this.trackListIdObj[key][id];
    }
  };

  @action doForDeleteTrackWhenPlayListCheck = () => {
    this.refreshPlayListArrayIndex(this.playListCheck);
    if (this.trackListSound[this.playListCheck].length == 0) {
      this.rootStore.trackList.defaultTrackList();
    } else {
      this.rootStore.trackList.changeTrackList(
        this.trackListSound[this.playListCheck],
        this.findTrackListIdObj[this.playListCheck]
      );
    }
  };

  @action deleteTrackInPlayList = (id) => {
    const playList = { ...this.trackListIdObj };
    delete playList[this.playListCheck][id];

    this.sendPlayList(playList)
      .then(() => {
        this.rootStore.trackList.getPlayinThisSongNowDoDeleteTrack(id);
        delete this.trackListIdObj[this.playListCheck][id];
        this.refreshTrackListSound(this.playListCheck);
        this.doForDeleteTrackWhenPlayListCheck();
        this.rootStore.notifications.addMessage(this.messageType.DELETE_TRACK);
      })
      .catch(() => {
        this.rootStore.notifications.addMessage(this.messageType.ERROR);
      });
  };

  @action deletePlayList = (name) => {
    delete this.trackListIdObj[name];
    delete this.findTrackListIdObj[name];

    this.sendPlayList(this.trackListIdObj)
      .then(() => {
        this.rootStore.autoName.findAndDeleteSettingName(
          name,
          this.userPlayListName
        );

        delete this.trackListSound[name];
        this.rootStore.notifications.addMessage(
          this.messageType.DELETE_PLAYLIST
        );
      })
      .catch(() => {
        this.rootStore.notifications.addMessage(this.messageType.ERROR);
        reject();
      });
  };

  // refresh \\

  refreshPlayListArrayIndex = (key) => {
    if (key) {
      this.findTrackListIdObj[key] = this.rootStore.arraySearchId.arr(
        this.trackListSound[key]
      );
    }
  };

  refreshTrackListSound = (playListName) => {
    if (this.trackListIdObj.hasOwnProperty(playListName)) {
      const idObjTrackList = this.rootStore.trackList
        .findIdinitialFullTrackList;
      let arraySoundList = [];

      for (let keyId in this.trackListIdObj[playListName]) {
        arraySoundList.push(
          idObjTrackList[this.trackListIdObj[playListName][keyId]].track
        );
      }
      this.trackListSound[playListName] = arraySoundList;
    }
  };

  // check & change \\

  @action checkIsThereAlreadyPlaylistInTheListToUpdate = (key) => {
    if (!this.getRefreshPlayListTakeNameHasName(key)) {
      this.refreshPlayListTakeName.push(key);
    }
  };

  @action actionCheckPlayList = (name) => {
    if (this.trackListSound.hasOwnProperty(name)) {
      this.playListCheck = name;
    } else {
      return '404';
    }
  };

  @action changePlayInnerSystemPlayList = (def) => {
    this.innerSystemPlayListName = def || this.playListCheck;
  };

  @action changeTrackListOnPlayList = (newList, change) => {
    return new Promise((resolve) => {
      if (!change && this.getPlayListCheck) {
        this.rootStore.trackList.defaultTrackList();
        this.changePlayInnerSystemPlayList('default');
      } else if (
        change &&
        this.innerSystemPlayListName !== this.playListCheck
      ) {
        this.rootStore.trackList.changeTrackList(
          newList,
          this.findTrackListIdObj[this.playListCheck]
        );
        this.changePlayInnerSystemPlayList();
      }
      resolve();
    });
  };

  @computed get getNumber() {
    return this.rootStore.autoName.getNumber(this.userPlayListName);
  }

  @computed get getPlayListCheck() {
    return this.innerSystemPlayListName !== 'default';
  }

  @computed get getRefreshPlayListTakeNameHasName() {
    return (key) => {
      return this.refreshPlayListTakeName.some(
        (namePlayList) => namePlayList == key
      );
    };
  }

  @computed get getCheckPlayListUrl() {
    return (url) => {
      if (this.upLoad) {
        let res = this.actionCheckPlayList(url);
        if (res == '404') {
          return '404';
        }
        let index = this.refreshPlayListTakeName.findIndex(
          (playListNameRefresh) => this.playListCheck == playListNameRefresh
        );

        let keyRefresh;

        if (index !== -1) {
          keyRefresh = this.refreshPlayListTakeName[index];
          this.refreshPlayListArrayIndex(keyRefresh);
          this.refreshPlayListTakeName.splice(index, 1);
        }
        return this.trackListSound[this.playListCheck];
      }
    };
  }
}
