import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.querySelector('body');
export default class Portal extends React.Component {
  constructor(props) {
    super(props);

    this.el = document.createElement('div');
    modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    modalRoot.removeChild(this.el);
  }

  render() {
    return ReactDOM.createPortal(this.props.children, this.el);
  }
}
