
export default class Mouse {
    constructor(args) {
        this.x = null
        this.y = null
    }

    init(board) {
        // generates mouse at random tile, re runs if it lands on init snake
        const randX = Math.floor(Math.random() * 24)
        const randY = Math.floor(Math.random() * 16)
        if (randY == 0) {
            console.log('LANDED ON MOUSE -- RE GENERATING!!!')
            console.log(`X: ${randX}, Y: ${randY}`)
            return this.init(board)
        }
        this.x = randX
        this.y = randY
        board[this.y][this.x] = 2;
        return board
    }
}
