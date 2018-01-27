
export default class Snake {
    constructor(args) {
        this.head = { x: 3, y: 0 }
        this.tail = { x: 0, y: 0 }
        this.length = 4

        this.direction = 'RIGHT'
        this.inflectionPoints = []
    }

    init(board) {
        // generate initial snake
        let head = this.head.x
        while (head != -1) {
            board[0][head] = 1
            head--
        }
        return board
    }

    move(board, dir) {
        let len = this.length
        if (dir == 'RIGHT') {
            // check for collision

            // move the head 1 right, all other spaces will still be snake
            this.head.x += 1
            board[this.head.y][this.head.x] = 1
            // make prev tail blank and update tail cords
            board[this.tail.y][this.tail.x] = 0
            this.tail.x += 1
        }

        return { success: true, board: board, snake: this }
    }
}
