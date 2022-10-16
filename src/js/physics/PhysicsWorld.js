import { Engine, Runner, Composite, Bodies, Body, Vector } from "matter-js"

import { chunk } from "../params"

export default class PhysicsWorld {
    constructor() {
        this.engine = Engine.create({
            'gravity': {
                'x': 0,
                'y': 0
            }
        })
        this.player = this.createPlayer()
        Composite.add(this.engine.world, [...this.createWalls(), this.player])
        this.createControls()

        this.runner = Runner.create()
        Runner.run(this.runner, this.engine)
    }

    createWalls() {
        return [
            Bodies.rectangle(0, (10 + chunk.width) / 2, chunk.length, 10, { isStatic: true }),
            Bodies.rectangle(0, - (10 + chunk.width) / 2, chunk.length, 10, { isStatic: true })
        ]
    }

    createPlayer() {
        return Bodies.rectangle(0, 0, 1, 1, { friction: 0, frictionAir: 0, restitution: 0, inertia: Infinity })
    }

    createControls() {
        this.direction = Vector.create(0, 0)
        var upPressed = false
        var downPressed = false
        var leftPressed = false
        var rightPressed = false
        addEventListener('keydown', (event) => {
                   if ((event.key == "z" || event.key == "Z") && !upPressed) {
                upPressed = true
                this.direction = Vector.add(this.direction, Vector.create(0, 1))
            } else if ((event.key == "s" || event.key == "S") && !downPressed) {
                downPressed = true
                this.direction = Vector.add(this.direction, Vector.create(0, -1))
            } else if ((event.key == "q" || event.key == "Q") && !leftPressed) {
                leftPressed = true
                this.direction = Vector.add(this.direction, Vector.create(-1, 0))
            } else if ((event.key == "d" || event.key == "D") && !rightPressed) {
                rightPressed = true
                this.direction = Vector.add(this.direction, Vector.create(1, 0))
            }
            this.updatePlayer()
        })
        addEventListener('keyup', (event) => {
                   if (event.key == "z" || event.key == "Z") {
                upPressed = false
                this.direction = Vector.add(this.direction, Vector.create(0, -1))
            } else if (event.key == "s" || event.key == "S") {
                downPressed = false
                this.direction = Vector.add(this.direction, Vector.create(0, 1))
            } else if (event.key == "q" || event.key == "Q") {
                leftPressed = false
                this.direction = Vector.add(this.direction, Vector.create(1, 0))
            } else if (event.key == "d" || event.key == "D") {
                rightPressed = false
                this.direction = Vector.add(this.direction, Vector.create(-1, 0))
            }
            this.updatePlayer()
        })
    }

    updatePlayer() {
        Body.setVelocity(this.player, Vector.normalise(this.direction))
        if (Vector.magnitude(this.direction) != 0) {
            Body.setAngle(this.player, Vector.angle(this.direction, Vector.create(0, 0)))
        }
    }
}