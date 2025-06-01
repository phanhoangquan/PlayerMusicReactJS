import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import GlobalStyle from '~/components/GlobalStyles/GlobalStyles.jsx';

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <GlobalStyle>
         <App />
      </GlobalStyle>
   </StrictMode>,
);
