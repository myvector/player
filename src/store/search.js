import { observable, action, computed } from 'mobx';

export default class Search {
  @observable trackListSearch = [];
  @observable findResult = [];

  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action takeData = () => {
    this.trackListSearch = this.rootStore.list.sort(this.trackListSearch);
  };

  @computed get returnResultFind() {
    return this.findResult.map((el) => {
      return {
        title: this.trackListSearch[el.i].title,
        id: el.id,
      };
    });
  }

  @action requestSearch = (value) => {
    this.findResult = [];

    if (value == null) {
      return;
    } else {
      value = value.target.value.toLowerCase();

      if (value !== '') {
        this.trackListSearch.map((el, i) => {
          let find = el.title.toLowerCase().search(value);

          if (find !== -1) {
            this.findResult.push({ find, i, id: el.id });
          }
        });
      }
    }
  };
}
