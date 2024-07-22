const ctx = document.getElementById("canvas").getContext("2d");
const sizeInput = document.getElementById("sizeInput")
const borderSize = 0.05;
const backColour = "lightGreen";
const offColour = "lightGray";
const onColour = "blue";
const circleColour = "red";

function plotGrid(side) {
    

    radius = side/2 - 0.5;
    intRad = Math.ceil(radius);
    // Generate grid
    grid = [];
    // for(x = -radius; x < radius; x++) {
    //     ax = Math.abs(x + 0.5);
    //     grid.push([])
    //     for(y = -radius; y < radius; y++) {
    //         ay = Math.abs(y + 0.5);
            
    //         if(radius < Math.sqrt((ax + 0.5)**2 + (ay+0.5)**2) && radius > Math.sqrt((ax-0.501)**2 + (ay - 0.501)**2)) {
    //             grid.at(-1).push(true);
    //         }
    //         else {
    //             grid.at(-1).push(false);
    //         }
    //     }
    // }

    for(x = -side/2; x < side/2; x++) {
        ax = Math.abs(x + 0.5);
        grid.push([]);
        for(y=-side/2; y < side/2; y++) {
            ay = Math.abs(y + 0.5);
            if(radius < Math.sqrt((ax + 0.5)**2 + (ay+0.5)**2) && radius > Math.sqrt((ax-0.501)**2 + (ay - 0.501)**2)) {
                grid.at(-1).push(true);
            }
            else {
                grid.at(-1).push(false);
            }
        }
    }

    // Draw on canvas
    ctx.canvas.width = ctx.canvas.offsetWidth;
    ctx.canvas.height = ctx.canvas.offsetHeight;

    ctx.fillStyle = backColour;
    ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
    
    nx = grid.length;
    ny = grid[0].length;

    sx = ctx.canvas.width / nx;
    sy = ctx.canvas.height / ny;

    for(x = 0; x < nx; x++) {
        for(y = 0; y < ny; y++) {
            ctx.fillStyle = grid[x][y] ? onColour : offColour;
            ctx.fillRect((x+borderSize) * sx, (y+borderSize) * sy, (1-2*borderSize)*sx, (1-2*borderSize)*sy);
        }

    }
    ctx.beginPath();
    ctx.strokeStyle = circleColour;
    ctx.arc(ctx.canvas.width / 2, ctx.canvas.height/2, radius * sx, 2*Math.PI, false);
    ctx.stroke();
}

// Run on start
r = 4;
sizeInput.value = r;
plotGrid(r);

sizeInput.addEventListener("change", ()=> {
    r = parseInt(sizeInput.value);
    plotGrid(r)
})

// On resize of window
timeId = 0;
window.addEventListener("resize", ()=>{
    clearTimeout(timeId);
    timeId = setTimeout(()=>{plotGrid(r)}, 200);
})