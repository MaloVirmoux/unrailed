import * as MATTER from 'matter-js'

import PhysicsChunk from './physics/PhysicsChunk'

import * as params from '../params'

/** Class used to run the engine of the physical world */
export default class Engine {
    /** Creates the engine */
    constructor() {
        this.activeChunks = [null, null]
    }

    /**
     * Adds a new chunk to the currently active chunks, keeps the previous one and stops the others
     * @param {string[][]} map Two dimensionnal array describing the map
     * @returns {engine.physics.PhysicsChunk} New physical chunk of the map
     */
    addChunk(map) {
        this.activeChunks.unshift(new PhysicsChunk(map))
        this.activeChunks[0].start()
        
        const oldChunk = this.activeChunks.pop()
        if (oldChunk) oldChunk.stop()

        return this.activeChunks[0]
    } 

    /**
     * Gets the current player coordinates
     * @returns {{position: MATTER.Vector, angle: number}} Dictionnary withe the position and the angle of the player
     */
    getPlayerCoords() {
        return {
            position: MATTER.Vector.mult(this.activeChunks[0].player.body.position, 1 / params.physics.scale),
            angle: this.activeChunks[0].player.body.angle
        }
    }

    /** Updates the active chunks */
    update() {
        this.activeChunks.forEach(chunk => {
            if (chunk) chunk.update()
        })
    }
}