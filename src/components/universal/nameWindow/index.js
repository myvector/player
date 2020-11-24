import React from 'react';
import style from './nameWindow.module.css';

export default class NameModal extends React.Component {
  state = {
    text: this.props.text,
    change: this.props.text,
  };

  changeInput = (event) => {
    this.setState({ text: event.target.value });
  };

  ok = () => {
    this.props.success(this.state.text);
  };

  cancel = () => {
    this.props.cancel();
  };

  render() {
    return (
      <>
        <h3 className={style.title}>{this.props.title}</h3>
        <p className={style.subTitle}>{this.props.subTitle}</p>
        <input
          className={style.input}
          autoFocus={true}
          type={'text'}
          value={this.state.text}
          onChange={(e) => this.changeInput(e)}
        ></input>
        <div className={style.buttonInner}>
          <button className={style.button} onClick={this.cancel}>
            Отмена
          </button>
          <button className={style.button} onClick={this.ok}>
            Ок
          </button>
        </div>
      </>
    );
  }
}
