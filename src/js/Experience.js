import Size from './elements/setup/Size'
import Scene from './elements/setup/Scene'
import Camera from './elements/setup/Camera'
import Renderer from './elements/setup/Renderer'

import Chunk from './elements/object/Chunk'
import PhysicsWorld from './physics/PhysicsWorld'
import Player from './elements/player/Player'

export default class Experience {
    constructor() {
        this.size = new Size()
        this.scene = new Scene()
        this.camera = new Camera(this.size)
        this.renderer = new Renderer(this.size)
        this.scene.add(this.camera)
        
        this.physics = new PhysicsWorld()
        this.phyicsPlayer = this.createPlayer()
        
        this.createListener()
    }

    createChunk(map) {
        this.physics.createBarriers(map)
        this.scene.add(new Chunk(map))
    }

    createPlayer() {
        this.player = new Player()
        this.scene.add(this.player)
        return this.physics.player
    }

    updatePlayer() {
        this.player.position.set(this.phyicsPlayer.position.x, this.phyicsPlayer.position.y, 0.5)
    }

    createListener(){
        window.addEventListener('resize', () => {
            this.size.update()
            this.camera.update(this.size)
            this.renderer.update(this.size)
        })
    }
    
    start() {
        this.tick()
    }
    
    tick() {
        this.physics.updatePlayer()
        this.player.update(this.phyicsPlayer.position, this.phyicsPlayer.angle)
        this.renderer.render(this.scene, this.camera)
        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
}