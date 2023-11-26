import { createRoot } from 'react-dom/client'
import { App } from './components/App'

const root = document.querySelector('#root')

if (!root) {
    throw new Error('root element NOT found!')
}

const container = createRoot(root)

container.render(<App />)
