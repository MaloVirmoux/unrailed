import * as THREE from 'three'

import * as params from './params'

function getArray() {
    return new Array(params.chunk.length).fill(null).map(()=>new Array(params.chunk.width).fill(null))
}

// function centerPosition(obj) {
//     new THREE.Box3().setFromObject(obj).getCenter(obj.position).multiplyScalar(-1)
// }

export { getArray }
