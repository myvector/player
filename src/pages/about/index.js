import React from 'react';
import style from './about.module.css';
import HeaderCom from '~c/playerControl/header';

class About extends React.Component {
  render() {
    return (
      <div className={style.about}>
        <HeaderCom goBack={this.props.history.goBack}></HeaderCom>
        <div className={style.wrapInfo}>
          <h2 className={style.title}>О приложении</h2>
          <img src={'../../../img/logo.svg'} className={style.logo} />
          <p className={style.text}>Version: 1.0.0</p>
          <p className={style.text}>MyVector team</p>
          <h3 className={style.subTitle}>Связатся с разработчиком</h3>
          <span className={style.mail}>myvectorforward@gmail.com</span>
        </div>
      </div>
    );
  }
}

export default About;
