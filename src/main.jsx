import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import GlobalStyle from '~/components/GlobalStyles/GlobalStyles.jsx';
import MusicProvider from './context/MusicContext.jsx';

createRoot(document.getElementById('root')).render(
   <StrictMode>
      <GlobalStyle>
         <MusicProvider>
            <App />
         </MusicProvider>
      </GlobalStyle>
   </StrictMode>,
);
