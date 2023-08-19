const WIDTH = window.innerHeight - 200;
const HEIGHT = window.innerHeight - 200;
let ROWS 
let COLS
let grid
let dirs = [[0,-1],[-1,0],[0,1],[1,0]]
let targtReached = false;
let hasStart = false

let playbackSpeed = 100
let val = Number(document.getElementById("size").value)
document.getElementById("run").addEventListener("click",() => {
    if (!hasStart) {
        let val = document.getElementById("option").value
        if (val == "DFS"){
            startDFS()
        }
        else if (val == "BFS") {
            startBFS()
        }
    }
})

document.getElementById("regenerate").addEventListener("click",() => {
    if (!hasStart) {
        setGrid();
    }
})

document.getElementById("probability").addEventListener("input", () => {
    if (!hasStart) {
        setGrid();
    }
})

document.getElementById("speed").addEventListener("input", () => {
   
    playbackSpeed = Math.abs(Number(document.getElementById("speed").value)) 
})

document.getElementById("size").addEventListener("input", () => {
    val = Number(document.getElementById("size").value)
    
    createGrid();
    drawGrid()
})

function setup() {
    createCanvas(WIDTH,HEIGHT);
    createGrid();
    drawGrid()
    
}

async function startDFS() {
    hasStart = true;
    let path = await dfs(0,0,[])
    if (targtReached) {
        await drawPath(path)
    }
    hasStart = false;
    targtReached = false
}

async function startBFS() {
    hasStart = true;
    let path = await bfs(0,0)
    path = reconstructPath(path)
    if (targtReached) {
        await drawPath(path)
    }
    hasStart = false;
    targtReached = false
}

function setGrid() {
    createGrid();
    drawGrid()
}




function createGrid() {
    ROWS = Math.floor(HEIGHT / val);
    COLS = Math.floor(HEIGHT / val);
    grid = new Array(ROWS);
    let prob = Number(document.getElementById("probability").value);
    for (let i = 0; i < grid.length; i ++) {
        grid[i] = new Array(COLS);
    }

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            let res = Math.floor(Math.random() * 100 + 1);
            if (res > prob) {
                grid[j][i] = 0;
            }
            else {
                grid[j][i] = 1;
            }
        }
    }
    grid[0][0] = 0;
    grid[grid.length - 1][grid[0].length - 1] = 0;
}

function drawGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[j][i] == 1){
                fill("black");
            }
            else {
                fill("white");
            }
            rect(i*(HEIGHT/ROWS),j*(WIDTH/COLS),(WIDTH/COLS));
        }
    }
    fill("yellow");
    rect((grid.length - 1)*(HEIGHT/ROWS),(grid.length - 1)*(WIDTH/COLS),(WIDTH/COLS));
}




async function drawPath(path) {
    for (let i = 0; i < path.length; i++) {
        [y,x] = path[i];
        fill("blue");
        rect(x*(HEIGHT/ROWS),y*(WIDTH/COLS),(WIDTH/COLS));
        await sleep(playbackSpeed);
    }
}



function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}