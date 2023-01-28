import * as MATTER from 'matter-js'

import * as params from '../params'

export default class PhysicsRay {
    constructor(physChunk) {
        this.physChunk = physChunk
        this.player = physChunk.player
        this.target = false
        this.countdown = null
    }

    queryRay(bodies) {
        const collisions = MATTER.Query.ray(
            bodies,
            this.player.body.position,
            MATTER.Vector.add(
                this.player.body.position,
                MATTER.Vector.mult(
                    this.player.angle,
                    params.physics.range
                )
            ),
            params.physics.hitbox.width
        )
        const toKeep = {
            'body': null,
            'distance': Infinity
        }
        collisions.forEach((collision, i) => {
            const distance = MATTER.Vector.magnitude(MATTER.Vector.sub(this.player.body.position, collision.body.position))
            if (distance < toKeep.distance){
                toKeep.body = collision.bodyA
                toKeep.distance = distance
            }
        })
        return toKeep.body
    }

    update() {
        const newTarget = this.queryRay([
            ...Object.values(this.physChunk.woods),
            ...Object.values(this.physChunk.stones)
        ])

        const isNewTarget = newTarget && !this.target
        const changedTarget = newTarget && this.target && newTarget.id != this.target.id
        const leftTarget = !newTarget && this.target
        const noChange = (!newTarget && !this.target) || (newTarget && this.target && this.target.id == this.target.id)
        
        if (isNewTarget || changedTarget || leftTarget) {
            clearTimeout(this.timeout)
            this.target = newTarget
        }
        if (isNewTarget || changedTarget) {
            this.timeout = setTimeout(() => {
                this.physChunk.removeBody(this.target)
            }, 1500)
        }
    }
}