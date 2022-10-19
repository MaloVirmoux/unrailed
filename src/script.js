import './style.css'

import Experience from './js/Experience'
import Map from './js/map/Map'

import { debug } from './js/params'

if (debug.render.console || debug.render.physics) {
    document.querySelector('canvas.webgl').style.visibility = 'hidden'
}

const e = new Experience()
const map = new Map()
e.createChunk(map.generateNewMap())
e.start()