import { action } from 'mobx';
export default class Id3 {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.api = this.rootStore.api;
    this.storage = this.rootStore.storage;
    this.token = this.rootStore.storage.getItem('track');
    this.location = this.rootStore.location;
    this.messageType = rootStore.messageType;
  }

  @action load = () => {
    return new Promise((resolve, reject) => {
      this.api.sound
        .listOfSound()
        .then((data) => {
          this.rootStore.trackList.initialFullTrackList = data;
          this.rootStore.trackList.findIdinitialFullTrackList = this.rootStore.arraySearchId.arr(
            this.rootStore.trackList.initialFullTrackList
          );
          this.rootStore.trackList.defaultTrackList();

          if (!this.validLocation(this.location)) {
            return this.loadDataTrackAndSharingOtherStore().then(() => {
              resolve();
            });
          } else {
            resolve();
            return Promise.reject('secondPage');
          }
        })
        .then(() => {
          this.takeDataOneTrack(this.rootStore.track.track.id);
        })
        .catch((e) => {
          if (e !== 'secondPage') {
            this.rootStore.notifications.addMessage(this.messageType.ERROR);
            reject();
          }
        });
    });
  };

  @action takeDataOneTrack = (id) => {
    return new Promise((resolve, reject) => {
      this.api.dataSend
        .oneTrackDataTake(id)
        .then((data) => {
          if (data == null) {
            this.loadDataTrackAndSharingOtherStore();
            resolve();
          } else {
            this.rootStore.track.cover = { ...data };
            this.rootStore.media.mediaSession();
            resolve();
          }
        })
        .catch(() => {
          this.rootStore.notifications.addMessage(this.messageType.ERROR);
          reject();
        });
    });
  };

  //////////////////////////////////////////////////////////////////////////////////////////////////////////////

  @action loadDataTrackAndSharingOtherStore = () => {
    return new Promise((resolve, reject) => {
      this.api.dataTrack
        .loadTrack(this.token)
        .then((numberTrack) => {
          if (numberTrack.needUpdate) {
            this.storage.setItem('track', numberTrack.token);
          }

          let number = numberTrack.track[0]
            ? numberTrack.track[0].toString()
            : 1;

          this.rootStore.track.changeTrack(
            this.rootStore.track.takeTrack(number)
          );

          this.dataSharing();

          if (numberTrack.track[1]) {
            this.rootStore.sound.audio.currentTime = numberTrack.track[1];
            this.rootStore.time.currentTime = numberTrack.track[1];
          }
          resolve();
        })
        .catch((e) => {
          this.rootStore.notifications.addMessage(this.messageType.ERROR);
        });
    });
  };

  @action dataSharing = () => {
    this.rootStore.track.changetracksAlreadyBeenPlayed(
      this.rootStore.track.track
    );
    this.rootStore.sound.audio.src = this.rootStore.track.track.src;
    this.upDateData();
  };

  @action upDateData = () => {
    this.rootStore.list.trackListSound = this.rootStore.trackList.initialFullTrackList;
    this.rootStore.search.trackListSearch = this.rootStore.trackList.initialFullTrackList;
    this.rootStore.search.takeData();
  };

  @action takeInfoAboutTrack = (id) => {
    return new Promise((resolve, reject) => {
      this.api.dataSend
        .takeAllDataTheTrack(id)
        .then((data) => {
          resolve();
          this.rootStore.track.allInfoTrack = { ...data };
        })
        .catch(() => {
          this.rootStore.notifications.addMessage(this.messageType.ERROR);
          reject();
        });
    });
  };

  catchPage404 = () => {
    return new Promise((resolve, reject) => {
      this.loadDataTrackAndSharingOtherStore()
        .then(() => {
          this.takeDataOneTrack(this.rootStore.track.track.id);
          resolve();
        })
        .catch(() => {
          this.rootStore.notifications.addMessage(this.messageType.ERROR);
          reject();
        });
    });
  };

  validLocation = (loc) => /\/play\//i.test(loc);
}
