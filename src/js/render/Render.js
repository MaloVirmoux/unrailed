import CanvaSize from './setup/Size'
import Scene from './setup/Scene'
import Camera from './setup/Camera'
import Player from './player/Player'
import Renderer from './setup/Renderer'
import Composer from './setup/Composer'
import RenderPass from './pass/RenderPass'
import OutlinePass from './pass/OutlinePass'
import Chunk from './object/Chunk'

import * as params from '../params'

/** Class used to create the render */
export default class Render {
    /**
     * Creates the render
     * @param {Element} container HTML Element to display the scene in
     * @param {engine.Engine} engine Physical engine  
     */
    constructor(container, engine) {
        this.container = container
        this.engine = engine

        this.canvaSize  = new CanvaSize()
        this.scene = new Scene()
        this.camera = new Camera(this.canvaSize)
        this.player = new Player()
        this.scene.add(this.camera, this.player)
        
        this.renderer = new Renderer(this.canvaSize, this.container)
        this.composer = new Composer(this.canvaSize, this.renderer)
        this.renderPass = new RenderPass(this.scene, this.camera)
        this.composer.addPass(this.renderPass)
        this.playerOutlinePass = new OutlinePass(this.canvaSize, this.scene, this.camera, 'hidden')
        this.playerOutlinePass.selectedObjects = [this.player]
        this.composer.addPass(this.playerOutlinePass)
        this.blockOutlinePass = new OutlinePass(this.canvaSize, this.scene, this.camera, 'always')
        this.composer.addPass(this.blockOutlinePass)

        this.activeChunks = [null, null]

        this.createListener()
    }

    /** Creates the listeners to update the render */
    createListener(){
        window.addEventListener('resize', () => {
            this.canvaSize.update()
            this.camera.update(this.canvaSize)
            this.renderer.update(this.canvaSize)
            this.composer.update(this.canvaSize)
        })
    }

    /**
     * Adds a new chunk to the displayed render
     * @param {{type: string, distance:number, depth: number}[][]} map Two dimensional array of the map characteristics 
     * @param {engine.physics.PhysicsChunk} physChunk Physical representation of the chunk
     * @returns {render.object.Chunk} Body of the created chunk
     */
    addChunk(map, physChunk) {
        this.activeChunks.unshift(new Chunk(map, physChunk))
        this.scene.add(this.activeChunks[0])

        const oldChunk = this.activeChunks.pop()
        if (oldChunk) this.scene.remove(oldChunk)

        return this.activeChunks[0]
    }

    /** Updates the render */
    update() {
        this.player.update(this.engine.getPlayerCoords())
        this.activeChunks.forEach(chunk => {
            if (chunk) {
                this.blockOutlinePass.selectedObjects = []
                this.blockOutlinePass.selectedObjects.push(...chunk.outlined)
                chunk.update()
            }
        })
        this.composer.render()
    }
}