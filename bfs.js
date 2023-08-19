async function bfs(y,x) {
    let queue = []
    let prev = Array(ROWS)
    for (let i = 0; i < COLS; i++) {
        prev[i] = Array(COLS)
    }
    queue.push([y,x])
    grid[y][x] = 1

    while (queue.length > 0){
        let [curY,curX] = queue.shift()
        fill("red");
        rect(curX*(HEIGHT/ROWS), curY*(WIDTH/COLS),(WIDTH/COLS));
        
        if(grid[grid.length - 1][grid.length - 1] == 1){
            targtReached = true;
        } 
        
        await sleep(playbackSpeed);
        for (let i = 0; i < dirs.length; i++) {
            let [dy,dx] = dirs[i];
            if (dy + curY < 0 || dy + curY >= grid.lengtvbh  || dx + curX < 0 || dx + curX >= grid.length || grid[curY+dy][curX+dx] == 1) {
                continue
            }
            queue.push([dy+curY,dx+curX])
            grid[dy+curY][dx+curX] = 1
            prev[dy+curY][dx+curX] = [curY,curX]
            fill("green");
            rect((curX+dx)*(HEIGHT/ROWS), (curY+dy)*(WIDTH/COLS),(WIDTH/COLS));
            await sleep(playbackSpeed);
        }
    }
    return prev
}

function reconstructPath(prev){
    let path = []
    var x = grid.length - 1
    var y = grid.length - 1
    path.push([y,x])
    while (y != 0 || x != 0) {
        [y, x] = prev[y][x]
        path.push([y,x])
    }
    return path.reverse()
}