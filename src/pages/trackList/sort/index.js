import React from 'react';
import Overlay from '~c/universal/overlayUnderMenu/';
import style from '~c/trackList/head/head.module.css';
import withStore from '~/hocs/withStore';
import Modal from '~c/universal/modal/';
import Sort from '~c/trackList/sort/';

class SortButton extends React.Component {
  toggleOpen = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
    }));
  };

  sort = () => {
    this.props.stores.list.sortList();
    this.toggleOpen();
  };

  state = {
    open: false,
  };

  render() {
    return (
      <>
        <svg
          version='1.1'
          id={style.sort}
          x='0px'
          y='0px'
          viewBox='0 0 14 14'
          xmlSpace='preserve'
          onClick={this.toggleOpen}
        >
          <g>
            <circle className={style.sort} cx='3.1' cy='3.1' r='3.1' />
            <circle className={style.sort} cx='10.9' cy='3.1' r='3.1' />
            <circle className={style.sort} cx='3.1' cy='10.9' r='3.1' />
            <circle className={style.sort} cx='10.9' cy='10.9' r='3.1' />
          </g>
        </svg>
        <Overlay toggle={this.toggleOpen} status={this.state.open} modal={true}>
          <Modal>
            <Sort sort={this.sort} />
          </Modal>
        </Overlay>
      </>
    );
  }
}

export default withStore(SortButton);
