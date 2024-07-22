const ctx = document.getElementById("canvas").getContext("2d");

function getGrid(radius) {
    // Generate grid
    grid = [];
    for(x = -radius; x < radius; x++) {
        ax = Math.abs(x + 0.5);
        grid.push([])
        for(y = -radius; y < radius; y++) {
            ay = Math.abs(y + 0.5);
            
            if(radius < Math.sqrt((ax + 0.5)**2 + (ay+0.5)**2) && radius > Math.sqrt((ax-0.5)**2 + (ay - 0.5)**2)) {
                grid.at(-1).push(true);
            }
            else {
                grid.at(-1).push(false);
            }
        }
    }
    
    return grid
}
function plotGrid(grid) {
    ctx.canvas.width = ctx.canvas.offsetWidth;
    ctx.canvas.height = ctx.canvas.offsetHeight;
    
    nx = grid.length;
    ny = grid[0].length;

    sx = ctx.canvas.width / nx;
    sy = ctx.canvas.height / ny;

    

    for(x = 0; x < nx; x++) {
        for(y = 0; y < ny; y++) {
            ctx.fillStyle = grid[x][y] ? "blue" : "gray";
            ctx.fillRect(x * sx, y*sy, sx, sy);
        }

    }
    ctx.beginPath();
    ctx.arc(ctx.canvas.width / 2, ctx.canvas.height/2, r * sx, 2*Math.PI, false);
    ctx.strokeStyle = "red";
    ctx.stroke();
}
r = 25;
plotGrid(getGrid(r))