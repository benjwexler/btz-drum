

import React, { useContext, useEffect, useState } from 'react';
import cx from 'classnames';
import Pad from './Pad';
import { Context } from './Context';
import useEvent from 'use-add-event';
import invert from 'lodash.invert';
import Tone from "tone";

// function useEvent(event, handler, dependencies = [], passive=false) {
//   useEffect(() => {
//     // initiate the event handler
//     window.addEventListener(event, handler, passive);

//     // this will clean up the event every time the component is re-rendered
//     return function cleanup() {
//       window.removeEventListener(event, handler);
//     };
//   });
// }

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

let player;
let sampler;
let transport;
let loop;
let seq;

let count = 0

const _masterPadObj = {
  1: {
    soundfile: "./sounds/Kick.wav",
    keyCode: 1,
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
  const soundToPadObj = {
    1: "./sounds/Kick.wav",
    2: "./sounds/hat.wav",
    3: "./sounds/Kick.wav",
    4: "./sounds/Kick.wav",
    5: "./sounds/Kick.wav",
    6: "./sounds/Kick.wav",
    7: "./sounds/Kick.wav",
    8: "./sounds/Kick.wav",
    9: "./sounds/Kick.wav",
    10: "./sounds/Kick.wav",
    11: "./sounds/Kick.wav",
    12: "./sounds/Kick.wav",
    13: "./sounds/Kick.wav",
    14: "./sounds/Kick.wav",
    15: "./sounds/Kick.wav",
    16: "./sounds/Kick.wav",
  }

  const _padObj = {
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: "Q",
    6: "W",
    7: "E",
    8: "R",
    9: "A",
    10: "S",
    11: "D",
    12: "F",
    13: "Z",
    14: "X",
    15: "C",
    16: "V",
  }


  const [padObj, setPadObj] = useState(_padObj);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isKeyDown, setIsKeyDown] = useState(false)

  // const _activePads = {
  //   1: false,
  //   2: false,
  //   3: false,
  //   4: false,
  //   5: false,
  //   6: false,
  //   7: false,
  //   8: false,
  //   9: false,
  //   10: false,
  //   11: false,
  //   12: false,
  //   13: false,
  //   14: false,
  //   15: false,
  //   16: false,
  // }

  const _activePads = [];
for (let i = 0; i < 16; i++) {
  _activePads.push(false)
}

  const [activePads, setActivePads] = useState(_activePads);

  useEffect(() => {
    if (!isKeyMapOn) {
      setKeyToPadObj(invert(padObj));
    }

  }, [isKeyMapOn]);

  useEffect(() => {
    sampler = new Tone.Players(soundToPadObj, () => {
    }).toMaster();
    transport = Tone.Transport;

  }, []);

  useEffect(() => {
    if (!isBeatRepeatOn || !isKeyDown) {
      transport.stop()
    }

  }, [isBeatRepeatOn, isKeyDown]);

  useEffect(() => {
    if (seq && !isKeyDown) {
      seq.stop();
    }
  }, [isKeyDown])

  useEffect(() => {
    if (seq) {
      seq.stop();
      if (!isBeatRepeatOn || !isKeyDown) {
        return
      }
      seq = new Tone.Sequence(function (time, note) {
        setIsActive(true)
        sampler.get(1).start()
      }, ["C4", "E4", "G4", "A4"], `${beatRepeatVal}n`);
      seq.start();
    }

    transport.start()
  }, [beatRepeatVal, isKeyDown]);


  const getActiveKeyMapPad = () => {
    return activeKeyMapPad;
  }

  const handleKeyDown = (ev) => {
    setIsKeyDown(true)
    if (!isBeatRepeatOn) {
      setIsActive(true)
    }

    const keyCode = String.fromCharCode(ev.keyCode);
    const newActivePads = { ...activePads }
    if (!newActivePads[keyCode]) {
      newActivePads[keyCode] = true;
    } else {
      return
    }

    setActivePads(newActivePads)
    if (!isKeyMapOn) {
      if (isBeatRepeatOn) {
        if (seq) {
          seq.stop();
        }
        seq = new Tone.Sequence(function (time, note) {
          setIsActive(true)
          sampler.get(keyToPadObj[keyCode]).start()
          console.log('beatRepeatVal', beatRepeatVal)
        }, ["C4", "E4", "G4", "A4"], `${beatRepeatVal}n`);
        seq.start();
        return
      }
      sampler.get(1).start()
      return;
    }

    if (!activeKeyMapPad) {
      return;
    }

    const newPadObj = { ...padObj };
    newPadObj[activeKeyMapPad] = keyCode;
    setPadObj(newPadObj)
  };

  const handleKeyUp = (ev) => {
    setIsKeyDown(false)
    const keyCode = String.fromCharCode(ev.keyCode);
    const newActivePads = { ...activePads }
    newActivePads[keyToPadObj[keyCode]] = false;
    if (seq) {
      seq.stop();
    }
    setIsKeyDown(false)
    setActivePads(newActivePads)
  }

  // const handleKeyDown = (ev) => {
  //   // setIsKeyDown(true)
  //   // if (!isBeatRepeatOn) {
  //   //   setIsActive(true)
  //   // }

  //   // const keyCode = String.fromCharCode(ev.keyCode);
  //   // const newActivePads = { ...activePads }
  //   // if (!newActivePads[keyCode]) {
  //   //   newActivePads[keyCode] = true;
  //   // } else {
  //   //   return
  //   // }

  //   console.log
   
  // };

  useEvent('keydown', handleKeyDown, [beatRepeatVal]);
  useEvent('keyup', handleKeyUp);

  const [isActive, setIsActive] = useState(false)

  useEffect(() => {
    if (isActive) {
      setTimeout(setIsActive, 10, false)
    }
  }, [isActive]);

  return (
    <div className="d-flex h-100 flex-wrap">
      {
        padArr.map(pad => {
          return (
            <Pad
              key={pad}
              padInfo={masterPadObj[pad]}
              id={pad}
              className="padsRow1"
              style={getPadStyling(pad)}
              isKeyMapOn={isKeyMapOn}
              isActive={isActive}
              beatRepeatVal={beatRepeatVal}
              transport={transport}
              onClick={() => {
                setIsActive(true)
                if (isKeyMapOn) {
                  return setActiveKeyMapPad(pad)
                }
                sampler.get(pad).start()

              }
              }
              mappedKey={padObj[pad]}

            />
          )
        })
      }
    </div>
  )
}

export default PadsSection;
