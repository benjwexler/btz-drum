import React from 'react';
import './App.css';
import KitchenSink from './KitchenSink';
import ContextProvider from './Context';

function App() {
  return (
    <div className="App">
    <ContextProvider>
    
      <KitchenSink />
      
    </ContextProvider>
    </div>
    
  );
}

export default App;
