import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { store } from './store.js'
// import AppProvider from './Context/AppContext.jsx'

createRoot(document.getElementById('root')).render(
    <AppProvider store={store}>
        <App />
    </AppProvider>
)
