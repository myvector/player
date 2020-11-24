import React from 'react';
import Line from './view/';

export default class RangeLine extends React.PureComponent {
  constructor(props) {
    super(props);
    this.positionOutMouse = 0;
    this.lineComponent = React.createRef();
    this.key = {};
    this.indent = this.props.indent || '8px';

    this.id = this.props.id || false;

    if (this.props.vertical) {
      this.key.param = 'height';
      this.key.axis = 'Y';
      this.key.offset = 'offsetHeight';
      this.key.mirror = 100;
      this.clientRect = 'top';
    } else {
      this.key.param = 'width';
      this.key.axis = 'X';
      this.key.offset = 'offsetWidth';
      this.key.mirror = 0;
      this.clientRect = 'left';
    }

    this.setEventState;
    this.eventState;

    this.propsEventObject = {
      eventMouseDown: () => false,
      eventMouseUp: props.eventObj.eventMouseUp
        ? props.eventObj.eventMouseUp
        : () => {
            throw new Error(
              'function for outputting mouseUp data not added to properties'
            );
          },
      eventMove: props.eventObj.eventMove
        ? props.eventObj.eventMove
        : () => false,
      eventTouchStart: () => false,
      eventTouchEnd: props.eventObj.eventTouchEnd
        ? props.eventObj.eventTouchEnd
        : () => false,
    };

    if (this.props.event) {
      this.eventState = 'option';
      this.setEventState = 'optionState';
      this.optionState = (obj) => {
        this.eventState = {
          ...this.eventState,
          ...obj,
        };
      };
      this.propsEventObject = { ...this.propsEventObject, ...props.eventObj };
    } else {
      this.eventState = 'state';
      this.setEventState = 'setState';
    }

    this[this.eventState] = {
      down: false,
      line: this.props.value || 0,
      move: false,
      param: 0, //  width|| height
      offset: 0,
      touchMove: false,
    };

    this.setEventState = this[this.setEventState];
    this.eventState = this[this.eventState];
  }

  mouseDown = (e) => {
    let procent = this.checkOnChangeCoordinateOutMouse(e);

    this.setEventState({
      down: true,
      param: e.target[this.key.offset],
      line: procent,
    });

    this.handlerAddEvent('mousemove', this.mouseMove);
    this.handlerAddEvent('mouseup', this.mouseUp);
    this.lineComponent.current.addEventListener('mouseout', this.mouseOut);

    this.positionOutMouse = this.lineComponent.current.getBoundingClientRect()[
      this.clientRect
    ];
    this.propsEventObject.eventMouseDown(procent, this.id);
  };

  get getEventState() {
    if (!this.props.event) {
      return this.state;
    } else {
      return this.eventState;
    }
  }

  mouseMove = (e) => {
    if (this.getEventState.down) {
      this.move(e);
    }
  };

  mouseUp = (e) => {
    this.set = setTimeout(() => {
      this.setEventState({
        move: false,
        down: false,
        touchMove: false,
      });
    }, 200);

    this.handlerRemoveEvent('mousemove', this.mouseMove);
    this.lineComponent.current.removeEventListener('mouseout', this.mouseOut);
    this.handlerRemoveEvent('mouseup', this.mouseUp);

    this.propsEventObject.eventMouseUp(this.getEventState.line, this.id);
  };

  mouseOut = (e) => {
    this.handlerRemoveEvent('mousemove', this.mouseMove);
    document.addEventListener('mousemove', this.outMove);
    document.addEventListener('mouseup', this.outUp);
    this.cancelEvent();
  };

  outMove = (e) => {
    let position = e['client' + this.key.axis] - this.positionOutMouse;
    this.transformCoordinate(position);
  };

  outUp = () => {
    this.checkOnChangeCoordinateOutMouse({
      offset: this.getEventState.offset,
      [this.key.param]: this.getEventState.param,
    });
    document.removeEventListener('mousemove', this.outMove);
    document.removeEventListener('mouseup', this.outUp);
    this.cancelEvent();
  };

  touchStart = (e) => {
    let procent = this.checkOnChangeCoordinateOutMouse(e);

    this.setEventState({
      param: e.target[this.key.offset],
      offset: procent,
    });
    this.handlerAddEvent('touchmove', this.touchMove);
    this.handlerAddEvent('touchend', this.touchEnd);

    this.propsEventObject.eventTouchStart(procent, this.id);
  };

