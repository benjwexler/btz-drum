import React from 'react';
import '../styles/App.css';
import KitchenSink from './KitchenSink';
import ContextProvider from '../store/Context';

function DrumPage() {
  return (
    <div className="App">
    <ContextProvider>
      <KitchenSink />
    </ContextProvider>
    </div>
    
  );
}

export default DrumPage;
