import './style.css'

import Experience from './js/Experience'

import { debug } from './js/params'

if (debug.render.console || debug.render.physics) {
    document.querySelector('canvas.webgl').style.visibility = 'hidden'
}

const e = new Experience()