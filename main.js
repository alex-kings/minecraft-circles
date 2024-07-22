const ctx = document.getElementById("canvas").getContext("2d");
const sizeInput = document.getElementById("sizeInput")
const zoomInput = document.getElementById("zoomInput")
const container = document.getElementById("container")
const borderSize = 0.05;
const backColour = "lightGreen";
const offColour = "lightGray";
const onColour = "blue";
const circleColour = "red";

// Parameters
let zoom = 1;
let side = 4;
sizeInput.value = side;
zoomInput.value = 0;

// Run on start
plotGrid();


function plotGrid() {
    // Initialise canvas
    ctx.canvas.width = zoom * container.offsetWidth;
    ctx.canvas.height = zoom* container.offsetHeight;

    ctx.fillStyle = backColour;
    ctx.fillRect(0,0,ctx.canvas.width, ctx.canvas.height);
    
    radius = side/2 - 0.5;
    
    // Draw on canvas
    sx = ctx.canvas.width / side;
    sy = ctx.canvas.height / side;
    
    s = side/2;
    for(i = 0; i < side; i++) {
        x = i-s;
        ax = Math.abs(x + 0.5);
        for(j = 0; j < side; j++) {
            y = j-s;
            ay = Math.abs(y + 0.5);
            ctx.fillStyle = radius < Math.sqrt((ax + 0.5)**2 + (ay+0.5)**2) && radius > Math.sqrt((ax-0.501)**2 + (ay - 0.501)**2) ? onColour : offColour;
            
            ctx.fillRect((i+borderSize) * sx, (j+borderSize) * sy, (1-2*borderSize)*sx, (1-2*borderSize)*sy);
        }
    }
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
    timeId = setTimeout(()=>{plotGrid(r)}, 200);
})

timeId2 = 0;
zoomInput.oninput = ()=>{
    clearTimeout(timeId2);
    zoom = 0.1 * Number(zoomInput.value) + 1;
    timeId2 = setTimeout(()=>plotGrid(), 10);
    
}