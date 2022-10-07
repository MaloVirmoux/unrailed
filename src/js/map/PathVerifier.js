export default class PathVerifier {
    constructor() {}

    verify(chunk, startY) {
        this.toVisit = []
        this.visited = []
        var maxX = 0
        this.toVisit.push({'x': 0, 'y': startY})
        
        while(maxX != chunk.length - 1 && this.toVisit.length != 0) {
            const v = this.toVisit.pop()
            this.visited.push(v)
            // console.log('Visiting : ' + v.x + ';' + v.y)
            if(chunk[v.x][v.y] != 'M') {
                this.createNeighbours(v.x, v.y)
                // chunk[v.x][v.y] = '.'
            }
            maxX = Math.max(maxX, v.x)
        }
        if (maxX == chunk.length - 1) {
            return true
        } else if (this.toVisit.length == 0){
            return false
        }
    }

    createNeighbours(currentX, currentY) {        
        // Behind
        currentX > 0 ? this.createTile({'x': currentX - 1, 'y': currentY}, 'unshift') : null
        // Right
        currentY < 31 ? this.createTile({'x': currentX, 'y': currentY + 1}, 'push') : null
        // Left
        currentY > 0 ? this.createTile({'x': currentX, 'y': currentY - 1}, 'push') : null
        // Front
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

    //return !(visited.find(t => (t.x == tile.x && t.y == tile.y)))
}