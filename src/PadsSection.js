

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

const masterPadObj = {
  1: {
    soundfile: "./sounds/Kick.wav",
    keyCode: 1,
    isActive: false,
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

  const _activePads = {
    1: false,
    2: false,
    3: false,
    4: false,
    5: false,
    6: false,
    7: false,
    8: false,
    9: false,
    10: false,
    11: false,
    12: false,
    13: false,
    14: false,
    15: false,
    16: false,
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
    console.log("KEY DOWN CHANGE", isKeyDown)
    // if(!isKeyDown) {
    //   return;
    // }
    // if (!isBeatRepeatOn) {
    if (seq) {
      seq.stop();
      if (!isBeatRepeatOn || !isKeyDown) {
        return
      }
      console.log("WTF")
      seq = new Tone.Sequence(function (time, note) {
        // console.log("note", note);
        setIsActive(true)
        sampler.get(1).start()
        // console.log('beatRepeatVal', beatRepeatVal)
        // console.log('isKeyDown', isKeyDown)
        //straight quater notes
      }, ["C4", "E4", "G4", "A4"], `${beatRepeatVal}n`);
      // seq.start();
      seq.start();
    }

    // transport.stop()
    console.log('beatRepeatVal', beatRepeatVal)
    transport.start()

    // }

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

    // console.log('keyToPadObj', keyToPadObj[keyCode])
    // console.log('keyCode ', keyCode )
    const newActivePads = { ...activePads }
    if (!newActivePads[keyCode]) {
      newActivePads[keyCode] = true;
    } else {
      return
    }

    setActivePads(newActivePads)
    if (!isKeyMapOn) {
      // console.log('keyCode', keyToPadObj[keyCode])
      if (isBeatRepeatOn) {

        // sampler.get(1).setLoopPoints(0, 200);
        // sampler.get(1).loop = true;

        // sampler.get(1).start()
        if (seq) {
          seq.stop();
        }
        seq = new Tone.Sequence(function (time, note) {
          // console.log("note", note);
          setIsActive(true)
          sampler.get(keyToPadObj[keyCode]).start()
          console.log('beatRepeatVal', beatRepeatVal)
          //straight quater notes
        }, ["C4", "E4", "G4", "A4"], `${beatRepeatVal}n`);
        seq.start();

        //   loop = new Tone.Loop(function (time) {
        //   //triggered every eighth note. 
        //   // console.log(time);

        //   // sampler.get(1).setLoopPoints(0, 10);
        //   // sampler.get(1).loop = true;

        //   console.log('beatRepeatVal', beatRepeatVal)

        //   sampler.get(1).start()
        // }, `${beatRepeatVal}n`).start(0);
        // transport.start();
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
    console.log('newPadObj)', newPadObj)
    setPadObj(newPadObj)
  };

  const handleKeyUp = (ev) => {
    console.log("KEYUP")
    setIsKeyDown(false)
    const keyCode = String.fromCharCode(ev.keyCode);
    const newActivePads = { ...activePads }
    newActivePads[keyToPadObj[keyCode]] = false;
    // console.log('sampler.get(1)', sampler.get(1))
    if (seq) {
      seq.stop();
    }
    setIsKeyDown(false)

    // transport.stop();
    setActivePads(newActivePads)
  }

  useEvent('keydown', handleKeyDown, [beatRepeatVal]);
  useEvent('keyup', handleKeyUp);

  // console.log('RENDER BBEAT REPEQT VQL', beatRepeatVal)

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
              id={pad}
              className="padsRow1"
              style={getPadStyling(pad)}
              isKeyMapOn={isKeyMapOn}
              isActive={isActive}
              onClick={() => {
                setIsActive(true)
                if (isKeyMapOn) {
                  return setActiveKeyMapPad(pad)
                }

                // if(isBeatRepeatOn) {
                //   var loop = new Tone.Loop(function (time) {
                //   //triggered every eighth note. 
                //   // console.log(time);
                //   sampler.get(pad).start()
                // }, "4n").start(0);
                // transport.start();
                // return 
                // }
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
