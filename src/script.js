import './style.css'

import Experience from './js/Experience.js'
import Map from './js/map/Map.js'

const e = new Experience()
const map = new Map()
map.generateNewChunk()
e.createChunk(map.generateNewChunk())
e.start() 

// const m = new Map()
// m.generateNewChunk()
// m.printMap()