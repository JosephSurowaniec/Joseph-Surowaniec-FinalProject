import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import CharacterProvidor from './components/CharacterContext';
import { Auth0Provider } from '@auth0/auth0-react';
import UserProvidor from './components/UserContext';


const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
const api_key = "777258621342766";
const cloud_name = "dfigamsk5";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
    <UserProvidor>
    <CharacterProvidor>
      <App />
    </CharacterProvidor>   
    </UserProvidor>
     
    </Auth0Provider>
    
  </React.StrictMode>
);


