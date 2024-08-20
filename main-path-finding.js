//Width and Height of window
const WIDTH = window.innerHeight - 250;
const HEIGHT = window.innerHeight - 250;
//Number of rows and cols in the grid
let ROWS; 
let COLS;

//Main grid array
let grid;

let dirs = [[0,-1],[-1,0],[0,1],[1,0]];
let targtReached = false;
let hasStart = false

let playbackSpeed = 100

//How big the grid is
let val = Number(document.getElementById("size").value);

//Start visual
document.getElementById("run").addEventListener("click",() => {
    if (!hasStart) {
        let val = document.getElementById("option").value;
        if (val == "DFS"){
            startDFS();
        }
        else if (val == "BFS") {
            startBFS();
        }
    }
});

//Redraw grid
document.getElementById("regenerate").addEventListener("click",() => {
    if (!hasStart) {
        setGrid();
    }
});

//Auto redraw grid when prob slide changes 
document.getElementById("probability").addEventListener("input", () => {
    if (!hasStart) {
        setGrid();
    }
});

//Set playback speed
document.getElementById("speed").addEventListener("input", () => {
    playbackSpeed = Math.abs(Number(document.getElementById("speed").value)) 
});

//Slider for changing grid size
document.getElementById("size").addEventListener("input", () => {
    val = Number(document.getElementById("size").value)
    
    createGrid();
    drawGrid();
})

//p5 js function
function setup() {
    createCanvas(WIDTH,HEIGHT);
    createGrid();
    drawGrid();
    
}

//entry for dfs 
async function startDFS() {
    hasStart = true;
    let path = await dfs(0,0,[]);

    //draw path if reached goal
    if (targtReached) {
        await drawPath(path);
    }
    hasStart = false;
    targtReached = false;
}

//entry for bfs
async function startBFS() {
    hasStart = true;

    let path = await bfs(0,0);
    //draw path if reached goal
    if (targtReached) {
        path = reconstructPath(path);
        await drawPath(path);
    }
    hasStart = false;
    targtReached = false;
}

//Setup grid 
function setGrid() {
    createGrid();
    drawGrid();
}




function createGrid() {
    //Create array to be used for pathfinding
    // 0 = empty    1 = wall
    ROWS = Math.floor(HEIGHT / val);
    COLS = Math.floor(HEIGHT / val);
    grid = new Array(ROWS);
    let prob = Number(document.getElementById("probability").value);
    for (let i = 0; i < grid.length; i ++) {
        grid[i] = new Array(COLS);
    }

    //Loop through array and set walls based on prob
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
    //Make sure start point and endpoint are not a wall
    grid[0][0] = 0;
    grid[grid.length - 1][grid[0].length - 1] = 0;
}

//Draw grid to screen
function drawGrid() {
    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            if (grid[j][i] == 1){
                fill("black");      //Walls are black
            }
            else {
                fill("white");      //Walls are white
            }
            rect(i*(HEIGHT/ROWS),j*(WIDTH/COLS),(WIDTH/COLS));
        }
    }
    //Set end point yellow
    fill("yellow");
    rect((grid.length - 1)*(HEIGHT/ROWS),(grid.length - 1)*(WIDTH/COLS),(WIDTH/COLS));
}



//Draw path dfs/bfs took to get to goal node
async function drawPath(path) {
    for (let i = 0; i < path.length; i++) {
        [y,x] = path[i];
        fill("blue");
        rect(x*(HEIGHT/ROWS),y*(WIDTH/COLS),(WIDTH/COLS));
        await sleep(playbackSpeed);
    }
}


//Used to show visuals
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}