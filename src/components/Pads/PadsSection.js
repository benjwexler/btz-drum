
import React, { useEffect, useState } from 'react';
import Pad from './Pad';
import useEvent from 'use-add-event';
import Tone from "tone";
import cloneDeep from 'lodash.clonedeep';
import useMyContext from '../../store/UseMyContext';

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
    keyCode: 1,
  },
  2: {
    keyCode: 2,
  },
  3: {
    keyCode: 3,
  },
  4: {
    keyCode: 4,
  },
  5: {
    keyCode: "Q",
  },
  6: {
    keyCode: "W",
  },
  7: {
    keyCode: "E",
  },
  8: {
    keyCode: "R",
  },
  9: {
    keyCode: "A",
  },
  10: {
    keyCode: "S",
  },
  11: {
    keyCode: "D",
  },
  12: {
    keyCode: "F",
  },
  13: {
    keyCode: "Z",
  },
  14: {
    keyCode: "X",
  },
  15: {
    keyCode: "C",
  },
  16: {
    keyCode: "V",
  },
}

const PadsSection = () => {
  const {
    isKeyMapOn,
    isBeatRepeatOn,
    beatRepeatVal,
    tempo,
    activeKitNum,
    activeKit,
  } = useMyContext();

  const [activeKeyMapPad, setActiveKeyMapPad] = useState(false);
  const [keyToPadObj, setKeyToPadObj] = useState({});
  const [masterPadObj, setMasterPadObj] = useState(_masterPadObj);
  const [toggle, setToggle] = useState(false);

  useEffect(() => {
    const updatedMasterPadObj = cloneDeep(masterPadObj)

    for (let i = 1; i < 17; i++) {
      updatedMasterPadObj[i].soundfile = activeKit.sounds[i]
    }
    setMasterPadObj(updatedMasterPadObj)
    const keys = Object.keys(updatedMasterPadObj);
    keys.forEach((key, i) => {
      soundfilesObj[i + 1] = updatedMasterPadObj[key].soundfile
    })
    sampler = new Tone.Players(soundfilesObj, () => {
    }).toMaster();
    transport = Tone.Transport;
  }, [activeKitNum]);

  useEffect(() => {
    Tone.Transport.bpm.value = tempo;
  }, [tempo]);

  const createSequence = (pad) => {
    try {
      masterPadObj[pad].sequence = new Tone.Sequence(function (time, shouldPlay) {
        if (!shouldPlay) {
          setMasterPadObj(masterPadObj);
          setToggle(!toggle)
          return;
        }
        if(sampler.get(pad).loaded) {
          sampler.get(pad).start()
        }
        
        setMasterPadObj(masterPadObj);
      }, [true, false], `${beatRepeatVal * 2}n`);
      masterPadObj[pad].sequence.start();
      transport.start()
    } catch (err) {
      console.log('err', err)
    }
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
    if (activeElement === "set-tempo") {
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
        if (!isBeatRepeatOn && !masterPadObj[pad].isInitialized && sampler.get(pad).loaded) {
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
    try {
    const pad = ev.currentTarget.id;
    sampler.get(pad).start();
    masterPadObj[pad].isKeyDown = true;
    setMasterPadObj(masterPadObj);
    setToggle(!toggle)
    } catch (err) {
      
    }
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
