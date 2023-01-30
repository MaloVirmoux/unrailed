import MapGenerator from './generator/MapGenerator'
import Engine from './engine/Engine'
import Render from './render/Render'

export default class Experience {
    constructor(container) {
        this.container = container
        this.mapGenerator = new MapGenerator()
        this.engine = new Engine()
        this.render = new Render(this.container, this.engine)
        this.createNewChunk()
        this.tick()
    }
    
    createNewChunk() {
        const mapChunk = this.mapGenerator.getNewMap()
        const physChunk = this.engine.addChunk(mapChunk)
        const renderChunk = this.render.addChunk(mapChunk, physChunk)
    }
    
    tick() {
        this.engine.update()
        this.render.update()
        window.requestAnimationFrame(() => this.tick())
    }
}