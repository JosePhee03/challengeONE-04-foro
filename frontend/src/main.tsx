import { render } from 'preact'
import { App } from './app.tsx'
import "./index.css"
import "./css/base/variables.css"
import "./css/base/fonts.css"

render(<App />, document.getElementById('app')!)
