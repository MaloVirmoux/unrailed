import PlainGenerator from './biomes/PlainGenerator'

import * as params from '../params'
import { getEmptyMap } from '../utils'
import Debug from '../Debug'

export default class MapGenerator {
    constructor() {
        this.plainGenerator = new PlainGenerator()
        this.mapsList = []
    }

    getNewMap() {
        const layersMap = this.getLayersMap()
        layersMap['depths'] = this.getDepthsMap(layersMap['types'])

        const map = getEmptyMap()
        for (let x = 0; x < params.chunk.length; x++) {
            for (let y = 0; y < params.chunk.width; y++) {
                map[x][y] = {
                    type: layersMap['types'][x][y],
                    distance: layersMap['distances'][x][y],
                    depth: layersMap['depths'][x][y]
                }
            }
        }
        if (params.debug.render.console) Debug.printMap(map)

        return map
    }

    getLayersMap() {
        const layersMap = {
            types: this.getTypesMap()
        }
        layersMap['distances'] = this.getDistancesMap(layersMap['types'], 7)
        if (Math.min(layersMap['distances'][layersMap['distances'].length - 1]) == Infinity) {
            layersMap = this.getLayersMap()
        }
        return layersMap
    }

    getTypesMap() {
        const typesMap = getEmptyMap()

        for (let x = 0; x < params.chunk.length; x++) {
            for (let y = 0; y < params.chunk.width; y++) {
                typesMap[x][y] = this.plainGenerator.get(x, y)
            }
        }

        return typesMap
    }

    getDistancesMap(map, y) {
        const distancesMap = getEmptyMap()
        
        const next = []
        if (map[0][y] != 'mountain') {
            distancesMap[0][y] = 0
            next.push({x:0, y:y})
        }
        while (next.length > 0) {
            const current = next.shift()
            const distance = distancesMap[current.x][current.y] + 1
            if (current.x > 0 && map[current.x - 1][current.y] != 'mountain' && distancesMap[current.x - 1][current.y] == undefined) {
                distancesMap[current.x - 1][current.y] = distance
                next.push({x: current.x - 1, y: current.y})
            }
            if (current.x < params.chunk.length - 1 && map[current.x + 1][current.y] != 'mountain' && distancesMap[current.x + 1][current.y] == undefined) {
                distancesMap[current.x + 1][current.y] = distance
                next.push({x: current.x + 1, y: current.y})
            }
            if (current.y > 0 && map[current.x][current.y - 1] != 'mountain' && distancesMap[current.x][current.y - 1] == undefined) {
                distancesMap[current.x][current.y - 1] = distance
                next.push({x: current.x, y: current.y - 1})
            }
            if (current.y < params.chunk.width - 1  && map[current.x][current.y + 1] != 'mountain' && distancesMap[current.x][current.y + 1] == undefined) {
                distancesMap[current.x][current.y + 1] = distance
                next.push({x: current.x, y: current.y + 1})
            }
        }
        for (let x = 0; x < params.chunk.length; x++) {
            for (let y = 0; y < params.chunk.width; y++) {
                if (distancesMap[x][y] == undefined) distancesMap[x][y] = Infinity
            }
            
        }
        distancesMap.forEach(row => {
            row.forEach(distance => {
                if (distance == undefined) distance = Infinity
            })
        })

        return distancesMap
    }

    getDepthsMap (typesMap) {
        const depthsMap = getEmptyMap()

        let toCompute = []
        for (let x = 0; x < params.chunk.length; x++) {
            for (let y = 0; y < params.chunk.width; y++) {
                const blocktype = typesMap[x][y]
                if (x == 0 || x == params.chunk.length - 1 || y == 0 || y == params.chunk.width - 1) {
                    depthsMap[x][y] = 0
                } else if (typesMap[x + 1][y] != blocktype || typesMap[x - 1][y] != blocktype || typesMap[x][y + 1] != blocktype || typesMap[x][y - 1] != blocktype) {
                    depthsMap[x][y] = 0
                } else {
                    toCompute.push({x: x, y: y})
                }
            }
        }
        let depth = 1
        while (toCompute.length != 0) {
            const failed = []
            toCompute.forEach(t => {
                if (depthsMap[t.x + 1][t.y] == depth - 1 || depthsMap[t.x - 1][t.y] == depth - 1 || depthsMap[t.x][t.y + 1] == depth - 1 || depthsMap[t.x][t.y - 1] == depth - 1) {
                    depthsMap[t.x][t.y] = depth
                } else {
                    failed.push(t)
                }
            })
            depth++
            toCompute = failed
        }

        return depthsMap
    }
}