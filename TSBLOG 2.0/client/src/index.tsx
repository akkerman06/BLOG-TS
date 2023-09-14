import {StrictMode} from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.scss';
import App from './App';
import {Provider} from 'react-redux'

import {BrowserRouter, Link} from 'react-router-dom'
import {store} from "./redux/store";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <StrictMode>

    <Provider store={store}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </Provider>
  // </StrictMode>
);

