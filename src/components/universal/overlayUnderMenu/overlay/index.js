import React from 'react';
import { CSSTransition } from 'react-transition-group';
import style from './overlay.css';

export default function (props) {
  const toggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    props.toggle();
  };

  return props.modal ? (
    <CSSTransition
      in={props.status}
      classNames={'overlay'}
      timeout={200}
      mountOnEnter
      unmountOnExit
    >
      <div className={'overlay'} onClick={toggle}></div>
    </CSSTransition>
  ) : (
    <div className={'overlay'} onClick={toggle}></div>
  );
}
