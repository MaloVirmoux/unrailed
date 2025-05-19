import * as TWEEN from '@tweenjs/tween.js'

import MapGenerator from './generator/MapGenerator'
import Engine from './engine/Engine'
import Render from './render/Render'

/** Class used to run the game */
export default class Experience {
    /**
     * Creates the game
     * @param {Element} container HTML Element to display the scene in
     */
    constructor(container) {
        this.container = container
        this.mapGenerator = new MapGenerator()
        this.engine = new Engine()
        this.render = new Render(this.container, this.engine)
        this.createNewChunk()
        this.tick()
    }
    
    /** Creates a new chunk */
    createNewChunk() {
        const mapChunk = this.mapGenerator.getNewMap()
        const physChunk = this.engine.addChunk(mapChunk)
        const renderChunk = this.render.addChunk(mapChunk, physChunk)
    }
    
    /** Computes the next frame */
    tick() {
        TWEEN.update()
        this.engine.update()
        this.render.update()
        window.requestAnimationFrame(() => this.tick())
    }
}