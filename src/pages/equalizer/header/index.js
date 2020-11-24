import React from 'react';
import HeaderCom from '~c/playerControl/header';
import styles from './header.module.css';
import Save from '~p/equalizer/save/';

export default function Header(props) {
  return (
    <HeaderCom style={styles.header} goBack={props.goBack}>
      <Save />
    </HeaderCom>
  );
}
