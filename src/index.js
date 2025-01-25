import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Auth0Provider } from '@auth0/auth0-react';

const domain = 'dev-fkmaeh48op3q60sz.us.auth0.com';
const clientId = 'rQ7KdT1K6xZ3266jao51nXsCowFeyTe9';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
      >
      <App />
    </Auth0Provider>
  </React.StrictMode>
);
