import React from 'react';
import ListCom from '~c/playList/list';
import { urlBuilder } from '~/router/';

export default class List extends React.Component {
  clickOnPlayListItem = () => {
    let str = this.props.title;

    if (this.props.checkRefresh(str)) {
      this.props.refreshData(str);
    }

    this.props.history.push(urlBuilder('playList', { id: str }, true));
  };

  render() {
    return (
      <ListCom
        click={this.clickOnPlayListItem}
        current={this.props.current}
        title={this.props.title}
        delete={this.props.delete}
      />
    );
  }
}
