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
        this.phyicsPlayer = this.physics.player
        
        this.createPlayer()

        this.createListener()
    }

    createChunk(map) {
        this.scene.add(new Chunk(map))
    }

    createPlayer() {
        this.player = new Player()
        this.scene.add(this.player)
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
        this.updatePlayer()
        this.renderer.render(this.scene, this.camera)
        window.requestAnimationFrame(() => {
            this.tick()
        })
    }
}