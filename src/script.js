import './style.css'

import Assets from './js/Assets'
import Experience from './js/Experience'

import * as params from './js/params'
import Debug from './js/Debug'

/** Starts the game */
function start() {
    const container = document.querySelector('canvas.webgl')
    Debug.container = container
    
    const e = new Experience(container)
}

new Assets(start)