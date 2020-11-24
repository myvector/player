import { observable, action, computed } from 'mobx';

export default class Equalizer {
  @observable gain = [0, 0, 0, 0, 0, 0, 0, 0];
  @observable settingsEqualizer = {
    default: {
      name: 'По умолчанию',
      data: [0, 0, 0, 0, 0, 0, 0, 0],
      standart: true,
    },

    rock: {
      name: 'Рок',
      data: [6, -10, -4, -2, -4, 0, -3, 0],
      standart: true,
    },

    jazz: { name: 'Джаз', data: [5, 4, 5, 2, 5, 4, 6, 4], standart: true },

    grunge: {
      name: 'Гранж',
      data: [-10, -10, -10, -10, -10, -10, -10, -10],
      standart: true,
    },
  };

  @observable nameSetting = 'default';
  @observable propsChange = this.nameSetting;
  @observable userSettingName = {};

  constructor(rootStore) {
    this.rootStore = rootStore;
    this.dataEqualizer = this.rootStore.api.dataEqualizer;
    this.audio = this.rootStore.audio;
    this.storage = this.rootStore.storage;
    this.audioContext = this.rootStore.audioCtx;
    this.audio.setAttribute('crossorigin', 'anonymous');
    this.messageType = rootStore.messageType;

    this.source = this.audioContext.createMediaElementSource(this.audio);

    this.equalizerSettings = [
      { frequency: 300, type: 'lowshelf', Q: 1, khz: '50Hz' },
      { frequency: 1000, type: 'peaking', Q: 2.5, khz: '1Khz' },
      { frequency: 2500, type: 'peaking', Q: 3.2, khz: '2.5Khz' },
      { frequency: 4000, type: 'peaking', Q: 3, khz: '4Khz' },
      { frequency: 6500, type: 'peaking', Q: 3, khz: '6.5Khz' },
      { frequency: 12000, type: 'peaking', Q: 2.5, khz: '12Khz' },
      { frequency: 14000, type: 'peaking', Q: 2.4, khz: '14Khz' },
      { frequency: 16000, type: 'highshelf', Q: 1, khz: '16Khz' },
    ];
    this.biquads = this.settingEqualiezerInit();
    this.typeUserAutoSetting = 'Моя настройка';
    this.audio.volume = 0.5;
  }

  settingEqualiezerInit = () => {
    let biquads = [],
      i;

    for (i = 0; i < this.equalizerSettings.length; i++) {
      biquads[i] = this.audioContext.createBiquadFilter();
      biquads[i].Q.value = this.equalizerSettings[i].Q;
      biquads[i].type = this.equalizerSettings[i].type;
      biquads[i].frequency.value = this.equalizerSettings[i].frequency;
    }

    this.source.connect(biquads[0]);
    for (i = 1; i < this.equalizerSettings.length; i++) {
      biquads[i - 1].connect(biquads[i]);
    }
    biquads[7].connect(this.audioContext.destination);
    return biquads;
  };

  // transform

  transformValueRangeInKhz = (value) => {
    let signNumb = value - 50;
    let sign = Math.sign(signNumb);
    let val = ((Math.abs(signNumb) * 2) / 10) | 0;

    if (sign == -1 || val == 0) {
      val = val / -1;
    }
    return val;
  };

  transformKhzInValueRange = (khz) => {
    return (khz / 2) * 10 + 50;
  };

  /// gain array

  @action gainChange = (arr) => {
    this.gain = [...arr];
  };

  useNewModeSettings = (array) => {
    for (let i = 0; i < this.equalizerSettings.length; i++) {
      this.biquads[i].gain.value = array[i];
    }
    this.gainChange(array);
  };

  @action gainCopyParam = () => {
    for (let i = 0; i < this.equalizerSettings.length; i++) {
      this.gain[i] = this.biquads[i].gain.value;
    }
  };

  // range Change

  @action rangeOnChange = (id, value) => {
    this.biquads[id].gain.value = this.transformValueRangeInKhz(value);
  };

  @action replaySpecialOnChange = () => {
    if (this.nameSetting !== 'special') {
      this.nameSetting = 'special';
    }
  };

  // setting

  saveSattings = (text) => {
    let tmpSetting = [];

    for (let i = 0; i < this.biquads.length; i++) {
      tmpSetting.push(this.biquads[i].gain.value);
    }

    let setting = { name: text, data: tmpSetting };
    this.addSetting(setting.name, setting);
    this.changeSetting(text);
    this.rootStore.autoName.numberIncrease(
      text,
      this.userSettingName,
      this.typeUserAutoSetting
    );
  };

  @action addSetting = (name, obj) => {
    this.settingsEqualizer[name] = obj;
  };

  @action deleteSetting = (name) => {
    if (name == this.nameSetting) {
      this.changeSetting('default');
    }

    this.rootStore.autoName.findAndDeleteSettingName(
      name,
      this.userSettingName
    );

    let obj = { ...this.settingsEqualizer };
    delete obj[name];
    this.settingsEqualizer = { ...obj };
  };

  changeSetting = (key) => {
    this.useNewModeSettings(this.settingsEqualizer[key].data);
    this.changeNameSettingGenre(key);
    this.changeChildrenProps();
  };

  @action changeNameSettingGenre = (name) => {
    this.nameSetting = name;
  };

  @computed get getNameSetting() {
    if (this.nameSetting == 'special') {
      return 'Особый';
    } else {
      if (this.nameSetting in this.settingsEqualizer) {
        return this.settingsEqualizer[this.nameSetting].name;
      }
    }
  }

  // update children elements

  @action changeChildrenProps = () => {
    if (this.propsChange == this.nameSetting) {
      this.propsChange = 're-render';
    } else {
      this.propsChange = this.nameSetting;
    }
  };

  @computed get numberUserSetting() {
    return this.rootStore.autoName.getNumber(this.userSettingName);
  }

  // send

  @action saveEqualizerSetting = (text, afterSend) => {
    this.saveSattings(text);
    afterSend();
    this.sendData(
      this.messageType.MESSAGE_SAVE_EQUALIZER,
      this.messageType.NOT_SAVE
    );
  };

  @action deleteEqualizerSetting = (name, afterSend) => {
    this.deleteSetting(name);
    afterSend();
    this.sendData(this.messageType.DELETE_EQUALIZER, this.messageType.ERROR);
  };

  @action sendData = (messegeRes, messegeRej) => {
    return new Promise((resolve, reject) => {
      this.dataEqualizer
        .sendSetting(this.settingsEqualizer, this.storage.track)
        .catch((_) => {
          this.rootStore.notifications.addMessage(messegeRej);
          reject();
          return Promise.reject();
        })
        .then(() => {
          resolve();
          this.rootStore.notifications.addMessage(messegeRes);
        });
    });
  };
}
