import * as params from './params'

function getEmptyMap() {
    return new Array(params.chunk.length).fill(null).map(()=>new Array(params.chunk.width).fill(null))
}

function mergeArrays(bottomLayer, topLayer) {
    return bottomLayer.map((col, x) => col.map((cell, y) => topLayer[x][y] ?? cell))
}

// function centerPosition(obj) {
//     new THREE.Box3().setFromObject(obj).getCenter(obj.position).multiplyScalar(-1)
// }

export { getEmptyMap, mergeArrays }
