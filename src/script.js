import './style.css'

import Assets from './js/Assets'
import Experience from './js/Experience'

import * as params from './js/params'

function start() {
    const container = document.querySelector('canvas.webgl')
    if (params.debug.render.console || params.debug.render.physics) {
        container.style.visibility = 'hidden'
    }
    
    const e = new Experience(container)
}

new Assets(start)