  touchMove = (e) => {
    this.setEventState({ touchMove: true });
    this.move(e);
  };

  touchEnd = (e) => {
    this.handlerRemoveEvent('touchmove', this.touchMove);
    this.handlerRemoveEvent('touchend', this.touchEnd);
    if (this.getEventState.touchMove) {
      this.setEventState({
        move: false,
        down: false,
        touchMove: false,
      });
      this.propsEventObject.eventTouchEnd(this.getEventState.line, this.id);
    } else {
      this.setEventState({
        down: false,
        move: false,
        line: this.getEventState.offset,
      });
      this.propsEventObject.eventTouchEnd(false, this.id);
    }
  };

  move = (e) => {
    let validCoordinate = this.validPointCoordinate(e).toFixed(2);
    this.transformCoordinate(validCoordinate);
  };

  transformCoordinate = (coordinate) => {
    let procent = this.visualLineProcenValue(
      this.getEventState.param,
      coordinate
    );
    this.setEventState({
      line: procent,
      move: true,
      offset: coordinate,
    });

    this.propsEventObject.eventMove(procent, this.id);
  };

  handlerAddEvent = (event, funct) => {
    this.lineComponent.current.ownerDocument.addEventListener(event, funct);
  };

  handlerRemoveEvent = (event, funct) => {
    this.lineComponent.current.ownerDocument.removeEventListener(event, funct);
  };

  checkOnChangeCoordinateOutMouse(point) {
    if (point.hasOwnProperty(this.key.param)) {
      return this.visualLineProcenValue(point[this.key.param], point.offset);
    } else {
      let coordinate = this.validPointCoordinate(point);
      return this.visualLineProcenValue(
        point.target[this.key.offset],
        coordinate
      );
    }
  }

  visualLineProcenValue(param, point) {
    let validPoint = this.minMaxCoordinate(point, param);
    let clickPoint = Math.abs(this.key.mirror - (validPoint * 100) / param);
    return clickPoint.toFixed(2);
  }

  cancelEvent = () => {
    this.setEventState({
      move: false,
      down: false,
    });
  };

  minMaxCoordinate = (val, max) => {
    return Math.min(Math.max(val, 0), max);
  };

  validPointCoordinate(e) {
    if (
      'touchmove' == e.type ||
      'touchstart' == e.type ||
      ('touchend' == e.type && typeof e.changedTouches[0] !== 'undefined')
    ) {
      let dataPoint = e.changedTouches[0].target.getBoundingClientRect();
      return this.checkAxisResultReturn(dataPoint, e.changedTouches[0]);
    } else {
      return e.nativeEvent == undefined
        ? this.nativeEvent(e)
        : this.nativeEvent(e.nativeEvent);
    }
  }

  checkAxisResultReturn = (dataPoint, even) =>
    this.props.vertical
      ? dataPoint.height - (dataPoint.bottom - even.clientY)
      : even.clientX - dataPoint.left;

  get nativeEvent() {
    return (event) =>
      event['offset' + this.key.axis] == undefined
        ? event['layer' + this.axis]
        : event['offset' + this.key.axis];
  }

  componentWillUnmount() {
    clearTimeout(this.set);
    this.handlerRemoveEvent('mousemove', this.mouseMove);
    this.lineComponent.current.removeEventListener('mouseout', this.mouseOut);
    this.handlerRemoveEvent('mouseup', this.mouseUp);
    document.removeEventListener('mousemove', this.outMove);
    document.removeEventListener('mouseup', this.outUp);
    this.handlerRemoveEvent('touchmove', this.touchMove);
    this.handlerRemoveEvent('touchend', this.touchEnd);
  }

  render() {
    let line;
    if (this.props.move || this.getEventState.move) {
      line = { [this.key.param]: this.getEventState.line + '%' };
    } else {
      if (this.getEventState.down) {
        let param = this.getEventState.line;
        line = {
          [this.key.param]: param + '%',
          transition: 'all 0.2s ease',
        };
      } else {
        let param = this.props.changedValue || this.getEventState.line;
        line = {
          [this.key.param]: param + '%',
          transition: 'all 0.2s ease',
        };
      }
    }

    return (
      <Line
        ref={this.lineComponent}
        vertical={this.props.vertical}
        line={line}
        indent={this.indent}
        param={this.key.param}
        mouseDown={this.mouseDown}
        touchStart={this.touchStart}
      />
    );
  }
}
