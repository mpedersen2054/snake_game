
export default class Snake {
    constructor(args) {
        this.head = { x: 3, y: 0 }
        this.tail = { x: 0, y: 0 }
        this.length = 4

        this.direction = 'RIGHT'
        this.inflections = []
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

    getInflections() {
        return this.inflections
    }
    inflectionsPresent() {
        return !!this.inflections.length > 0
    }
    getLastInflection() {
        return this.inflections[this.inflections.length - 1]
    }
    addInflection(inf) {
        this.inflections = [...this.inflections, inf]
    }
    removeLastInflection() {
        this.inflections.pop()
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


        if (dir == 'DOWN') {
            let lastInflection
            // check for collision

            // handle inflection
            lastInflection = this.getLastInflection()

            // add inflection if it doesnt exist
            // if the last inf's 'x' is what head currently is, dont add another
            // (only applicable with non-setInterval...)
            if (!lastInflection || lastInflection.x != this.head.x) {
                if (this.direction != 'DOWN') {
                    this.addInflection({
                        id: `${this.head.x}${this.head.y}`,
                        prevDir: 'RIGHT',
                        x: this.head.x,
                        y: this.head.y
                    })
                }
            }
            // reassign, in case where there was no inflection when this move'DOWN' called
            lastInflection = this.getLastInflection()

            // remove the last inflection once the tail reaches it
            if (lastInflection && this.tail.x == lastInflection.x && this.tail.y == lastInflection.y) {
                console.log('TAIL REACHED THE LAST INFLECTION')
                this.removeLastInflection()
            }

            // update the direction, make the new head a snake, make the tail empty
            this.direction = 'DOWN'
            this.head.y += 1
            board[this.head.y][this.head.x] = 1
            board[this.tail.y][this.tail.x] = 0

            if (this.inflectionsPresent()) {
                // make the tail move towards the last inflection point
                // instead of the direction its going
                if (lastInflection.prevDir == 'RIGHT') {
                    this.tail.x += 1
                }
            } else {
                // move the tail down
                this.tail.y += 1
            }

        }

        return { success: true, board: board, snake: this }
    }
}
