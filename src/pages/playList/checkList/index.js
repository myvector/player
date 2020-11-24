import React from 'react';
import withStore from '~/hocs/withStore';
import CheckListCom from '~c/playList/checkList';

class CheckList extends React.PureComponent {
  add = (id) => {
    this.props.check(id);
  };

  render() {
    return (
      <CheckListCom
        title={this.props.title}
        text={this.props.text}
        id={this.props.id}
        info={true}
        choice={this.props.choice}
        add={this.add}
      />
    );
  }
}

export default withStore(CheckList);
