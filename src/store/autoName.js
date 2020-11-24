import { action } from 'mobx';

export default class AutoName {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @action findAndDeleteSettingName = (name, object) => {
    for (let key in object) {
      if (object[key].name == name) {
        return delete object[key];
      }
    }
  };

  @action filterNameDataInitialization = (type, object, data) => {
    if (Array.isArray(data)) {
      data.map((playList) => {
        this.numberIncrease(playList.name, object, type);
      });
    } else {
      for (let key in data) {
        this.numberIncrease(data[key].name || key, object, type);
      }
    }
  };

  @action numberIncrease = (text, object, type) => {
    const result = new RegExp(`\^\\${type}\\s\\d{1,}$`).test(text);

    if (result) {
      let number = text.slice(type.length + 1);
      object[number] = {
        name: text,
      };
    }
  };

  getNumber(object) {
    if (object[1] == undefined) {
      return 1;
    }

    const keysArr = Object.keys(object).sort((a, b) => a - b);
    let number;
    for (let i = 0; i < keysArr.length; i++) {
      if (keysArr[i] == i + 1) {
        number = i + 2;
      } else {
        return (number = i + 1);
      }
    }

    return number;
  }
}
