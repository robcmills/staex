import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import './index.css'
import store from './redux/store'
import App from './components/app/'
import registerServiceWorker from './register-service-worker'
import registerWebWorker from './register-web-worker'

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('root')
)

registerServiceWorker()
registerWebWorker()
