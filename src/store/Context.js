import React, { useState, createContext, useMemo } from 'react'
import kits from '../store/kits';

export const Context = createContext()

const ContextProvider = (props) => {
  const [isKeyMapOn, setIsKeyMapOn] = useState(false)
  const [isBeatRepeatOn, setIsBeatRepeatOn] = useState(false);
  const [beatRepeatVal, setBeatRepeatVal] = useState(false);
  const [activeKeyMapPad, setActiveKeyMapPad] = useState(false);
  const [activeKitNum, setActiveKitNum] = useState(2)
  const [tempo, setTempo] = useState(86);

  const getActiveKit = () => {
    return kits[activeKitNum]
  }

  const value = useMemo(() => ({
    isKeyMapOn,
    setIsKeyMapOn,
    isBeatRepeatOn,
    setIsBeatRepeatOn,
    beatRepeatVal,
    setBeatRepeatVal,
    activeKeyMapPad,
    setActiveKeyMapPad,
    tempo,
    setTempo,
    activeKitNum,
    setActiveKitNum,
    kits,
    activeKit: getActiveKit(),
  }), [
    isKeyMapOn,
    isBeatRepeatOn,
    beatRepeatVal,
    activeKeyMapPad,
    tempo,
    activeKitNum,
])

  return (
    <Context.Provider value={value}>
        {props.children}
    </Context.Provider>
  )
}

export default ContextProvider