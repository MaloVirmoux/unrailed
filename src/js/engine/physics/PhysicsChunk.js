import * as MATTER from 'matter-js'

import PhysicsPlayer from './PhysicsPlayer'
import Ray from '../Ray'

import * as params from '../../params'
import Debug from '../../Debug'

/** Class representing the physical chunk */
export default class PhysicsChunk {
    /**
     * Creates a physical chunk
     * @param {{type: string, distance:number, depth: number}[][]} map Two dimensionnal array of strings describing the map
     */
    constructor(map) {
        this.map = map
        params.chunk.width = params.chunk.width

        this.physicsEngine = MATTER.Engine.create({gravity: {x: 0, y: 0}})
        this.player = new PhysicsPlayer()
        ;({
            mountains: this.mountains,
            waters: this.waters,
            woods: this.woods,
            stones: this.stones
        } = this.createBodies())
        this.addBodies()

        this.ray = new Ray(this)
        this.toOutline = {}
        this.toUnOutline = {}
        this.toRemove = {}

        if(params.debug.render.physics) Debug.createPhysicsRender(this.physicsEngine)

        this.runner = MATTER.Runner.create()
    }

    /**
     * Creates the physical bodies in the physical chunk 
     * @returns {{mountains: {number: MATTER.Body}, waters: {number: MATTER.Body}, woods: {number: MATTER.Body}, stones: {number: MATTER.Body}}}
     */
    createBodies() {
        const mountains = {}
        const waters = {}
        const woods = {}
        const stones = {}
        for (let x = 0; x < params.chunk.length; x++) {
            for (let y = 0; y < params.chunk.width; y++) {
                const body = MATTER.Bodies.rectangle((x + 0.5) * params.physics.scale, (y + 0.5)  * params.physics.scale, params.physics.scale, params.physics.scale, {isStatic: true})
                switch (this.map[x][y]['type']) {
                    case 'mountain':
                        mountains[body.id] = body
                        break
                    case 'water':
                        waters[body.id] = body
                        break
                    case 'wood':
                        woods[body.id] = body
                        break
                    case 'stone':
                        stones[body.id] = body
                        break
                    default:
                        break
                }
            }
        }
        return {
            mountains: mountains,
            waters: waters,
            woods: woods,
            stones: stones
        }
    }

    /** Adds the physical bodies to the physical world (player, walls, and blocks */
    addBodies() {
        MATTER.Composite.add(this.physicsEngine.world, [
            this.player.body,
            // Creation of the Top Wall
            MATTER.Bodies.rectangle((params.chunk.length * params.physics.scale) / 2, (params.chunk.width * params.physics.scale) + 50, (params.chunk.length * params.physics.scale), 100, { isStatic: true }),
            // Creation of the Bottom Wall
            MATTER.Bodies.rectangle((params.chunk.length * params.physics.scale) / 2, - 50, (params.chunk.length * params.physics.scale), 100, { isStatic: true }),
            ...Object.values(this.mountains),
            ...Object.values(this.waters),
            ...Object.values(this.woods),
            ...Object.values(this.stones)
        ])
    }

    /**
     * Adds a body to the list of bodies to outline in the displayed world
     * @param {MATTER.Body} body Body to outline
     */
    outlineBody(body) {
        this.toOutline[body.id] = {
            x: Math.trunc(body.position.x / params.physics.scale),
            y: Math.trunc(body.position.y / params.physics.scale)
        }
    }

    /**
     * Removes a body from the list of bodies to outline in the displayed world
     * @param {MATTER.Body} body Body to unoutline
     */
    unOutlineBody(body) {
        this.toUnOutline[body.id] = {
            x: Math.trunc(body.position.x / params.physics.scale),
            y: Math.trunc(body.position.y / params.physics.scale)
        }
    }

    /**
     * Removes a body from the physical world, adds it to the list of bodies to remove from the displayed world
     * @param {MATTER.Body} body Body to remove
     */
    removeBody(body) {
        this.toRemove[body.id] = {
            x: Math.trunc(body.position.x / params.physics.scale),
            y: Math.trunc(body.position.y / params.physics.scale)
        }

        if (body.id in this.woods) delete this.woods[body.id]
        if (body.id in this.stones) delete this.stones[body.id]
        MATTER.Composite.remove(this.physicsEngine.world, body)
    }

    /** Starts to run the physical world */
    start() {
        MATTER.Runner.run(this.runner, this.physicsEngine)
    }

    /** Stops to run the physical world */
    stop() {
        MATTER.Runner.stop(this.runner)
    }

    /** Updates the physical world */
    update() {
        this.player.update()
        this.ray.update()
    }
}