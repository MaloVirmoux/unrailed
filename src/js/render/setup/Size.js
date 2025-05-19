import * as THREE from 'three'

let instance = null

/** Class used to manage the canva size */
export default class CanvaSize extends THREE.Vector2 {
    /** Creates a canva size object */
    constructor() {
        if (!instance) {
            instance = super()
            
            this.update()
        } else {
            return instance
        }
    }

    /** Updates the size of the canva */
    update() {
        this.width = window.innerWidth
        this.height = window.innerHeight
        this.ratio = window.innerWidth / window.innerHeight 
    }
}