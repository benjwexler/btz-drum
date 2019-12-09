import React, { useState, createContext, useMemo } from 'react'

export const Context = createContext()

const ContextProvider = (props) => {
  const [isKeyMapOn, setIsKeyMapOn] = useState(false)
  const [isBeatRepeatOn, setIsBeatRepeatOn] = useState(false);
  const [beatRepeatVal, setBeatRepeatVal] = useState(false);
  const [activeKeyMapPad, setActiveKeyMapPad] = useState(false);

  const value = useMemo(() => ({
    isKeyMapOn,
    setIsKeyMapOn,
    isBeatRepeatOn,
    setIsBeatRepeatOn,
    beatRepeatVal,
    setBeatRepeatVal,
    activeKeyMapPad,
    setActiveKeyMapPad

  }), [
    isKeyMapOn,
    isBeatRepeatOn,
    beatRepeatVal,
    activeKeyMapPad,
])

  return (
    <Context.Provider value={value}>
        {props.children}
    </Context.Provider>
  )
}

export default ContextProvider