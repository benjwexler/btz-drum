
import React, { useEffect, useState } from 'react';
import cx from 'classnames';

const Pad = ({ id,
  className,
  style,
  isKeyMapOn,
  onClick,
  mappedKey,
  isKeyDown,
  isBeatRepeatOn,
  isInitialized,
  onMouseDown,
  onMouseUp,
}) => {

  const [isInitialBeatRepeatHit, setInitialBeatRepeatHit] = useState(true)

  useEffect(() => {

    if(!isBeatRepeatOn && !isKeyDown) {
      setInitialBeatRepeatHit(false)
    }


    if(!isInitialized && isKeyDown && isBeatRepeatOn) {
      setInitialBeatRepeatHit(true);
    }
    
  }, [isInitialized, isKeyDown, isBeatRepeatOn]);


  useEffect(() => {

    if(isInitialBeatRepeatHit) {
      setTimeout(setInitialBeatRepeatHit, 20, false)
    }

    
  }, [isInitialBeatRepeatHit]);


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
        onClick={() => {
          onClick();
        }
        }
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
