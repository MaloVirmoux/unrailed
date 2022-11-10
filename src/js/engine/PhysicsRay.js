import * as MATTER from 'matter-js'

import * as params from '../params'

export default class PhysicsRay {
    constructor(phys, player, woods, stones) {
        this.phys = phys
        this.player = player
        this.woods = woods
        this.stones = stones
        this.target = false
        this.countdown = null
    }

    queryRays() {
        let target = this.queryRay([
            ...Object.values(this.woods),
            ...Object.values(this.stones)
        ])
        target ??= this.queryRay([])
        return 
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
        let toKeep = [-1, Infinity]
        collisions.forEach((collision, i) => {
            const distance = MATTER.Vector.magnitude(MATTER.Vector.sub(this.player.body.position, collision.body.position))
            distance < toKeep[1] ? toKeep = [i, distance] : null
        })
        return collisions[toKeep[0]]
    }

    update() {
        const newTarget = this.queryRay()

        const isNewTarget = newTarget && !this.target
        const changedTarget = newTarget && this.target && newTarget.body.id != this.target.body.id
        const leftTarget = !newTarget && this.target
        const noChange = (!newTarget && !this.target) || (newTarget && this.target && this.target.body.id == this.target.body.id)
        
        if (isNewTarget || changedTarget || leftTarget) {
            clearTimeout(this.timeout)
            this.target = newTarget
        }
        if (isNewTarget || changedTarget) {
            this.timeout = setTimeout(() => {
                this.phys.removeBody(this.target.body)
                this.woods = this.phys.woods
                this.stones = this.phys.stones
            }, 1500)
        }
    }
}