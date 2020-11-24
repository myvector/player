import React from 'react';
import Overlay from '~c/universal/overlayUnderMenu/';
import withStore from '~/hocs/withStore';
import Modal from '~c/universal/modal/';
import SelectCom from '~c/universal/select/';

import iconStyle from '~c/universal/menu/menu.module.css';
import style from './selectSetting.module.css';

class Select extends React.Component {
  toggleOpen = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };

  state = {
    open: false,
  };

  change = (key) => {
    this.toggleOpen();
    this.props.stores.equalizer.changeSetting(key);
  };

  delete = (e, key) => {
    e.stopPropagation();
    this.props.stores.equalizer.deleteEqualizerSetting(key, this.toggleOpen);
  };

  render() {
    let settingsList = [];
    for (let key in this.props.stores.equalizer.settingsEqualizer) {
      settingsList.push(
        <li onClick={() => this.change(key)} key={key} className={style.list}>
          {this.props.stores.equalizer.settingsEqualizer[key].name}

          {this.props.stores.equalizer.settingsEqualizer[key]
            .standart ? null : (
            <svg
              onClick={(e) => this.delete(e, key)}
              className={style.delete}
              xmlns='http://www.w3.org/2000/svg'
              width='15.688'
              height='19.535'
              x='0'
              y='0'
              enableBackground='new 0 0 15.688 19.535'
              version='1.1'
              viewBox='0 0 15.688 19.535'
              xmlSpace='preserve'
            >
              <g fill='#F60'>
                <path d='M2.228 17.724c.116.995 1.031 1.812 2.035 1.812h7.16c1.004 0 1.92-.816 2.035-1.812L14.951 4.9H.738l1.49 12.824zm8.931-11.177a.618.618 0 01.665-.564.62.62 0 01.564.668l-.875 10.306a.616.616 0 01-1.229-.104l.875-10.306zm-3.931.051a.617.617 0 111.231 0v10.307a.616.616 0 11-1.231 0V6.598zm-3.365-.615a.618.618 0 01.666.564l.873 10.306a.615.615 0 01-1.227.104L3.3 6.651a.62.62 0 01.563-.668zM10.165 1.206a.986.986 0 00.024-.207V.948A.95.95 0 009.24 0H7.106a.952.952 0 00-.949.948v.051c0 .073.011.141.025.207h3.983zM14.189 2.053H1.498C.628 2.066.004 2.586 0 3.392v.568h15.688v-.568c-.005-.806-.631-1.326-1.499-1.339z' />
              </g>
            </svg>
          )}
        </li>
      );
    }
    return (
      <>
        <SelectCom onClick={this.toggleOpen} text={this.props.text}></SelectCom>
        <Overlay toggle={this.toggleOpen} status={this.state.open} modal={true}>
          <Modal>
            <ul className={style.wrapList}>{settingsList}</ul>
          </Modal>
        </Overlay>
      </>
    );
  }
}
export default withStore(Select);
