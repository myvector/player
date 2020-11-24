import { observable, action } from 'mobx';

export default class Sound {
  @observable trackListSound = {};

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action sortList = () => {
    this.rootStore.trackList.initialFullTrackList = [
      ...this.rootStore.search.trackListSearch,
    ];

    this.rootStore.trackList.upDateFindInintialFullPlayList();
    this.trackListSound = [...this.rootStore.trackList.initialFullTrackList];

    if (!this.rootStore.playList.getPlayListCheck) {
      this.rootStore.trackList.changeTrackList(
        this.rootStore.trackList.initialFullTrackList,
        this.rootStore.trackList.findIdinitialFullTrackList
      );
    }
  };

  sort = (arr) => {
    return arr.slice().sort(function (a, b) {
      if (a.title > b.title) {
        return 1;
      }
      if (a.title < b.title) {
        return -1;
      }
      return 0;
    });
  };
}
