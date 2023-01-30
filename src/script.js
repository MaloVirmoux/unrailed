import './style.css'

import Experience from './js/Experience'

import * as params from './js/params'

const container = document.querySelector('canvas.webgl')
if (params.debug.render.console || params.debug.render.physics) {
    container.style.visibility = 'hidden'
}

const e = new Experience(container)