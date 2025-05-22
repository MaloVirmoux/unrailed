import * as MATTER from 'matter-js'

import PhysicsPlayer from './PhysicsPlayer'
import Ray from '../Ray'

import * as params from '../../params'
import Debug from '../../Debug'

MATTER.Common.setDecomp(require('poly-decomp'))

/** Class representing the physical chunk */
export default class PhysicsChunk {
    /**
     * Creates a physical chunk
     * @param {{type: string, distance:number, depth: number}[][]} map Two dimensionnal array of strings describing the map
     */
    constructor(map) {
        this.map = map

        this.physicsEngine = MATTER.Engine.create({gravity: {x: 0, y: 0}})
        this.player = new PhysicsPlayer()
        // ;({
        //     mountains: this.mountains,
        //     waters: this.waters,
        //     woods: this.woods,
        //     stones: this.stones
        // } = this.createBodies())
        this.bodies = this.createBodies()
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
        let unusedVectors = []
        const bodiesVertices = []
        for (let x = 0; x < params.chunk.length; x++) {
            for (let y = 0; y < params.chunk.width; y++) {
                // Creates the sides inside the map
                if (this.map[x][y]['type'] == "default" && this.map[x][y]['depth'] == "0") {
                    if (y < params.chunk.width - 1 && this.map[x][y+1]['type'] != "default") unusedVectors.push([{"x": x, "y": y+1}, {"x": x+1, "y": y+1}])
                    if (x < params.chunk.length - 1 && this.map[x+1][y]['type'] != "default") unusedVectors.push([{"x": x+1, "y": y+1}, {"x": x+1, "y": y}])
                    if (y > 0 && this.map[x][y-1]['type'] != "default") unusedVectors.push([{"x": x+1, "y": y}, {"x": x, "y": y}])
                    if (x > 0 && this.map[x-1][y]['type'] != "default") unusedVectors.push([{"x": x, "y": y}, {"x": x, "y": y+1}])
                }
                // Creates the sides on the side of the map
                if (this.map[x][y]['type'] != "default") {
                    if (y == params.chunk.width - 1) unusedVectors.push([{"x": x+1, "y": y+1}, {"x": x, "y": y+1}])
                    if (x == params.chunk.length - 1) unusedVectors.push([{"x": x+1, "y": y}, {"x": x+1, "y": y+1}])
                    if (y == 0) unusedVectors.push([{"x": x, "y": y}, {"x": x+1, "y": y}])
                    if (x == 0) unusedVectors.push([{"x": x, "y": y+1}, {"x": x, "y": y}])
                }
            }
        }

        while (unusedVectors.length) {
            const newBodyVertices = []
            let previousVertice = unusedVectors[0][0]
            const startingVertice = unusedVectors[0][1]
            let currentVertice = startingVertice
            // For each side, searchs for the next one and adds it to the body 
            let vector
            do {
                // Computes the right one, if multiple vectors are available
                const candidatesVectors = unusedVectors.filter((v) => v && v[0]["x"] == currentVertice["x"] && v[0]["y"] == currentVertice["y"])
                if (candidatesVectors.length == 1) {
                    vector = candidatesVectors[0]
                } else {
                    const currentVector = MATTER.Vector.create(currentVertice["x"] - previousVertice["x"], currentVertice["y"] - previousVertice["y"])
                    const candidateVector0 = MATTER.Vector.create(candidatesVectors[0][1]["x"] - currentVertice["x"], candidatesVectors[0][1]["y"] - currentVertice["y"])
                    const candidateVector1 = MATTER.Vector.create(candidatesVectors[1][1]["x"] - currentVertice["x"], candidatesVectors[1][1]["y"] - currentVertice["y"])
                    const angle0 = MATTER.Vector.angle({"x": 0, "y": 0}, candidateVector0) - MATTER.Vector.angle({"x": 0, "y": 0}, currentVector)
                    const angle1 = MATTER.Vector.angle({"x": 0, "y": 0}, candidateVector1) - MATTER.Vector.angle({"x": 0, "y": 0}, currentVector)
                    vector = angle0 > angle1 ? candidatesVectors[0] : candidatesVectors[1] 
                }
                previousVertice = vector[0]
                currentVertice = vector[1]
                newBodyVertices.push(currentVertice)
                delete unusedVectors[unusedVectors.indexOf(vector)]
            } while (currentVertice["x"] != startingVertice["x"] || currentVertice["y"] != startingVertice["y"])
            // Removes the nulls from vectors
            unusedVectors = unusedVectors.filter(Array)
            bodiesVertices.push(newBodyVertices)
        }

        const bodies = []
        bodiesVertices.forEach(bodyVertices => {
            MATTER.Vertices.scale(bodyVertices, params.physics.scale, params.physics.scale, {"x": 0, "y": 0})
            const body = MATTER.Bodies.fromVertices(0, 0, bodyVertices, { isStatic: true }, false, 0.01, 1, 0.01)
            const xPos = Math.min(...bodyVertices.map((v) => v["x"]))
            const yPos = Math.min(...bodyVertices.map((v) => v["y"]))
            MATTER.Body.setPosition(body, {"x": -body.bounds.min.x + xPos, "y": -body.bounds.min.y + yPos})
            bodies.push(body)
        })

        return bodies
    }

    /** Adds the physical bodies to the physical world (player, walls, and blocks */
    addBodies() {
        MATTER.Composite.add(this.physicsEngine.world, [
            this.player.body,
            // Creation of the Top Wall
            MATTER.Bodies.rectangle((params.chunk.length * params.physics.scale) / 2, (params.chunk.width * params.physics.scale) + 50, (params.chunk.length * params.physics.scale), 100, { isStatic: true }),
            // Creation of the Bottom Wall
            MATTER.Bodies.rectangle((params.chunk.length * params.physics.scale) / 2, - 50, (params.chunk.length * params.physics.scale), 100, { isStatic: true }),
            ...this.bodies
        ])
    }

    /**
     * Adds a body to the list of bodies to outline in the displayed world
     * @param {MATTER.Body} body Body to outline
     */
    outlineBody(body) {
        this.toOutline[body.id] = {
            x: Math.trunc(body.position.x),
            y: Math.trunc(body.position.y)
        }
    }

    /**
     * Removes a body from the list of bodies to outline in the displayed world
     * @param {MATTER.Body} body Body to unoutline
     */
    unOutlineBody(body) {
        this.toUnOutline[body.id] = {
            x: Math.trunc(body.position.x),
            y: Math.trunc(body.position.y)
        }
    }

    /**
     * Removes a body from the physical world, adds it to the list of bodies to remove from the displayed world
     * @param {MATTER.Body} body Body to remove
     */
    removeBody(body) {
        this.toRemove[body.id] = {
            x: Math.trunc(body.position.x),
            y: Math.trunc(body.position.y)
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