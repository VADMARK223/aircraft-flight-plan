import React from 'react'
import ReactDOM from 'react-dom/client'
import './style/index.scss'
import App from './App'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// import {attachLogger} from 'effector-logger'
// attachLogger()

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)
root.render(
    // <React.StrictMode>
    <>
        <App/>
        <ToastContainer position={'bottom-right'}/>
    </>
    // </React.StrictMode>
)
