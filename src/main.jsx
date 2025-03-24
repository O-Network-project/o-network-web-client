import { BrowserRouter } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { store } from './redux/store'
import { App } from './components/App/App'
import { muiONetworkTheme } from './styles/muiONetworkTheme'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'
import './styles/main.scss'
import { ScrollToTop } from './components/ScrollToTop'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ThemeProvider theme={muiONetworkTheme}>
            <Provider store={store}>
                <ScrollToTop />
                <CssBaseline />
                <App />
            </Provider>
        </ThemeProvider>
    </BrowserRouter>

)
