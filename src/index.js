import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import registerServiceWorker from './registerServiceWorker'
import {applyPolyfills, defineCustomElements} from 'h8k-components/loader'


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />)
registerServiceWorker()
applyPolyfills().then(() => {
    defineCustomElements(window)
})
