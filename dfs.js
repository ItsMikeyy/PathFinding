async function dfs(y,x,path) { 
    if(grid[grid.length - 1][grid.length - 1] == 1){
        targtReached = true;
        return path;
    }

    if (y < 0 || y >= grid.length || x  < 0 || x >= grid.length || grid[y][x] == 1) {
        return path;
    }

    fill("red");
    rect(x*(HEIGHT/ROWS), y*(WIDTH/COLS),(WIDTH/COLS));
    await sleep(playbackSpeed);
    grid[y][x] = 1;
    path.push([y,x]);
    
    for (let i = 0; i < dirs.length; i++) {
        let [dy,dx] = dirs[i];
        if (dy + y >= 0 && dy + y < grid.length && dx + x >= 0 && dx + x < grid.length && grid[y+dy][x+dx] != 1) {
            fill("green");
            rect((x+dx)*(HEIGHT/ROWS), (y+dy)*(WIDTH/COLS),(WIDTH/COLS));
            await sleep(playbackSpeed);
        }
    }

    path = await dfs(y+1,x,path);
    path = await dfs(y,x+1,path);
    path = await dfs(y-1,x,path);
    path = await dfs(y,x-1,path);
    
    if (!targtReached){
        path.pop();
    }
    return path;
}




