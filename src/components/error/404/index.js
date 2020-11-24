import React from 'react';
import style from './404.module.css';

export default function(props) {
  return (
    <div className={style.inner}>
      <h1 className={style.title}>
        К сожалению, такая страница не существует. Ошибка 404
      </h1>
      <p className={style.home} onClick={() => props.back()}>
        Вернутся на главную
      </p>
    </div>
  );
}
