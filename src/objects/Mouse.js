
import { genRandomMouseCoords } from '../helpers'

export default class Mouse {
    constructor(args) {
        this.x = null
        this.y = null
    }

    init(board) {
        // generates mouse at random tile, re runs if it lands on init snake
        let coords = genRandomMouseCoords()
        if (coords.y == 0 && coords.x < 4) {
            // generated on snake
            console.log('LANDED ON MOUSE -- RE GENERATING!!!')
            console.log(`X: ${randX}, Y: ${randY}`)
            return this.init(board)
        }
        board[coords.y][coords.x] = 2;
        return board
    }
}
