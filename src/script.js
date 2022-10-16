import './style.css'

import Experience from './js/Experience'
import Map from './js/map/Map'
import PhysicsWorld from './js/physics/PhysicsWorld'

const e = new Experience()
const map = new Map()
e.createChunk(map.generateNewMap())
e.start()

// const m = new Map()
// m.generateNewChunk()
// m.printMap()