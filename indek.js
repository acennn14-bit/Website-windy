class Snake {
    constructor(gridSize) {
        this.gridSize = gridSize;
        this.reset();
    }

    reset() {
        this.body = [{ x: 10, y: 10 }];
        this.direction = { x: 1, y: 0 };
    }

    move() {
        const head = {
            x: this.body[0].x + this.direction.x,
            y: this.body[0].y + this.direction.y
        };

        this.body.unshift(head);
    }

    grow() {
        // tidak hapus ekor → snake bertambah panjang
    }

    setDirection(dx, dy) {
        if (
            (dx !== 0 && this.direction.x === 0) ||
            (dy !== 0 && this.direction.y === 0)
        ) {
            this.direction = { x: dx, y: dy };
        }
    }

    checkCollision(tileCount) {
        const head = this.body[0];

        // Tabrak dinding
        if (
            head.x < 0 ||
            head.x >= tileCount ||
            head.y < 0 ||
            head.y >= tileCount
        ) {
            return true;
        }

        // Tabrak diri sendiri
        for (let i = 1; i < this.body.length; i++) {
            if (
                head.x === this.body[i].x &&
                head.y === this.body[i].y
            ) {
                return true;
            }
        }

        return false;
    }

    draw(ctx) {
        ctx.fillStyle = "#0f0";
        ctx.strokeStyle = "#000";

        this.body.forEach(segment => {
            ctx.fillRect(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                this.gridSize - 2,
                this.gridSize - 2
            );

            ctx.strokeRect(
                segment.x * this.gridSize,
                segment.y * this.gridSize,
                this.gridSize - 2,
                this.gridSize - 2
            );
        });
    }
}

class Food {
    constructor(gridSize, tileCount) {
        this.gridSize = gridSize;
        this.tileCount = tileCount;
        this.generate();
    }

    generate() {
        this.position = {
            x: Math.floor(Math.random() * this.tileCount),
            y: Math.floor(Math.random() * this.tileCount)
        };
    }

    draw(ctx) {
        ctx.fillStyle = "#0ff";

        ctx.fillRect(
            this.position.x * this.gridSize,
            this.position.y * this.gridSize,
            this.gridSize - 2,
            this.gridSize - 2
        );
    }
}

class Game {
    constructor() {
        this.canvas = document.getElementById("gamecanvas");
        this.ctx = this.canvas.getContext("2d");

        this.gridSize = 20;
        this.tileCount = this.canvas.width / this.gridSize;

        this.snake = new Snake(this.gridSize);
        this.food = new Food(this.gridSize, this.tileCount);

        this.score = 0;
        this.gameLoop = null;

        this.bindEvents();
        this.start();
    }

    bindEvents() {
        document.addEventListener("keydown", e => {
            switch (e.key) {
                case "ArrowUp":
                    this.snake.setDirection(0, -1);
                    break;
                case "ArrowDown":
                    this.snake.setDirection(0, 1);
                    break;
                case "ArrowLeft":
                    this.snake.setDirection(-1, 0);
                    break;
                case "ArrowRight":
                    this.snake.setDirection(1, 0);
                    break;
            }
        });
    }

    start() {
        this.snake.reset();
        this.food.generate();
        this.score = 0;

        if (this.gameLoop) {
            clearInterval(this.gameLoop);
        }

        this.gameLoop = setInterval(() => this.update(), 100);
    }

    update() {
        this.clearCanvas();

        this.snake.move();

        const head = this.snake.body[0];

        // Cek makan
        if (
            head.x === this.food.position.x &&
            head.y === this.food.position.y
        ) {
            this.snake.grow();
            this.food.generate();
            this.score++;
        } else {
            this.snake.body.pop();
        }

        // Cek tabrakan
        if (this.snake.checkCollision(this.tileCount)) {
            alert("Game Over! Score: " + this.score);
            this.start();
            return;
        }

        this.snake.draw(this.ctx);
        this.food.draw(this.ctx);
    }

    clearCanvas() {
        this.ctx.fillStyle = "#000";
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

// Jalankan game
new Game();
