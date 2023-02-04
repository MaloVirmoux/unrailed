import * as MATTER from 'matter-js'
import * as TWEEN from '@tweenjs/tween.js'

import * as params from '../../params'

export default class PhysicsPlayer {
    constructor() {
        this.body = MATTER.Bodies.rectangle(0, 0, params.physics.hitbox.width, params.physics.hitbox.length, { friction: 0, frictionAir: 0, restitution: 0, inertia: 0 })
        this.direction = MATTER.Vector.create()
        this.angle = MATTER.Vector.create(1, 0)
        this.current = {
            velocity: {
                x: 0,
                y: 0
            },
            angle: 0
        }
        this.createControls()
    }

    createControls() {
        const pressed = {
            up: false,
            down: false,
            left: false,
            right: false
        }
        let tween
        
        const togglePressed = (dir) => {
            const velocity = MATTER.Vector.mult(MATTER.Vector.normalise(this.direction), params.physics.speed)
            const angle = MATTER.Vector.magnitude(this.direction) != 0 ? MATTER.Vector.angle(MATTER.Vector.create(), MATTER.Vector.normalise(this.direction)) : this.current.angle
            const to = {
                velocity: {
                    x: velocity.x,
                    y: velocity.y
                },
                angle: angle
            }
            if(typeof(tween) == TWEEN.Tween) {
                tween.stop()
            }
            tween = new TWEEN.Tween(this.current).to(to, 50).start()
            pressed[dir] = !pressed[dir]
        }

        addEventListener('keydown', (event) => {
            // Start Up Movement
            if ((event.key == 'z' || event.key == 'Z') && !pressed.up) {
                this.direction = MATTER.Vector.add(this.direction, MATTER.Vector.create(0, 1))
                togglePressed('up')
            // Start Down Movement
            } else if ((event.key == 's' || event.key == 'S') && !pressed.down) {
                this.direction = MATTER.Vector.add(this.direction, MATTER.Vector.create(0, -1))
                togglePressed('down')
            // Start Left Movement
            } else if ((event.key == 'q' || event.key == 'Q') && !pressed.left) {
                this.direction = MATTER.Vector.add(this.direction, MATTER.Vector.create(-1, 0))
                togglePressed('left')
            // Start Right Movement
            } else if ((event.key == 'd' || event.key == 'D') && !pressed.right) {
                this.direction = MATTER.Vector.add(this.direction, MATTER.Vector.create(1, 0))
                togglePressed('right')
            }
        })
        
        addEventListener('keyup', (event) => {
            // End Up Movement
            if ((event.key == 'z' || event.key == 'Z') && pressed.up) {
                this.direction = MATTER.Vector.add(this.direction, MATTER.Vector.create(0, -1))
                togglePressed('up')
            // End Down Movement
            } else if ((event.key == 's' || event.key == 'S') && pressed.down) {
                this.direction = MATTER.Vector.add(this.direction, MATTER.Vector.create(0, 1))
                togglePressed('down')
            // End Left Movement
            } else if ((event.key == 'q' || event.key == 'Q') && pressed.left) {
                this.direction = MATTER.Vector.add(this.direction, MATTER.Vector.create(1, 0))
                togglePressed('left')
            // End Right Movement
            } else if ((event.key == 'd' || event.key == 'D') && pressed.right) {
                this.direction = MATTER.Vector.add(this.direction, MATTER.Vector.create(-1, 0))
                togglePressed('right')
            }
        })
    }

    update() {
        MATTER.Body.setVelocity(this.body, this.current.velocity)
        MATTER.Body.setAngle(this.body, this.current.angle)
        MATTER.Body.setAngularVelocity(this.body, 0)
    }
}