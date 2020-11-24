import React from 'react';
import Overlay from '~c/universal/overlayUnderMenu/';
import MenuRightCom from '~c/playerControl/menu/right';
import MenuCom from '~c/universal/menu';
import style from '~p/playerControl/header/header.module.css';

export default class extends React.Component {
  state = {
    open: false,
  };

  toggleOpen = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };

  deleteTrack = () => {
    this.props.deleteTrack(this.props.id);
    this.toggleOpen();
  };

  render() {
    return (
      <>
        <svg
          version='1.1'
          id='burger'
          className={style.burger}
          onClick={this.toggleOpen}
        >
          <rect className={style.st0} width='34' height='4' />
          <rect y='8' className={style.st0} width='34' height='4' />
          <rect y='16' className={style.st0} width='34' height='4' />
        </svg>
        <Overlay toggle={this.toggleOpen} status={this.state.open} right={true}>
          <MenuCom>
            <MenuRightCom deleteTrack={this.deleteTrack} />
          </MenuCom>
        </Overlay>
      </>
    );
  }
}
