import React from 'react';
import Overlay from '~c/universal/overlayUnderMenu/';
import style from './newPlayList.module.css';
import withStore from '~/hocs/withStore';
import Modal from '~c/universal/modal/';
import CheckList from '~p/playList/checkList/';
import Name from '~c/universal/nameWindow/';
import { MESSAGE_TRACK_HAVE } from '../../../../typeMessage';

class NewPlayList extends React.Component {
  state = {
    checkObj: {},
    open: false,
    playList: { trackId: {}, name: null },
    text: this.props.stores.playList.typeNameAutoPlayList + ' ',
    showPlayListModal: false,
  };

  toggleOpen = () => {
    this.setState((prevState) => ({
      open: !prevState.open,
      showPlayListModal: false,
    }));
  };

  addSoundInPlayList = (id) => {
    if (this.state.checkObj.hasOwnProperty(id)) {
      this.props.stores.notifications.addMessage(MESSAGE_TRACK_HAVE);
      return;
    } else {
      const findTrack = this.props.stores.search.trackListSearch.find(
        (track) => track.id == id
      );

      if (findTrack !== -1) {
        let track = { ...this.state.playList };
        track.trackId = {
          ...this.state.playList.trackId,
          [findTrack.id]: findTrack.id,
        };

        this.setState({
          playList: { ...track },
          checkObj: { ...this.state.checkObj, [findTrack.id]: findTrack.id },
        });
      }
    }
  };

  showPlayList = (text) => {
    let name = {
      ...this.state.playList,
      ...this.state.playList.name,
      name: text,
    };

    this.setState({
      showPlayListModal: true,
      open: false,
      playList: {
        ...name,
      },
    });
  };

  createNewPlayList = () => {
    this.setState(
      {
        showPlayListModal: false,
        checkObj: {},
        playList: { trackId: {}, name: null },
      },
      () => {
        this.toggleOpen();
      }
    );
  };

  closeList = () => {
    let playListData = {
      [this.state.playList.name]: this.state.playList.trackId,
    };

    this.props.stores.playList
      .newPlayList(playListData, this.state.playList.name)
      .finally(() => {
        this.setState((prevState) => ({
          list: true,
          open: !prevState.open,
        }));
      });
  };

  nextWindow = () => {
    if (this.state.showPlayListModal) {
      this.setState({ open: true });
    }
  };

  close = () => {
    this.setState(() => ({
      list: false,
    }));
  };

  render() {
    let name, playList, list;

    name = (
      <Overlay
        exit={this.nextWindow}
        toggle={this.toggleOpen}
        status={this.state.open && !this.state.showPlayListModal}
        modal={true}
      >
        <Modal>
          <Name
            title={'Имя плейлиста'}
            subTitle={'Введите имя плейлиста'}
            text={this.state.text + this.props.stores.playList.getNumber}
            success={this.showPlayList}
            cancel={this.toggleOpen}
          ></Name>
        </Modal>
      </Overlay>
    );

    if (this.state.list || (this.state.open && this.state.showPlayListModal)) {
      list = this.props.stores.search.trackListSearch.map((el, i) => {
        return (
          <CheckList
            title={el.title}
            text={el.band}
            id={el.id}
            key={el.id}
            check={this.addSoundInPlayList}
            choice={this.state.checkObj[el.id] ? true : false}
          />
        );
      });
    }

    playList = (
      <Overlay
        exit={this.close}
        toggle={this.closeList}
        status={this.state.open && this.state.showPlayListModal}
        modal={true}
      >
        <Modal>
          <ul className={style.innerList}>{list}</ul>
        </Modal>
      </Overlay>
    );

    return (
      <>
        <button className={style.addPlayList} onClick={this.createNewPlayList}>
          Создать новый плейлист
        </button>
        {name}
        {playList}
      </>
    );
  }
}

export default withStore(NewPlayList);
