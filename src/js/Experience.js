import MapGenerator from './generator/MapGenerator'
import Engine from './engine/Engine'
import Render from './render/Render'
import Assets from './Assets'

export default class Experience {
    constructor(container) {
        this.container = container
        this.mapGenerator = new MapGenerator()
        this.engine = new Engine()
        this.render = new Render(this.container, this.engine)
        this.assets = new Assets(this)
    }
    
    start() {
        this.render.setAssets(this.assets)
        this.createNewChunk()
        this.tick()
    }
    
    createNewChunk() {
        const map = this.mapGenerator.getNewMap()
        const renderChunk = this.render.addChunk(map)
        this.engine.addChunk(map, renderChunk)
    }
    
    tick() {
        this.engine.update()
        this.render.render()
        window.requestAnimationFrame(() => this.tick())
    }
}