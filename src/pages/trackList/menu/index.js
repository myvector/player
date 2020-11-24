import React from 'react';
import Overlay from '~c/universal/overlayUnderMenu/';
import MenuLeftCom from '~c/trackList/menu/left';
import MenuCom from '~c/universal/menu';
import style from '~c/trackList/head/head.module.css';

export default class extends React.Component {
  toggleOpen = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };

  state = {
    open: false,
  };

  render() {
    return (
      <>
        <svg
          onClick={this.toggleOpen}
          version='1.1'
          id={style.setting}
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          x='0px'
          y='0px'
          viewBox='0 0 22.4 22.4'
          xmlSpace='preserve'
        >
          <g>
            <path
              className={style.st0}
              d='M22.4,13.4V9.2h-3.6c-0.2-0.6-0.4-1.2-0.7-1.7l2.6-2.6l-3-3l-2.6,2.6c-0.5-0.3-1.1-0.6-1.7-0.7V0H9.2v3.7
            C8.6,3.9,8.1,4.1,7.5,4.4L4.9,1.7l-3,3l2.6,2.6C4.1,7.8,3.9,8.4,3.7,9H0v4.2h3.5c0.1,0.6,0.4,1.2,0.6,1.7l-2.5,2.5l3,3L7,18
            c0.6,0.4,1.3,0.7,2,0.9v3.5h4.2V19c0.7-0.2,1.3-0.4,1.9-0.8l2.5,2.5l3-3L18,15.3c0.3-0.6,0.6-1.2,0.8-1.8H22.4z M11.2,17.9
            c-3.6,0-6.6-2.9-6.6-6.6c0-3.6,2.9-6.6,6.6-6.6c3.6,0,6.6,2.9,6.6,6.6C17.8,15,14.8,17.9,11.2,17.9z'
            />
          </g>
        </svg>
        <Overlay toggle={this.toggleOpen} status={this.state.open}>
          <MenuCom height={'100%'}>
            <MenuLeftCom />
          </MenuCom>
        </Overlay>
      </>
    );
  }
}
