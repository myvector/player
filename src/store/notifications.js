import { observable, computed, action } from 'mobx';

export default class Notifications {
  @observable notifications = {};
  ai = 0;

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.getMessageText = this.rootStore.getMessageText;
  }

  @action addMessage(type, hide = 1700) {
    this.notifications[++this.ai] = {
      id: this.ai,
      message: this.getMessageText(type),
      type,
    };

    if (hide !== null) {
      let carringId = this.ai;

      setTimeout(() => {
        this.removeMessage(carringId);
      }, hide);
    }
  }

  @action removeMessage(id) {
    if (id in this.notifications) {
      delete this.notifications[id];
    }
  }

  @computed get fromListNotifications() {
    return Object.values(this.notifications);
  }
}
