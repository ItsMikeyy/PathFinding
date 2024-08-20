//Main BFS
async function bfs(y,x) {
    let queue = [];

    //Prev holds the position used to get to current node
    //For reconstructing path
    let prev = Array(ROWS);
    for (let i = 0; i < COLS; i++) {
        prev[i] = Array(COLS);
    }
    queue.push([y,x]);
    //Set as wall so dont revisit
    grid[y][x] = 1;

    while (queue.length > 0){
        //Get first elem in q
        let [curY,curX] = queue.shift();
        
        //Fill red (visited)
        fill("red");
        rect(curX*(HEIGHT/ROWS), curY*(WIDTH/COLS),(WIDTH/COLS));
        
        //Check if reached goal
        if(grid[grid.length - 1][grid.length - 1] == 1){
            targtReached = true;
        } 
        
        //Pause for draw
        await sleep(playbackSpeed);

        //Add neighbour
        for (let i = 0; i < dirs.length; i++) {
            let [dy,dx] = dirs[i];
            if (dy + curY < 0 || dy + curY >= grid.length  || dx + curX < 0 || dx + curX >= grid.length || grid[curY+dy][curX+dx] == 1) {
                continue;
            }
            queue.push([dy+curY,dx+curX]);
            grid[dy+curY][dx+curX] = 1;
            prev[dy+curY][dx+curX] = [curY,curX];

            //Mark neighbours unvisited as green
            fill("green");  
            rect((curX+dx)*(HEIGHT/ROWS), (curY+dy)*(WIDTH/COLS),(WIDTH/COLS));
            await sleep(playbackSpeed);
        }
    }
    return prev
}

function reconstructPath(prev){
    //Get the path taken from start to end
    let path = [];
    var x = grid.length - 1;
    var y = grid.length - 1;
    path.push([y,x]);
    while (y != 0 || x != 0) {
        [y, x] = prev[y][x];
        path.push([y,x]);
    }
    
    //Path is in reverse since we worked from goal to start
    return path.reverse();
}