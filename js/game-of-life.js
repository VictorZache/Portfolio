const canvas = document.getElementById('bg-life');
const ctx = canvas.getContext('2d');

const CELL_SIZE = 12;
let resolutionX, resolutionY;
let grid, nextGrid;


const rootStyles = getComputedStyle(document.documentElement);
const accentColor = '#0f5132';


/*
const PATTERNS = {

    glider: [
        [0, 1], [1, 2], [2, 0], [2, 1], [2, 2]
    ],
    
    pentadecathlon: [
        [0, 0], [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [0, 8], [0, 9]
    ],
    
    acorn: [
        [0, 1], [1, 3], [2, 0], [2, 1], [2, 4], [2, 5], [2, 6]
    ]
};
*/


function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    resolutionX = Math.floor(canvas.width / CELL_SIZE);
    resolutionY = Math.floor(canvas.height / CELL_SIZE);
    
    
    grid = Array(resolutionX).fill(null).map(() => 
        Array(resolutionY).fill(null).map(() => Math.random() > 0.85 ? 1 : 0)
    );
    nextGrid = grid.map(arr => [...arr]);
}

function countNeighbors(x, y) {
    let sum = 0;
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {

            const col = (x + i + resolutionX) % resolutionX;
            const row = (y + j + resolutionY) % resolutionY;
            sum += grid[col][row];
        }
    }
    sum -= grid[x][y];
    return sum;
}

function computeNextGeneration() {
    for (let x = 0; x < resolutionX; x++) {
        for (let y = 0; y < resolutionY; y++) {
            const state = grid[x][y];
            const neighbors = countNeighbors(x, y);

            
            if (state === 1 && (neighbors < 2 || neighbors > 3)) {
                nextGrid[x][y] = 0;
            } else if (state === 0 && neighbors === 3) {
                nextGrid[x][y] = 1;
            } else {
                nextGrid[x][y] = state;
            }
        }
    }

    grid = nextGrid.map(arr => [...arr]);
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let x = 0; x < resolutionX; x++) {
        for (let y = 0; y < resolutionY; y++) {
            if (grid[x][y] === 1) {
                ctx.fillStyle = accentColor;
                

                ctx.fillRect(x * CELL_SIZE, y * CELL_SIZE, CELL_SIZE - 4, CELL_SIZE - 4);
            }
        }
    }
}


let lastTime = 0;
const fps = 12;

function loop(timestamp) {
    if (timestamp - lastTime >= 1000 / fps) {
        computeNextGeneration();
        draw();
        lastTime = timestamp;
    }
    requestAnimationFrame(loop);
}



init();
requestAnimationFrame(loop);


window.addEventListener('resize', init);

let isDrawing = false;


window.addEventListener('mousedown', (e) => {

    if (e.target.closest('a') || e.target.closest('button')) return;
    isDrawing = true;
});


window.addEventListener('mouseup', () => isDrawing = false);


window.addEventListener('mousemove', (e) => {
    if (!isDrawing) return;

    const cellX = Math.floor(e.clientX / CELL_SIZE);
    const cellY = Math.floor(e.clientY / CELL_SIZE);

    if (cellX >= 0 && cellX < resolutionX && cellY >= 0 && cellY < resolutionY) {
        grid[cellX][cellY] = 1;
        nextGrid[cellX][cellY] = 1;
        draw();
    }
});

