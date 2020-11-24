import React from 'react';
import stylevertical from './lineVertical.module.css';
import style from './line.module.css';

const rangeLine = React.forwardRef((props, ref) => {
  let takeStyle = props.vertical ? stylevertical : style;
  return (
    <div className={takeStyle.caseLine}>
      <div className={takeStyle.innerLine}>
        <span
          ref={ref}
          style={{ [props.param]: `calc(100% + ` + props.indent + `)` }}
          className={takeStyle.underLine + ' underline'}
          onMouseDown={e => props.mouseDown(e)}
          onTouchStart={e => props.touchStart(e)}
        ></span>
        <div className={takeStyle.overLine} style={props.line}></div>
      </div>
    </div>
  );
});

export default rangeLine;
