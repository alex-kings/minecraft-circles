// const ctx = document.getElementById("canvas").getContext("2d");
const sizeInput = document.getElementById("sizeInput")
const zoomInput = document.getElementById("zoomInput")
const container = document.getElementById("container")
const borderSize = 0.05;
const backColour = "lightGreen";
const offColour = "lightGray";
const onColour = "blue";
const circleColour = "red";
const svg = document.getElementById("svg");

// Parameters
let zoom = 1;
let side = 4;
sizeInput.value = side;
zoomInput.value = 0;

// Run on start
plotGrid();


function plotGrid() {
    radius = side/2;

    // Generate grid
    grid = [];
    for(x = -radius; x < radius; x++) {
        ax = Math.abs(x + 0.5);
        grid.push([])
        for(y = -radius; y < radius; y++) {
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
    // ctx.canvas.width = zoom * container.clientWidth;
    // ctx.canvas.height = zoom* container.clientHeight;

    // ctx.fillStyle = backColour;
    // ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);

    svg.innerHTML = ""
    
    nx = grid.length;
    ny = grid[0].length;

    // sx = ctx.canvas.width / nx;
    // sy = ctx.canvas.height / ny;

    sx = 100/nx;
    sy = 100/ny;

    for(x = 0; x < nx; x++) {
        for(y = 0; y < ny; y++) {
            // ctx.fillStyle = grid[x][y] ? onColour : offColour;
            // ctx.fillRect((x+borderSize) * sx, (y+borderSize) * sy, (1-2*borderSize)*sx, (1-2*borderSize)*sy);
            
            // Create rectangle
            let svgns = "http://www.w3.org/2000/svg";
            let rect = document.createElementNS(svgns, 'rect');
            rect.setAttribute("x", (x+borderSize) * sx);
            rect.setAttribute("y", (y+borderSize) * sy);
            rect.setAttribute("width", (1-2*borderSize)*sx);
            rect.setAttribute("height", (1-2*borderSize)*sy);
            rect.setAttribute("rx",0);
            rect.setAttribute("ry",0);
            rect.setAttribute("fill", grid[x][y] ? onColour : offColour);
            svg.appendChild(rect);
        }
    }
    
    // Draw on SVG
    



}

sizeInput.addEventListener("change", ()=> {
    r = parseInt(sizeInput.value);
    if(r < 2 || r > 400) return;
    side = r
    plotGrid()
})

// On resize of window
timeId = 0;
window.addEventListener("resize", ()=>{
    clearTimeout(timeId);
    timeId = setTimeout(()=>{plotGrid()}, 200);
})

timeId2 = 0;
zoomInput.oninput = ()=>{
    clearTimeout(timeId2);
    zoom = 0.1 * Number(zoomInput.value) + 1;
    timeId2 = setTimeout(()=>plotGrid(), 10);
    
}