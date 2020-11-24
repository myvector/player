import React from 'react';
import style from './search.module.css';

export default function Search(props) {
  return (
    <>
      <div onClick={props.home} className={style.backButton}>
        <svg
          className={style.backIcon}
          version='1.1'
          id='Слой_1'
          x='0px'
          y='0px'
          viewBox='0 0 14 16.3'
          xmlSpace='preserve'
        >
          <polygon points='7,4.1 14,0 14,8.2 14,16.3 7,12.2 0,8.2 ' />
        </svg>
      </div>
      <input
        autoFocus={true}
        className={style.inputSearch}
        onChange={(e) => props.search(e)}
      />
      {props.children}
    </>
  );
}
