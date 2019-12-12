
import React, { useEffect, useState } from 'react';
import cx from 'classnames';

const Pad = ({ id,
  className,
  style,
  isKeyMapOn,
  onClick,
  mappedKey,
  isKeyDown,
  onMouseDown,
  onMouseUp,
  isActiveKeyMapPad,
}) => {

  if(isActiveKeyMapPad && isKeyMapOn) {
    style.filter = 'saturate(3)';
  }

  if(isKeyDown) {
    style.filter = 'saturate(2)';
  }

  return (
    <div class="padCol">
      <div
        style={style}
        id={id}
        class={cx(
          "pads",
          className,
          isKeyDown ? "backgroundBlack" : "",
        )}
        onClick={onClick}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        <div class="hiddenButtonContainer">
          {
            isKeyMapOn
              ? <button class="hiddenButton">{mappedKey}</button>
              : null
          }
        </div>
      </div>
    </div>
  )
}

export default Pad;
