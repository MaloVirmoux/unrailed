import * as params from '../params'

export default class PathVerifier {
    constructor() {}

    verify(map, startY) {
        this.toVisit = []
        this.visited = []
        var maxX = 0
        this.toVisit.push({'x': 0, 'y': startY})
        
        while(maxX != map.length - 1 && this.toVisit.length != 0) {
            const v = this.toVisit.pop()
            this.visited.push(v)
            if(map[v.x][v.y] != 'mountain') {
                this.createNeighbours(v.x, v.y)
                if (params.debug.render.console) {
                    map[v.x][v.y] = 'path'
                }
            }
            maxX = Math.max(maxX, v.x)
        }
        if (maxX == map.length - 1) {
            if (params.debug.render.console) {
                this.printMap(map)
            }
            return true
        } else if (this.toVisit.length == 0){
            return false
        }
    }

    createNeighbours(currentX, currentY) {        
        // Behind Neighbour
        currentX > 0 ? this.createTile({'x': currentX - 1, 'y': currentY}, 'unshift') : null
        // Right Neighbour
        currentY < 31 ? this.createTile({'x': currentX, 'y': currentY + 1}, 'push') : null
        // Left Neighbour
        currentY > 0 ? this.createTile({'x': currentX, 'y': currentY - 1}, 'push') : null
        // Front Neighbour
        currentX < 127 ? this.createTile({'x': currentX + 1, 'y': currentY}, 'push') : null
    }

    createTile(tile, str) {
        if(!(this.visited.find(t => (t.x == tile.x && t.y == tile.y))) & !(this.toVisit.find(t => (t.x == tile.x && t.y == tile.y)))) {
            switch (str) {
                case 'unshift':
                    this.toVisit.unshift(tile)
                    break
                case 'push':
                    this.toVisit.push(tile)
                    break
            }
        }
    }
    
    printMap(map) {
        for (let x = 0; x < map.length; x++) {
            var line = ''
            for (let y = 0; y < map[x].length; y++) {
                switch (map[x][y]) {
                    case 'path':
                        line += '|'
                        break
                    case 'mountain':
                        line += 'X'
                        break
                    case 'water':
                        line += 'O'
                        break
                    case 'wood':
                        line += '^'
                        break
                    case 'stone':
                        line += '_'
                        break
                    default:
                        line += ' '
                        break
                }
            }
            console.log(line)
        }
    }
}