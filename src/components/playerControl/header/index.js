import React from 'react';
import styles from './header.module.css';

export default function (props) {
  const style = props.style || '';

  return (
    <div
      className={styles.header + ' ' + style}
      style={{ background: props.color }}
    >
      <div onClick={props.goBack} className={styles.backLink}>
        <svg
          className={styles.back}
          version='1.1'
          id='Back'
          x='0px'
          y='0px'
          viewBox='0 0 13.1 15.3'
          xmlSpace='preserve'
        >
          <polygon
            className={styles.st0}
            points='6.6,3.8 13.1,0 13.1,7.7 13.1,15.3 6.6,11.5 0,7.7 '
          />
        </svg>
      </div>
      {props.children}
    </div>
  );
}
