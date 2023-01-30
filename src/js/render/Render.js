import Size from './setup/Size'
import Scene from './setup/Scene'
import Camera from './setup/Camera'
import Player from './player/Player'
import Renderer from './setup/Renderer'
import Composer from './setup/Composer'
import RenderPass from './pass/RenderPass'
import OutlinePass from './pass/OutlinePass'
import Chunk from './object/Chunk'

import * as params from '../params'

export default class Render {
    constructor(container, engine) {
        this.container = container
        this.engine = engine

        this.size  = new Size()
        this.scene = new Scene()
        this.camera = new Camera(this.size)
        this.player = new Player()
        this.scene.add(this.camera, this.player)
        
        this.renderer = new Renderer(this.size, this.container)
        this.composer = new Composer(this.size, this.renderer)
        this.renderPass = new RenderPass(this.scene, this.camera)
        this.composer.addPass(this.renderPass)
        this.outlinePass = new OutlinePass(this.size, this.scene, this.camera, this.player)
        this.composer.addPass(this.outlinePass)

        this.activeChunks = [null, null]

        this.createListener()
    }

    createListener(){
        window.addEventListener('resize', () => {
            this.size.update()
            this.camera.update(this.size)
            this.renderer.update(this.size)
            this.composer.update(this.size)
        })
    }

    addChunk(map, physChunk) {
        this.activeChunks.unshift(new Chunk(map, physChunk))
        this.scene.add(this.activeChunks[0])

        const oldChunk = this.activeChunks.pop()
        oldChunk ? this.scene.remove(oldChunk) : null

        return this.activeChunks[0]
    }

    update() {
        this.player.update(this.engine.getPlayerCoords())
        this.activeChunks.forEach(chunk => {
            chunk ? chunk.update() : null
        })
        this.composer.render()
    }
}