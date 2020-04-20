
import React, { useContext } from 'react';
import useMyContext from '../store/UseMyContext';

function Tempo() {
  const {
    setTempo,
    tempo
  } = useMyContext();

  const getTempoInRange = (val) => {
    if (val < 0 ) {
      return 0
    }
    if(val > 200) {
      return 200
    }
    return val;
  };

  return (
    <>
      <div id="tempoTop">Tempo</div>
      <div id="setTempo">
        <input onChange={(ev) => setTempo(getTempoInRange(ev.target.value))} id="set-tempo" type="number" value={tempo} />
      </div>
    </>

  );
}

export default Tempo;
