
import React, { useContext } from 'react';
import { Context } from './Context';

function Tempo({ bpm }) {
  const {
    setTempo,
    tempo
  } = useContext(Context)
  return (
    <>
      <div id="tempoTop">Tempo</div>
      <div id="setTempo">
        <input onChange={(ev) => setTempo(ev.target.value)} id="set-tempo" type="number" value={tempo} />
      </div>
    </>

  );
}

export default Tempo;
