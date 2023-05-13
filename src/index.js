import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';
// import 'bootstrap/dist/css/bootstrap.min.css';

import { BrowserRouter } from 'react-router-dom';
import ProviderLayer from './ProviderLayer';
import { FirebaseAppProvider } from 'reactfire';

// const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
// const FIREBASE_AUTH_DOMAIN = process.env.REACT_APP_FIREBASE_AUTH_DOMAIN;
// const FIREBASE_PROJECT_ID = process.env.REACT_APP_FIREBASE_PROJECT_ID;
// const FIREBASE_STORAGE_BUCKET = process.env.REACT_APP_FIREBASE_STORAGE_BUCKET;
// const FIREBASE_MESSAGE_ID = process.env.REACT_APP_FIREBASE_MESSAGE_ID;
// const FIREBASE_APP_ID = process.env.REACT_APP_FIREBASE_APP_ID;
// const FIREBASE_DB_URL = process.env.REACT_APP_FIREBASE_DB_URL;


// const firebaseConfig = {
//   apiKey: FIREBASE_API_KEY,
//   authDomain: FIREBASE_AUTH_DOMAIN,
//   projectId: FIREBASE_PROJECT_ID,
//   storageBucket: FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: FIREBASE_MESSAGE_ID,
//   appId: FIREBASE_APP_ID,
//   databaseURL: FIREBASE_DB_URL,
// };

const firebaseConfig = {
  apiKey: "AIzaSyAgcGzYAV4u1kevFikauBHZ-lI0DEO7H6Q",
  authDomain: "final-d2d9d.firebaseapp.com",
  databaseURL: "https://final-d2d9d-default-rtdb.firebaseio.com",
  projectId: "final-d2d9d",
  storageBucket: "final-d2d9d.appspot.com",
  messagingSenderId: "198526787528",
  appId: "1:198526787528:web:afc1143db43aa3b632eafd"
};



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <FirebaseAppProvider  firebaseConfig={firebaseConfig}>
        <ProviderLayer />
      </FirebaseAppProvider>
    </BrowserRouter>
  </React.StrictMode>
);
