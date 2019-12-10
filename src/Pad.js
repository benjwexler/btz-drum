
import React, { useEffect, useState, useRef } from 'react';
import cx from 'classnames';
function usePrevious(value) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef();

  // Store current value in ref
  useEffect(() => {
    ref.current = value;
  }, [value]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}

const Pad = ({ id,
  className,
  style,
  isKeyMapOn,
  onClick,
  mappedKey,
  isKeyDown,
  isBeatRepeatOn,
}) => {

  return (
    <div class="padCol">
      <div
        style={style}
        id={id}
        class={cx(
          "pads",
          className,
          isKeyDown && !isBeatRepeatOn ? "backgroundBlack" : "",
        )}
        onClick={() => {
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
