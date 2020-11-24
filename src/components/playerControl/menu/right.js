import React from 'react';
import style from '~c/universal/menu/menu.module.css';
import { Link } from 'react-router-dom';
import { routeMap } from '~/router/';

export default function (props) {
  let menu = [
    {
      svg: (
        <svg className={style.playList}>
          <use xlinkHref='#playList'></use>
        </svg>
      ),
      linkText: 'Плейлист',
      path: routeMap.playList,
    },
    {
      svg: (
        <svg className={style.equalizer}>
          <g fill='#F60'>
            <path d='M9.222 0L7.08 0 7.08 8.67 5.699 8.67 5.699 10.811 7.08 10.811 7.08 19.481 9.222 19.481 9.222 10.811 10.601 10.811 10.601 8.67 9.222 8.67z' />
            <path d='M3.523 0L1.381 0 1.381 12.866 0 12.866 0 15.008 1.381 15.008 1.381 19.481 3.523 19.481 3.523 15.008 4.903 15.008 4.903 12.866 3.523 12.866z' />
            <path d='M14.92 0L12.779 0 12.779 4.429 11.399 4.429 11.399 6.57 12.779 6.57 12.779 19.481 14.92 19.481 14.92 6.57 16.301 6.57 16.301 4.429 14.92 4.429z' />
            <path d='M20.62 10.61L20.62 0 18.479 0 18.479 10.61 17.092 10.61 17.092 12.751 18.479 12.751 18.479 19.481 20.62 19.481 20.62 12.751 22 12.751 22 10.61z' />
          </g>
        </svg>
      ),
      linkText: 'Эквалайзер',
      path: routeMap.equalizer,
    },
    {
      svg: (
        <svg
          className={style.visualization}
          xmlns='http://www.w3.org/2000/svg'
          width='20.875'
          height='20.178'
          x='0'
          y='0'
          enableBackground='new 0 0 20.875 20.178'
          version='1.1'
          viewBox='0 0 20.875 20.178'
          xmlSpace='preserve'
        >
          <path fill='#F60' d='M0 0H5.219V20.178H0z' />
          <path fill='#F60' d='M7.828 5.733H13.047V20.178H7.828z' />
          <path
            fill='#F60'
            d='M15.656 2.867H20.875V20.179000000000002H15.656z'
          />
        </svg>
      ),
      linkText: 'Визуализация',
      path: routeMap.vis,
    },
    {
      svg: (
        <svg
          id={'delete'}
          className={style.delete}
          xmlns='http://www.w3.org/2000/svg'
          width='15.688'
          height='19.535'
          x='0'
          y='0'
          enableBackground='new 0 0 15.688 19.535'
          version='1.1'
          viewBox='0 0 15.688 19.535'
          xmlSpace='preserve'
        >
          <g fill='#F60'>
            <path d='M2.228 17.724c.116.995 1.031 1.812 2.035 1.812h7.16c1.004 0 1.92-.816 2.035-1.812L14.951 4.9H.738l1.49 12.824zm8.931-11.177a.618.618 0 01.665-.564.62.62 0 01.564.668l-.875 10.306a.616.616 0 01-1.229-.104l.875-10.306zm-3.931.051a.617.617 0 111.231 0v10.307a.616.616 0 11-1.231 0V6.598zm-3.365-.615a.618.618 0 01.666.564l.873 10.306a.615.615 0 01-1.227.104L3.3 6.651a.62.62 0 01.563-.668zM10.165 1.206a.986.986 0 00.024-.207V.948A.95.95 0 009.24 0H7.106a.952.952 0 00-.949.948v.051c0 .073.011.141.025.207h3.983zM14.189 2.053H1.498C.628 2.066.004 2.586 0 3.392v.568h15.688v-.568c-.005-.806-.631-1.326-1.499-1.339z' />
          </g>
        </svg>
      ),
      linkText: 'Удалить из списка',
      path: '#',
    },
    {
      svg: (
        <svg
          className={style.info}
          xmlns='http://www.w3.org/2000/svg'
          width='19.813'
          height='16.663'
          x='0'
          y='0'
          enableBackground='new 0 0 19.813 16.663'
          version='1.1'
          viewBox='0 0 19.813 16.663'
          xmlSpace='preserve'
        >
          <path
            fill='#F60'
            fillRule='evenodd'
            d='M2.156 3.698H17.26c1.184 0 2.153-.835 2.153-1.851S18.444 0 17.26 0H2.156C.972 0 .003.831.003 1.847s.969 1.851 2.153 1.851zM19.572 14.068l-.861.607-2.634 1.856a.618.618 0 01-.338.131c-.169 0-.253-.107-.253-.309v-5.415c0-.202.084-.309.253-.309.084 0 .203.048.338.143l2.026 1.428.574.393.895.631c.321.238.321.618 0 .844zM14.325 11.804V15.5H2.162C.974 15.5 0 14.671 0 13.652c0-1.019.974-1.848 2.162-1.848h12.163zM17.26 5.902H2.156c-1.184 0-2.153.831-2.153 1.847s.969 1.847 2.153 1.847H17.26c1.184 0 2.153-.831 2.153-1.847s-.969-1.847-2.153-1.847z'
            clipRule='evenodd'
          />
        </svg>
      ),
      linkText: 'Информация о треке',
      path: routeMap.infoTrack,
    },
  ];

  let menuList = menu.map((el, i) => {
    return (
      <li className={style.list} key={i}>
        {el.svg}

        {el.svg.props.id == 'delete' ? (
          <div
            className={style.link}
            onClick={(e) => {
              e.preventDefault();
              props.deleteTrack();
            }}
          >
            {el.linkText}
          </div>
        ) : (
          <Link className={style.link} to={el.path}>
            {el.linkText}
          </Link>
        )}
      </li>
    );
  });

  return <>{menuList}</>;
}
