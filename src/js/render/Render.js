import Size from './setup/Size'
import Scene from './setup/Scene'
import Camera from './setup/Camera'
import Renderer from './setup/Renderer'
import Player from './player/Player'

import Chunk from './object/Chunk'

export default class Render {
    constructor(engine) {
        this.engine = engine

        this.size  = new Size()
        this.scene = new Scene()
        this.camera = new Camera(this.size)
        this.renderer = new Renderer(this.size)
        this.assets = null

        this.player = new Player()
        this.scene.add(this.camera, this.player)

        this.createListener()
    }

    createListener(){
        window.addEventListener('resize', () => {
            this.size.update()
            this.camera.update(this.size)
            this.renderer.update(this.size)
        })
    }

    setAssets(assets) {
        this.assets = assets
    }

    addChunk(map) {
        const chunk = new Chunk(map, this.assets)
        this.scene.add(chunk)
        return chunk
    }

    update() {
        this.player.update(this.engine.getPlayerCoords())
        this.renderer.render(this.scene, this.camera)
    }
}