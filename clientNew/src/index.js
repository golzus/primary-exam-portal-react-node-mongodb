

import React from 'react';
import './index.css';
import ReactDOM from 'react-dom/client';
 import App from './App';
  import {Provider} from "react-redux"
import store from './app/store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <React.StrictMode>
   <Provider store={store}> 
     <App />
    <h1>ggg</h1>
     </Provider>
  </React.StrictMode>
);

