import React from 'react';
import style from '~c/universal/menu/menu.module.css';
import { routeMap } from '~/router/';
import { Link } from 'react-router-dom';

export default function (props) {
  let menu = [
    {
      svg: (
        <svg
          version='1.1'
          id={style.message}
          xmlns='http://www.w3.org/2000/svg'
          xmlnsXlink='http://www.w3.org/1999/xlink'
          x='0px'
          y='0px'
          viewBox='0 0 26 26'
          xmlSpace='preserve'
        >
          <path
            className={style.message}
            d='M13,0C5.8,0,0,5.8,0,13s5.8,13,13,13s13-5.8,13-13S20.2,0,13,0z M13,6c0.6,0,1.1,0.5,1.1,1.2
	c0,0.6-0.5,1.1-1.1,1.1c-0.6,0-1.1-0.5-1.1-1.1C11.9,6.5,12.4,6,13,6z M15.5,20h-4.7v-0.6c1.3-0.1,1.5-0.2,1.5-1.7v-4.4
	c0-1.3-0.1-1.4-1.3-1.6v-0.5c1.1-0.2,2.1-0.5,3-0.8v7.3c0,1.4,0.2,1.5,1.5,1.7V20z'
          />
        </svg>
      ),
      linkText: 'О приложении',
      link: routeMap.about,
    },
  ];

  let menuList = menu.map((el, i) => {
    return (
      <li className={style.list} key={i}>
        {el.svg}
        <Link className={style.link} to={el.link}>
          {el.linkText}
        </Link>
      </li>
    );
  });
  return menuList;
}
