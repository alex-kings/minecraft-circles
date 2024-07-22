const ctx = document.getElementById("canvas").getContext("2d");
const sizeInput = document.getElementById("sizeInput")
const borderSize = 0.05;
const backColour = "lightGreen";
const offColour = "lightGray";
const onColour = "blue";
const circleColour = "red";

function plotGrid(side) {
    start = window.performance.now()

    // Initialise canvas
    ctx.canvas.width = ctx.canvas.offsetWidth;
    ctx.canvas.height = ctx.canvas.offsetHeight;

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

    end = window.performance.now();
    console.log("elapsed = ", end - start)
}

// Run on start
r = 4;
sizeInput.value = r;
plotGrid(r);

sizeInput.addEventListener("change", ()=> {
    r = parseInt(sizeInput.value);
    if(r < 2 || r > 400) return;
    plotGrid(r)
})

// On resize of window
timeId = 0;
window.addEventListener("resize", ()=>{
    clearTimeout(timeId);
    timeId = setTimeout(()=>{plotGrid(r)}, 200);
})