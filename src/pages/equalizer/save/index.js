import React from 'react';
import Overlay from '~c/universal/overlayUnderMenu/';
import style from './save.module.css';
import withStore from '~/hocs/withStore';
import Modal from '~c/universal/modal/';
import Name from '~c/universal/nameWindow/';

class SaveButton extends React.Component {
  state = {
    open: false,
    text: 'Моя настройка ',
  };

  toggleOpen = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };

  save = (text, e) => {
    this.props.stores.equalizer.saveEqualizerSetting(text, this.toggleOpen);
  };

  cancel = () => {
    this.toggleOpen();
  };

  render() {
    return (
      <>
        <svg
          onClick={this.toggleOpen}
          version='1.1'
          id='save'
          className={style.save}
          x='0px'
          y='0px'
          viewBox='0 0 100 121.5'
          className={style.save}
        >
          <g>
            <path
              className={style.st0}
              d='M25.5,0L0,23.5v98h100V0.5L25.5,0z M50,74.3c-7.5,0-13.5-6-13.5-13.5c0-7.5,6-13.5,13.5-13.5s13.5,6,13.5,13.5
C63.5,68.2,57.5,74.3,50,74.3z M89,22.5H28v-18h61V22.5z M40.3,6h-6.7v15h6.7V6z'
            />
          </g>
        </svg>
        <Overlay toggle={this.toggleOpen} status={this.state.open} modal={true}>
          <Modal>
            <Name
              title={'Имя настройки'}
              subTitle={'Введите имя настройки'}
              text={
                this.state.text + this.props.stores.equalizer.numberUserSetting
              }
              success={this.save}
              cancel={this.cancel}
            />
          </Modal>
        </Overlay>
      </>
    );
  }
}

export default withStore(SaveButton);
