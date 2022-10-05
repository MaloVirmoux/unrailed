import * as THREE from 'three'

function centerPosition(obj) {
    new THREE.Box3().setFromObject(obj).getCenter(obj.position).multiplyScalar(-1)
}

export default {centerPosition}