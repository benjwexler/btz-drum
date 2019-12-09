
import React, {useEffect, useState} from 'react';
import cx from 'classnames';

const Pad = ({id,
  className,
  style,
  isKeyMapOn,
  onClick,
  onKeyDown,
  mappedKey,
  isActive,
  setIsActive
}) => {
  

  return (
    <div class="padCol">
      <div
        style={style}
        id={id}
        class={cx(
          "pads",
          className,
          isActive && id===1 ? "backgroundBlack" : "",
          )}
          // onKeyDown={onKeyDown}
        onClick={() => {
          // setIsActive(true);
          onClick();
        }
        }
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
