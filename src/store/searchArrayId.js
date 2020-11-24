export default class searchArrayId {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  arr = (arr) => {
    let index = {};

    arr.forEach((el, i) => {
      if (!el.id) {
        index[el] = { track: el, i };
      } else {
        index[el.id] = { track: el, i };
      }
    });
    return index;
  };

  changeIdOnTrack = (arr, trackList) => {
    let index = {};

    arr.forEach((el, i) => {
      index[el] = { track: trackList[el].track, i };
    });
    return index;
  };
}
