import ReactDOM from 'react-dom/client';

import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter } from 'react-router-dom';

import App from './App';
import { AuthProvider } from './contexts/Auth/AuthProvider';

import 'react-toastify/dist/ReactToastify.css';
import './index.css';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthProvider>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <BrowserRouter>
        <App />
        <ToastContainer position="top-right"
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored" />
      </BrowserRouter>
    </LocalizationProvider>
  </AuthProvider>
);

