import React from 'react';
import LineRange from '~c/equalizer/';
import style from './equalizer.module.css';
import Header from '~p/equalizer/header';
import withStore from '~/hocs/withStore';
import Select from '~p/equalizer/selectSetting/';

class Equalizer extends React.Component {
  state = {
    text: this.props.stores.equalizer.getNameSetting,
  };

  onChange = (procent, id) => {
    this.props.stores.equalizer.replaySpecialOnChange();

    if (procent) {
      this.props.stores.equalizer.rangeOnChange(id, procent);
    }
  };

  componentDidMount() {
    if (this.props.stores.equalizer.nameSetting == 'special') {
      this.props.stores.equalizer.gainCopyParam();
    }
  }

  render() {
    const lineRange = this.props.stores.equalizer.equalizerSettings.map(
      (el, i) => {
        let gainValue = this.props.stores.equalizer.transformKhzInValueRange(
          this.props.stores.equalizer.gain[i]
        );

        return (
          <LineRange
            vertical={true}
            value={gainValue}
            hz={el.khz}
            key={i}
            id={`${i}`}
            onChange={this.onChange}
            compare={this.props.stores.equalizer.propsChange}
          />
        );
      }
    );

    return (
      <div className={style.equalizer}>
        <Header goBack={this.props.history.goBack} />
        <Select text={this.props.stores.equalizer.getNameSetting} />
        <div className={style.wrapEqualizer}>
          <div className={style.db}>
            <p className={style.dbText}>+10dB</p>
            <p className={style.dbText}>-10dB</p>
          </div>
          <div className={style.wrapRange}>{lineRange}</div>
        </div>
      </div>
    );
  }
}

export default withStore(Equalizer);
