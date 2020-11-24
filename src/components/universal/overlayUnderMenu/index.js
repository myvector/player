import React from 'react';
import withStore from '~/hocs/withStore';

import style from '~c/universal/menu/menu.module.css';
import styles from '~c/universal/menu/menu.css';

import Portal from '~c/universal/overlayUnderMenu/portal/';
import Overlay from '~c/universal/overlayUnderMenu/overlay/';
import { CSSTransition } from 'react-transition-group';

class Menu extends React.PureComponent {
  constructor(props) {
    super(props);

    this.portalShow = false;
  }

  state = {
    open: this.props.status,
    portalShow: null,
    animationPrevent: true,
  };

  toggleOpen = () => {
    if (this.state.animationPrevent) {
      this.setState((prevState) => ({
        open: !prevState.open,
        portalShow: true,
      }));
      this.portalShow = true;
    }
  };

  componentDidUpdate(prevProps) {
    if (prevProps.status !== this.props.status) {
      this.setState({ animationPrevent: true });
      this.toggleOpen();
    }
  }

  doNotAnimationPrevent = () => {
    this.setState({ animationPrevent: false });
  };

  exit = () => {
    if (!this.props.status) {
      this.setState({ portalShow: null });
    }
    this.setState({ animationPrevent: true });

    if (this.props.exit) {
      this.props.exit();
    }
  };

  propsToggle = () => {
    if (this.state.animationPrevent) {
      this.props.toggle();
    }
  };

  render() {
    if (!this.props.status && !this.state.portalShow) {
      return null;
    }

    let wrap, classTransition, height, side;

    const actionsRightSide = () => {
      if (this.props.right) {
        side = style.right;
        classTransition = 'menuWrapRight';
      } else {
        classTransition = 'menuWrap';
        side = style.left;
      }
    };

    if (this.props.modal) {
      wrap = style.modalWrapPosition;
      classTransition = 'modalWrap';
      height = side = '';
    } else {
      wrap = style.wrap;
      height = this.props.children.props.height ? style.wrapBottom : '';
      actionsRightSide();
    }

    return (
      <Portal>
        <div className={wrap + ' ' + side + ' ' + height}>
          <CSSTransition
            in={this.state.open}
            classNames={classTransition}
            timeout={{ enter: 200, exit: 200 }}
            mountOnEnter
            unmountOnExit
            onExit={() => this.doNotAnimationPrevent()}
            onExited={() => this.exit()}
          >
            {this.props.children}
          </CSSTransition>
        </div>
        <Overlay
          status={this.state.open}
          toggle={this.propsToggle}
          modal={this.props.modal}
        ></Overlay>
      </Portal>
    );
  }
}

export default withStore(Menu);
