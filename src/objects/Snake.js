
export default class Snake {
    constructor(args) {
        this.head = { x: 5, y: 0 }
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
    getOldestInflection() {
        return this.inflections[0]
    }
    addInflection(inf) {
        this.inflections = [...this.inflections, inf]
    }
    removeOldestInflection() {
        this.inflections = this.inflections.slice(1)
    }

    move(board, dir) {
        // write collision code here ?

        // dont allow snake to move into itself
        if (this.direction == 'RIGHT' && dir == 'LEFT' ||
            this.direction == 'DOWN' && dir == 'UP' ||
            this.direction == 'LEFT' && dir == 'RIGHT' ||
            this.direction == 'UP' && dir == 'DOWN') {
                return { success: false }
        }

        return this.handleMovement(board, dir)
    }

    handleMovement(board, dir) {
        let oldestInflection = this.getOldestInflection()
        let nonIntervalLogic = oldestInflection
            ? (oldestInflection.x != this.head.x || oldestInflection.y != this.head.y)
            : false

        // add inflection if it doesnt exist
        // if the last inf's 'x' is what head currently is, dont add another
        // (only applicable with non-setInterval...)
        if (!oldestInflection || nonIntervalLogic) {
            if (this.direction != dir) { // diff direction than currently going
                this.addInflection({
                    id: `${this.head.x}${this.head.y}`,
                    prevDir: this.direction,
                    x: this.head.x,
                    y: this.head.y
                })
            }
        }

        // assign in case it didnt exist before
        oldestInflection = this.getOldestInflection()

        // update the direction & head based on
        // the direction for the Snake obj
        if (dir == 'RIGHT') {
            this.direction = 'RIGHT'
            this.head.x += 1
        } else if (dir == 'DOWN') {
            this.direction = 'DOWN'
            this.head.y += 1
        } else if (dir == 'LEFT') {
            this.direction = 'LEFT'
            this.head.x -= 1
        } else if (dir == 'UP') {
            this.direction = 'UP'
            this.head.y -= 1
        }

        // update board based on new head
        board[this.head.y][this.head.x] = 1
        board[this.tail.y][this.tail.x] = 0

        if (this.inflectionsPresent()) {
            // make the tail move towards the last inflection point
            // instead of the direction its going
            if (oldestInflection.prevDir == 'RIGHT') {
                this.tail.x += 1
            } else if (oldestInflection.prevDir == 'DOWN') {
                this.tail.y += 1
            } else if (oldestInflection.prevDir == 'LEFT') {
                this.tail.x -= 1
            } else if (oldestInflection.prevDir == 'UP') {
                this.tail.y -= 1
            }
        } else {
            // move the tail accordingly if there is no inf pt
            if (dir == 'RIGHT') {
                this.tail.x += 1
            } else if (dir == 'DOWN') {
                this.tail.y += 1
            } else if (dir == 'LEFT') {
                this.tail.x -= 1
            } else if (dir == 'UP') {
                this.tail.y -= 1
            }
        }

        // remove the last inflection once the tail reaches it
        if (oldestInflection && this.tail.x == oldestInflection.x && this.tail.y == oldestInflection.y) {
            console.log('TAIL REACHED THE LAST INFLECTION')
            this.removeOldestInflection()
        }

        // successful
        return {
            success: true,
            snake: this,
            board
        }
    }
}
