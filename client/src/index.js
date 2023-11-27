import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import reportWebVitals from './reportWebVitals';
import { persistor, store } from './redux/store.js';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'primereact/resources/themes/soho-dark/theme.css'
// import ('primereact/resources/themes/soho-light/theme.css'); 
// export function Theme({ dark }) {
//   console.log(dark)
//   if (dark) 
//     return import ('primereact/resources/themes/soho-dark/theme.css'); 
//   return import ('primereact/resources/themes/soho-light/theme.css'); 
// }
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={null}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
