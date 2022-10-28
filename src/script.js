import './style.css'

import Experience from './js/Experience'

import * as params from './js/params'

if (params.debug.render.console || params.debug.render.physics) {
    document.querySelector('canvas.webgl').style.visibility = 'hidden'
}

const e = new Experience()