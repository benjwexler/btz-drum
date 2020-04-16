import React, { useState, createContext, useMemo } from 'react'

export const Context = createContext()

const ContextProvider = (props) => {
  const [isKeyMapOn, setIsKeyMapOn] = useState(false)
  const [isBeatRepeatOn, setIsBeatRepeatOn] = useState(false);
  const [beatRepeatVal, setBeatRepeatVal] = useState(false);
  const [activeKeyMapPad, setActiveKeyMapPad] = useState(false);
  const [kitName, setKitName] = useState("Just Blaze");
  const [tempo, setTempo] = useState(86);

  const value = useMemo(() => ({
    isKeyMapOn,
    setIsKeyMapOn,
    isBeatRepeatOn,
    setIsBeatRepeatOn,
    beatRepeatVal,
    setBeatRepeatVal,
    activeKeyMapPad,
    setActiveKeyMapPad,
    kitName,
    setKitName,
    tempo,
    setTempo
  }), [
    isKeyMapOn,
    isBeatRepeatOn,
    beatRepeatVal,
    activeKeyMapPad,
    kitName,
    tempo,
])

  return (
    <Context.Provider value={value}>
        {props.children}
    </Context.Provider>
  )
}

export default ContextProvider