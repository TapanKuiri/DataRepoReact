import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { BrowserRouter } from 'react-router-dom';
import FileContextProvider, { FileContext } from './context/FileContext.jsx';
import {Provider} from 'react-redux'

createRoot(document.getElementById('root')).render(
   <BrowserRouter>
      <FileContextProvider>
        <App />
      </FileContextProvider>
    </BrowserRouter>
)
