
import React, { useContext, useEffect, useState } from 'react';
import Pad from './Pad';
import { Context } from '../Context';
import useEvent from 'use-add-event';
import Tone from "tone";

const getPadStyling = (padNum) => {
  switch (true) {
    case padNum < 5:
      return {
        borderColor: 'purple',
      }
    case padNum < 9:
      return {
        borderColor: 'green',
      }
    case padNum < 13:
      return {
        borderColor: 'rgb(12, 102, 199)',
      }
    case padNum < 17:
      return {
        borderColor: 'rgba(201, 48, 48, 0.611)',
      }
  }
}

const padArr = [];
for (let i = 0; i < 16; i++) {
  padArr.push(i + 1)
}

let sampler;
let transport;

const soundfilesObj = {};

const _masterPadObj = {
  1: {
    soundfile: "./sounds/Kick.wav",
    keyCode: 1,
  },
  2: {
    soundfile: "./sounds/hat.wav",
    keyCode: 2,
  },
  3: {
    soundfile: "./sounds/snare2.wav",
    keyCode: 3,
  },
  4: {
    soundfile: "./sounds/Kick.wav",
    keyCode: 4,
  },
  5: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "Q",
  },
  6: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "W",
  },
  7: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "E",
  },
  8: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "R",
  },
  9: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "A",
  },
  10: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "S",
  },
  11: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "D",
  },
  12: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "F",
  },
  13: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "Z",
  },
  14: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "X",
  },
  15: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "C",
  },
  16: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "V",
  },
}

const PadsSection = () => {
  const {
    isKeyMapOn,
    isBeatRepeatOn,
    beatRepeatVal,
    tempo,
  } = useContext(Context);

  const [activeKeyMapPad, setActiveKeyMapPad] = useState(false);
  const [keyToPadObj, setKeyToPadObj] = useState({});
  const [masterPadObj, setMasterPadObj] = useState(_masterPadObj);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {

    const keys = Object.keys(masterPadObj);
    keys.forEach((key, i) => {
      soundfilesObj[i + 1] = masterPadObj[key].soundfile
    })
    sampler = new Tone.Players(soundfilesObj, () => {
    }).toMaster();
    transport = Tone.Transport;
  }, []);

  useEffect(() => {
    Tone.Transport.bpm.value = tempo;
  }, [tempo]);




  const createSequence = (pad) => {
    masterPadObj[pad].sequence = new Tone.Sequence(function (time, shouldPlay) {
      if (!shouldPlay) {
        setMasterPadObj(masterPadObj);
        setToggle(!toggle)
        return;
      }
      sampler.get(pad).start()
      setMasterPadObj(masterPadObj);
    }, [true, false], `${beatRepeatVal * 2}n`);
    masterPadObj[pad].sequence.start();
    transport.start()
  }


  const stopSequence = (pad) => {
    if (masterPadObj[pad].sequence) {
      masterPadObj[pad].sequence.stop()
    }
  }


  const reinitizalieSequenceWithNewLoop = (pad) => {
    if (masterPadObj[pad].sequence) {
      masterPadObj[pad].sequence.stop();
      if (!isBeatRepeatOn || !masterPadObj[pad].isKeyDown) {
        return
      }
      createSequence(pad)
    }
  }


  useEffect(() => {
    const keys = Object.keys(masterPadObj);
    keys.forEach(pad => {
      reinitizalieSequenceWithNewLoop(pad)
    })
  }, [beatRepeatVal]);


  const handleKeyDown = (ev) => {
    const activeElement = document.activeElement.id;
    // User is trying to change the tempo
    if(activeElement === "set-tempo") {
      return;
    }
    const keyCode = String.fromCharCode(ev.keyCode);
    const pads = keyToPadObj[keyCode];
    if (isKeyMapOn) {
      if (masterPadObj[activeKeyMapPad]) {
        masterPadObj[activeKeyMapPad].keyCode = keyCode;
        setMasterPadObj(masterPadObj);
      }
      return setToggle(!toggle)
    }

    if (pads) {
      pads.forEach(pad => {
        masterPadObj[pad].isKeyDown = true;
        if (!isBeatRepeatOn && !masterPadObj[pad].isInitialized) {
          sampler.get(pad).start()
        } else {
          if (!masterPadObj[pad].isInitialized) {
            createSequence(pad)
          }
        }
        masterPadObj[pad].isInitialized = true;

      })
      setMasterPadObj(masterPadObj);
      setToggle(!toggle)
    }
  };

  const handleMouseDown = (ev) => {
    const pad = ev.currentTarget.id;
    sampler.get(pad).start();
    masterPadObj[pad].isKeyDown = true;
    setMasterPadObj(masterPadObj);
    setToggle(!toggle)
  };

  const handleMouseUp = (ev) => {
    const pad = ev.currentTarget.id;
    masterPadObj[pad].isKeyDown = false;
    setMasterPadObj(masterPadObj);
    setToggle(!toggle)
  };



  const handleKeyUp = (ev, ) => {
    const keyCode = String.fromCharCode(ev.keyCode);
    const pads = keyToPadObj[keyCode];
    if (pads) {
      pads.forEach(pad => {
        masterPadObj[pad].isKeyDown = false;
        masterPadObj[pad].isInitialized = false;
        stopSequence(pad)
      })
      setMasterPadObj(masterPadObj);
      setToggle(!toggle)
    }
  }


  const createKeyCodeObj = () => {
    const keysToObj = {}
    const keys = Object.keys(masterPadObj);
    keys.forEach((key, i) => {
      const keyCode = masterPadObj[i + 1].keyCode
      if (!keysToObj[keyCode] || !keysToObj[keyCode].length) {
        keysToObj[keyCode] = [i + 1]
      } else {
        keysToObj[keyCode].push(i + 1);
      }
    })
    setKeyToPadObj(keysToObj)
  }


  useEffect(() => {
    if (!isKeyMapOn) {
      createKeyCodeObj();
    }

  }, [isKeyMapOn]);


  useEvent('keydown', handleKeyDown);
  useEvent('keyup', handleKeyUp);

  const handlePadClick = (_pad, _isKeyMapOn) => {
    if (_isKeyMapOn) {
      return setActiveKeyMapPad(_pad)
    }
  }

  return (
    <div className="d-flex h-100 flex-wrap">
      {
        padArr.map(pad => {
          return (
            <Pad
              key={pad}
              mappedKey={masterPadObj[pad].keyCode}
              id={pad}
              className="padsRow1"
              style={getPadStyling(pad)}
              isKeyMapOn={isKeyMapOn}
              isInitialized={masterPadObj[pad].isInitialized}
              isBeatRepeatOn={isBeatRepeatOn}
              isActiveKeyMapPad={activeKeyMapPad === pad}
              isKeyDown={masterPadObj[pad].isKeyDown}
              onClick={() => handlePadClick(pad, isKeyMapOn)}
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
            />
          )
        })
      }
    </div>
  )
}

export default PadsSection;
