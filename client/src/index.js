import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CharacterProvidor from './components/CharacterContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CharacterProvidor>
      <App />
    </CharacterProvidor>
  </React.StrictMode>
);


