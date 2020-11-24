import React from 'react';
import Setting from './view';
import Overlay from '~c/universal/overlayUnderMenu/';
import Modal from '~c/universal/modal/';
import style from './setting.module.css';

export default class SettingItem extends React.Component {
  click = (e) => {
    this.toggleOpen(e);
  };

  state = {
    open: false,
  };

  toggleOpen = (e) => {
    if (e) {
      e.stopPropagation();
    }
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };

  delete = (e) => {
    this.toggleOpen(e);
    this.props.delete();
  };

  render() {
    return (
      <>
        <Setting click={this.click} />
        <Overlay toggle={this.toggleOpen} status={this.state.open} modal={true}>
          <Modal>
            <h4 className={style.title} onClick={this.delete}>
              {this.props.text}
            </h4>
          </Modal>
        </Overlay>
      </>
    );
  }
}
