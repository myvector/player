import { observable, action, computed } from 'mobx';

export default class TrackList {
  @observable initialFullTrackList = [];
  @observable trackList = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.findIdinitialFullTrackList = {};
    this.findTrackList = {};
    this.messageType = rootStore.messageType;
  }

  @action changeTrackList = (newTrackList, newFind) => {
    this.trackList = [...newTrackList];
    this.findTrackList = { ...newFind };
  };

  @action defaultTrackList = () => {
    this.trackList = [...this.initialFullTrackList];
    this.findTrackList = { ...this.findIdinitialFullTrackList };
  };

  @action upDateFindInintialFullPlayList = () => {
    this.findIdinitialFullTrackList = this.rootStore.arraySearchId.arr(
      this.initialFullTrackList
    );
  };

  @action newListAfterDeleteTrack = (id) => {
    this.initialFullTrackList = [
      ...this.cutDeleteTrack(
        this.initialFullTrackList,
        this.findIdinitialFullTrackList,
        id
      ),
    ];

    this.findIdinitialFullTrackList = this.rootStore.arraySearchId.arr(
      this.initialFullTrackList
    );
  };

  @action deleteTrack = (id) => {
    if (this.initialFullTrackList.length == 1) {
      this.rootStore.playList.deleteTrackMainTrackList(id);
      this.newListAfterDeleteTrack(id);

      this.rootStore.id3.upDateData();
      this.rootStore.sound.audio.pause();
      this.rootStore.sound.src = null;
    } else {
      this.getPlayinThisSongNowDoDeleteTrack(id);
      this.newListAfterDeleteTrack(id);

      this.rootStore.playList.deleteTrackMainTrackList(id);
      this.rootStore.id3.upDateData();
    }
    this.rootStore.notifications.addMessage(this.messageType.DELETE_TRACK);
  };

  @computed get getPlayinThisSongNowDoDeleteTrack() {
    return (id) => {
      if (this.rootStore.track.getIdTrackPlay == id) {
        return this.checkPlayingTrackInThisTime();
      }
    };
  }

  @computed get getEmptyTrackList() {
    if (this.initialFullTrackList.length == 0) {
      return true;
    }
  }

  checkPlayingTrackInThisTime = () => {
    if (!this.rootStore.sound.statePlay) {
      this.rootStore.track.nextPrevChangeTrack('next');
    } else {
      const id = this.rootStore.track.track.id;
      const trackPlaying = this.rootStore.track.takeTrack(id, true);
      const trackList = this.rootStore.trackList.trackList;
      this.rootStore.track.nextPrevTrack('next', trackPlaying, trackList);
      this.rootStore.track.changeSrcTrack(this.rootStore.track.getIdTrackPlay);
    }
  };

  cutDeleteTrack = (arr, obj, id) => {
    let trackListCleaned = [...arr];
    trackListCleaned.splice(obj[id].i, 1);
    return trackListCleaned;
  };
}
