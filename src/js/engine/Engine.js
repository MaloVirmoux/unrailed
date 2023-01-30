import PhysicsChunk from "./physics/PhysicsChunk"

export default class Engine {
    constructor() {
        this.activeChunks = [null, null]
    }

    addChunk(map) {
        this.activeChunks.unshift(new PhysicsChunk(map))
        this.activeChunks[0].start()
        
        const oldChunk = this.activeChunks.pop()
        oldChunk ? oldChunk.stop() : null

        return this.activeChunks[0]
    } 

    getPlayerCoords() {
        return {
            'position': this.activeChunks[0].player.body.position,
            'angle': this.activeChunks[0].player.body.angle
        }
    }

    update() {
        this.activeChunks.forEach(chunk => {
            chunk ? chunk.update() : null
        })
    }
}