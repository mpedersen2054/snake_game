
export default class Mouse {
    constructor(args) {
        this.x = null
        this.y = null
    }

    generate(board) {
        // for straight direction only...
        const randX = Math.floor(Math.random() * 24)
        const randY = Math.floor(Math.random() * 16)
        if (randY == 0 && randX < 4) {
            this.generate(board)
        }
        this.x = randX
        this.y = randY
        board[this.y][this.x] = 2;
        return board
    }
}
