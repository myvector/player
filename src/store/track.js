import { observable, action, computed } from 'mobx';

export default class Track {
  @observable track = {};
  @observable tracksAlreadyBeenPlayed = this.track;
  @observable cover = {};
  @observable allInfoTrack = {};
  @observable favoriteTrack = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.messageType = rootStore.messageType;
  }

  @action changeFavorite = () => {
    if (this.favoriteTrack.findIndex((el) => el == this.track.id) == -1) {
      this.addFavorite();
    } else {
      this.deleteFavorite();
    }
  };

  @action favoriteLoad = (favorite) => {
    if (favorite !== null) {
      this.favoriteTrack = favorite;
    }
  };

  @action addFavorite = () => {
    this.rootStore.api.dataTrack
      .sendFavoriteTrack(
        [...this.favoriteTrack, this.track.id],
        this.rootStore.storage.track
      )
      .then(() => {
        this.favoriteTrack.push(this.track.id);
        this.rootStore.notifications.addMessage(
          this.messageType.MESSAGE_SAVE_FAVORITE_TRACK
        );
      })
      .catch(() => {
        this.rootStore.notifications.addMessage(this.messageType.ERROR);
      });
  };

  @action deleteFavorite = () => {
    let favTmp = this.favoriteTrack.filter((el) => this.track.id !== el);
    this.rootStore.api.dataTrack
      .sendFavoriteTrack(favTmp, this.rootStore.storage.track)
      .then(() => {
        this.favoriteTrack = [...favTmp];
      })
      .catch(() => {
        this.rootStore.notifications.addMessage(this.messageType.ERROR);
      });
  };

  @computed get favorite() {
    return this.favoriteTrack.filter((el) => this.track.id === el).length;
  }

  @action changeTrack = (track) => (this.track = track);

  @action changetracksAlreadyBeenPlayed = (track) =>
    (this.tracksAlreadyBeenPlayed = track);

  takeTrack = (id, i) =>
    i
      ? this.rootStore.trackList.findTrackList[id].i
      : this.rootStore.trackList.findTrackList[id].track;

  returnData = (i, id, param) => {
    return i
      ? param
      : this.rootStore.trackList.findIdinitialFullTrackList[id].track;
  };

  changeSrcTrack = (id) => {
    this.changeTrack(this.takeTrack(id));
    this.rootStore.id3.dataSharing();
    this.rootStore.id3.takeDataOneTrack(this.track.id);
  };

  checkIfTheSameTrackIsSelected = (id) =>
    this.rootStore.track.tracksAlreadyBeenPlayed.id == id ? true : false;

  @action nextPrevChangeTrack = (type) => {
    const trackPlaying = this.takeTrack(this.track.id, true);
    const trackList = this.rootStore.trackList.trackList;

    if (
      this.rootStore.sound.playMode !== 'random' ||
      (this.rootStore.sound.playMode == 'random' &&
        this.rootStore.trackList.trackList.length < 2)
    ) {
      this.nextPrevTrack(type, trackPlaying, trackList);
      this.rootStore.sound.soundSourceOnPlay();
    } else {
      this.rootStore.sound.descriptionMode();
    }
    this.rootStore.id3.headTrackTitle;
  };

  @action nextPrevTrack = (type, trackPlaying, trackList) => {
    switch (type) {
      case 'next':
        if (trackPlaying + 1 > trackList.length - 1) {
          this.changeTrack(trackList[0]);
          this.rootStore.id3.takeDataOneTrack(this.track.id);
        } else {
          this.changeTrack(trackList[trackPlaying + 1]);
          this.rootStore.id3.takeDataOneTrack(this.track.id);
        }

        break;
      case 'prev':
        if (trackPlaying - 1 < 0) {
          this.changeTrack(trackList[trackList.length - 1]);
          this.rootStore.id3.takeDataOneTrack(this.track.id);
        } else {
          this.changeTrack(trackList[trackPlaying - 1]);
          this.rootStore.id3.takeDataOneTrack(this.track.id);
        }

        break;
    }
  };

  @computed get getIdTrackPlay() {
    return this.track.id;
  }
}
