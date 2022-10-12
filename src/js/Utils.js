import * as THREE from 'three'

export default class Utils {
    constructor() {
        if (!this.instance) {
            this.instance = this
        } else {
            return this.instance
        }
    }

    centerPosition(obj) {
        new THREE.Box3().setFromObject(obj).getCenter(obj.position).multiplyScalar(-1)
    }
}
