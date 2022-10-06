import { createNoise2D } from 'simplex-noise';

const factor = 3
const northNoise = createNoise2D()
function northGen(x, y) {
    return northNoise(factor * nx, factor * ny)
}

const southNoise = createNoise2D()
function southGen(x, y) {
    return southNoise(factor * x, factor * y)
}

function generateMountain(map) {
    for (let x = 0; x <= 31; x++) {
        for (let y = 0; y <= 127; y++) {
            switch (map[x][y]) {
                case 'N':
                    map[x][y] = northGen(x, y) > 0 ? 'X' : '.'
                    break
                case 'S':
                    map[x][y] = southGen(x, y) > 0 ? 'X' : '.'
                    break
            }
        }
    }
    return map
}
