import * as params from './params'

/**
 * Create an empty two dimensionnal array to describe the map
 * @returns {null[][]}
 */
function getEmptyMap() {
    return new Array(params.chunk.length).fill(null).map(()=>new Array(params.chunk.width).fill(null))
}

/**
 * Merge two maps, keeping top layer value if defined, else bottom one
 * @param {*[][]} bottomLayer
 * @param {*[][]} topLayer
 * @returns {*[][]} Merged maps
 */
function mergeMaps(bottomLayer, topLayer) {
    return bottomLayer.map((col, x) => col.map((cell, y) => topLayer[x][y] ?? cell))
}

// function centerPosition(obj) {
//     new THREE.Box3().setFromObject(obj).getCenter(obj.position).multiplyScalar(-1)
// }

export { getEmptyMap, mergeMaps }
