
import { genRandomMouseCoords } from '../helpers'

export default class Mouse {
    constructor() {}

    init(board) {
        // generates mouse at random tile, re runs if it lands on init snake
        let coords = genRandomMouseCoords()
        if (board[coords.y][coords.x] == 1) {
            // generated on snake
            console.log('LANDED ON MOUSE -- RE GENERATING!!!')
            return this.init(board)
        }
        board[coords.y][coords.x] = 2;
        return board
    }
}
