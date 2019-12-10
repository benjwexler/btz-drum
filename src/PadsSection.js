

import React, { useContext, useEffect, useState, useRef } from 'react';
import cx from 'classnames';
import Pad from './Pad';
import { Context } from './Context';
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
    isActive: false,
    isKeyDown: false,
  },
  2: {
    soundfile: "./sounds/hat.wav",
    keyCode: 2,
    isActive: false,
    isKeyDown: false,
  },
  3: {
    soundfile: "./sounds/Kick.wav",
    keyCode: 3,
    isActive: false,
    isKeyDown: false,
  },
  4: {
    soundfile: "./sounds/Kick.wav",
    keyCode: 4,
    isActive: false,
    isKeyDown: false,
  },
  5: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "Q",
    isActive: false,
    isKeyDown: false,
  },
  6: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "W",
    isActive: false,
    isKeyDown: false,
  },
  7: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "E",
    isActive: false,
    isKeyDown: false,
  },
  8: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "R",
    isActive: false,
    isKeyDown: false,
  },
  9: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "A",
    isActive: false,
    isKeyDown: false,
  },
  10: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "S",
    isActive: false,
    isKeyDown: false,
  },
  11: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "D",
    isActive: false,
    isKeyDown: false,
  },
  12: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "F",
    isActive: false,
    isKeyDown: false,
  },
  13: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "Z",
    isActive: false,
    isKeyDown: false,
  },
  14: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "X",
    isActive: false,
    isKeyDown: false,
  },
  15: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "C",
    isActive: false,
    isKeyDown: false,
  },
  16: {
    soundfile: "./sounds/Kick.wav",
    keyCode: "V",
    isActive: false,
    isKeyDown: false,
  },
}


const PadsSection = () => {
  const {
    isKeyMapOn,
    setIsKeyMapOn,
    isBeatRepeatOn,
    setIsBeatRepeatOn,
    beatRepeatVal,
    setBeatRepeatVal
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

  const createSequence = (pad) => {
    masterPadObj[pad].sequence = new Tone.Sequence(function (time, note) {
      sampler.get(pad).start()
      console.log('beatRepeatVal', beatRepeatVal)
    }, ["C4", "E4", "G4", "A4"], `${beatRepeatVal}n`);
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
  }, [beatRepeatVal ]);

  const handleKeyDown = (ev) => {
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
          masterPadObj[pad].isActive = true;
          if(!masterPadObj[pad].beatRepeatCount) {
            masterPadObj[pad].beatRepeatCount = 1
          } else {
            masterPadObj[pad].beatRepeatCount+=1
          }
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

  const handleKeyUp = (ev) => {
    const keyCode = String.fromCharCode(ev.keyCode);
    const pads = keyToPadObj[keyCode];
    if (pads) {
      pads.forEach(pad => {
        masterPadObj[pad].beatRepeatCount = 0;
        masterPadObj[pad].isActive = false;
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

  const [isActive, setIsActive] = useState(false)

  const checkIfPadActive = (pad) => {
    return masterPadObj[pad].isActive
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
              isActive={masterPadObj[pad].isActive}
              isBeatRepeatOn={isBeatRepeatOn}
              beatRepeatCount={masterPadObj[pad].beatRepeatCount}
              activeKeyMapPad={activeKeyMapPad}
              isKeyDown={masterPadObj[pad].isKeyDown}
              transport={transport}
              onClick={() => {
                if (isKeyMapOn) {
                  return setActiveKeyMapPad(pad)
                }
              }
              }
            />
          )
        })
      }
    </div>
  )
}

export default PadsSection;
