import React from 'react'
import ReactDOM from 'react-dom/client'
// import App from './App.jsx'
import './index.css'
import { Suspense , lazy } from 'react'
import { Provider } from 'react-redux'
import store from './Redux/store.js'
const App =lazy(()=>import('./App.jsx'))

ReactDOM.createRoot(document.getElementById('root')).render(
  <Suspense fallback={<div>Loading...</div>}>
  <React.StrictMode>
    <Provider store={store}>
    <App />
    </Provider>
  </React.StrictMode>
  </Suspense>
)
