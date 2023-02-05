import * as MATTER from 'matter-js'

import PhysicsPlayer from './PhysicsPlayer'
import Ray from '../Ray'

import * as params from '../../params'
import Debug from '../../Debug'

export default class PhysicsChunk {
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

    createBodies() {
        const mountains = {}
        const waters = {}
        const woods = {}
        const stones = {}
        for (let x = 0; x < params.chunk.length; x++) {
            for (let y = 0; y < params.chunk.width; y++) {
                const body = MATTER.Bodies.rectangle(x + 0.5, y + 0.5, 1, 1, {isStatic: true})
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

    addBodies() {
        MATTER.Composite.add(this.physicsEngine.world, [
            this.player.body,
            // Creation of the Top Wall
            MATTER.Bodies.rectangle(params.chunk.length / 2, params.chunk.width + 5, params.chunk.length, 10, { isStatic: true }),
            // Creation of the Bottom Wall
            MATTER.Bodies.rectangle(params.chunk.length / 2, - 5, params.chunk.length, 10, { isStatic: true }),
            ...Object.values(this.mountains),
            ...Object.values(this.waters),
            ...Object.values(this.woods),
            ...Object.values(this.stones)
        ])
    }

    outlineBody(body) {
        this.toOutline[body.id] = {
            x: Math.trunc(body.position.x),
            y: Math.trunc(body.position.y)
        }
    }

    unOutlineBody(body) {
        this.toUnOutline[body.id] = {
            x: Math.trunc(body.position.x),
            y: Math.trunc(body.position.y)
        }
    }

    removeBody(body) {
        this.toRemove[body.id] = {
            x: Math.trunc(body.position.x),
            y: Math.trunc(body.position.y)
        }

        if (body.id in this.woods) delete this.woods[body.id]
        if (body.id in this.stones) delete this.stones[body.id]
        MATTER.Composite.remove(this.physicsEngine.world, body)
    }

    start() {
        MATTER.Runner.run(this.runner, this.physicsEngine)
    }

    stop() {
        MATTER.Runner.stop(this.runner)
    }

    update() {
        this.player.update()
        this.ray.update()
    }
}