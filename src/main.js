import React from 'react';
import ReactDom from 'react-dom';
import App from './app';

import { Provider } from 'mobx-react';
import stores from '~s';
import Notifications from '~c/universal/notifications';
import { ERROR } from '../typeMessage';

stores.id3
  .load()
  .then(() => {
    ReactDom.render(
      <Provider stores={stores}>
        <Notifications />
        <App />
      </Provider>,
      document.querySelector('#app')
    );
  })
  .then(() => {
    stores.api.dataEqualizer
      .takeSetting(stores.id3.storage.track)
      .then((data) => {
        stores.equalizer.settingsEqualizer = {
          ...stores.equalizer.settingsEqualizer,
          ...JSON.parse(data),
        };
      })
      .then(() => {
        stores.autoName.filterNameDataInitialization(
          stores.equalizer.typeUserAutoSetting,
          stores.equalizer.userSettingName,
          stores.equalizer.settingsEqualizer
        );
      })
      .catch((e) => {
        stores.notifications.addMessage(ERROR);
      });

    stores.api.dataPlayLists
      .takeData(stores.id3.storage.track)
      .then((data) => {
        let listObj = JSON.parse(data);
        stores.playList.upLoadPlayList(listObj);
      })
      .then(() => {
        stores.autoName.filterNameDataInitialization(
          stores.playList.typeNameAutoPlayList,
          stores.playList.userPlayListName,
          stores.playList.trackListSound
        );
      })
      .catch(() => {
        stores.notifications.addMessage(ERROR);
      });
  })
  .then(() => {
    stores.api.dataTrack
      .takeFavoriteTrack(stores.storage.track)
      .then((data) => {
        return stores.track.favoriteLoad(JSON.parse(data));
      })
      .catch(() => {
        stores.notifications.addMessage(ERROR);
      });

    window.addEventListener('unload', function () {
      let analyticsData = {
        id: stores.track.track.id,
        time: stores.sound.audio.currentTime,
        token: stores.storage.track,
      };
      navigator.sendBeacon(
        `../playerphp/sound/playTrack.php`,
        JSON.stringify(analyticsData)
      );
    });
  })
  .catch((e) => {
    stores.notifications.addMessage(ERROR);
  });
