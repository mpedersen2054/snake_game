
import { genRandomMouseCoords } from '../helpers'

export default class Mouse {
    constructor(args) {
        this.x = null
        this.y = null
    }

    init(board) {
        console.log('INITTING MOUSE')
        // generates mouse at random tile, re runs if it lands on init snake
        let coords = genRandomMouseCoords()
        console.log('NEW COORDS', coords)
        console.log('board in mouse...')
        if (board[coords.y][coords.x] == 1) {
            // generated on snake
            console.log('LANDED ON MOUSE -- RE GENERATING!!!')
            // console.log(`X: ${randX}, Y: ${randY}`)
            return this.init(board)
        }
        board[coords.y][coords.x] = 2;
        return board
    }
}
