import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
// @ts-ignore: allow importing CSS as a side effect in this entry file
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
