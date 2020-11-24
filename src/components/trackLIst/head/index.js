import React from 'react';
import style from './head.module.css';
import Menu from '~p/trackList/menu/';
import Sort from '~p/trackList/sort/';

export default function head(props) {
  return (
    <div className={style.head}>
      <Menu width={'auto'} />
      <div onClick={props.search} className={style.search}>
        <svg
          version='1.1'
          id='Слой_1'
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          x='0px'
          y='0px'
          viewBox='0 0 16.6 16.1'
          xmlSpace='preserve'
          className={style.searchIcon}
        >
          <g>
            <g>
              <path
                className={style.st0}
                d='M0.1,14.2c-0.2-0.2-0.2-0.5,0-0.7l4.4-4c0.2-0.2,0.5-0.2,0.7,0l1.6,1.8c0.2,0.2,0.2,0.5,0,0.7l-4.4,4
			c-0.2,0.2-0.5,0.2-0.7,0L0.1,14.2z'
              />
              <path
                className={style.st0}
                d='M10.8,0c0.6,0,1.3,0.1,1.9,0.3c3,1,4.6,4.4,3.6,7.4c-0.8,2.4-3.1,3.9-5.5,3.9c-0.6,0-1.3-0.1-1.9-0.3
			c-3-1-4.6-4.4-3.6-7.4C6.1,1.5,8.4,0,10.8,0 M10.8,1.7C9,1.7,7.5,2.8,6.9,4.5c-0.4,1-0.3,2.1,0.2,3.1c0.5,1,1.3,1.7,2.3,2.1
			c0.4,0.2,0.9,0.2,1.3,0.2c1.7,0,3.3-1.1,3.9-2.7C15,6.1,14.9,5,14.4,4C14,3,13.1,2.3,12.1,2l0,0C11.7,1.8,11.2,1.7,10.8,1.7
			L10.8,1.7z'
              />
            </g>
          </g>
        </svg>
      </div>
      <div className={style.subOptionsInner}>
        <svg
          onClick={props.fullScreen}
          version='1.1'
          id={style.fullScreen}
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          x='0px'
          y='0px'
          viewBox='0 0 20.5 20.5'
          xmlSpace='preserve'
        >
          <polyline
            className={style.borderFullScreen}
            points='0.8,5.8 0.8,0.8 6.8,0.8 '
          />
          <polyline
            className={style.borderFullScreen}
            points='19.8,5.8 19.8,0.8 13.8,0.8 '
          />
          <polyline
            className={style.borderFullScreen}
            points='0.8,14.8 0.8,19.8 6.8,19.8 '
          />
          <polyline
            className={style.borderFullScreen}
            points='19.8,14.8 19.8,19.8 13.8,19.8 '
          />
        </svg>
        <Sort />
      </div>
    </div>
  );
}
