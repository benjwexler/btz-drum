
import React, {useEffect, useState, useContext} from 'react';
import cx from 'classnames';
import ToggleButton from './ToggleButton';
import { Context } from './Context';

const TopLeftControls = (props) => {
  const {
    isKeyMapOn,
    setIsKeyMapOn,
    isBeatRepeatOn,
    setIsBeatRepeatOn,
    beatRepeatVal,
    setBeatRepeatVal
  } = useContext(Context)

  useEffect(() => {
    if(!isBeatRepeatOn) {
      return setBeatRepeatVal(false)
    }

    return setBeatRepeatVal(8)
  }, [isBeatRepeatOn]);

  const toggleBeatRepeat = (val) => {
    if(beatRepeatVal === val) {
      return setBeatRepeatVal(false)
    }

    setBeatRepeatVal(val)
  }

  const getBeatRepeatStyling = (val) => {
    if(isBeatRepeatOn && val === beatRepeatVal) {
      return "beatRepeatDivisionButtonOn"
    }
  }
  return (
    <div class="topLeftDivider">
    <ToggleButton 
      id="keyAssign"
      line1="Key Map"
      line2={isKeyMapOn ? "On" : "Off"}
      onClick={() => setIsKeyMapOn(!isKeyMapOn)}
      className={isKeyMapOn ? "yellowButton" : ""}
    />
    <ToggleButton
      id="beatRepeat"
      line1="Beat Repeat"
      line2={isBeatRepeatOn ? "On" : "Off"}
      onClick={() => setIsBeatRepeatOn(!isBeatRepeatOn)}
      className={isBeatRepeatOn ? "yellowButton" : ""}
    />
    <ToggleButton
      id="quarterNote"
      line1="1/4"
      line2="Note"
      onClick={() => setBeatRepeatVal(4)}
      className={getBeatRepeatStyling(4)}
    />
    <ToggleButton
      id="eigthNote"
      line1="1/8"
      line2="Note"
      onClick={() => setBeatRepeatVal(8)}
      className={getBeatRepeatStyling(8)}
    />
    <ToggleButton
      id="sixteenthNote"
      line1="1/16"
      line2="Note"
      onClick={() => setBeatRepeatVal(16)}
      className={getBeatRepeatStyling(16)}
    />
    <ToggleButton
      id="thirtySecondNote"
      line1="1/32"
      line2="Note"
      onClick={() => setBeatRepeatVal(32)}
      className={getBeatRepeatStyling(32)}
    />
    </div>
  )
}

export default TopLeftControls;
