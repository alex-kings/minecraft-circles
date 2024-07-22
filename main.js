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
const svgns = "http://www.w3.org/2000/svg";


// Parameters
let zoom = 1;
let side = 4;
sizeInput.value = side;
zoomInput.value = 0;

// Run on start
plotGrid();


function plotGrid() {
    radius = side/2 - 0.65;
    s = side/2;

    svg.innerHTML = ""
    
    nx = side;
    ny = side;

    sx = 100/nx;
    sy = 100/ny;

    // Generate grid
    grid = [];

    for(i = 0; i < side; i++) {
        x = i-s;
        ax = Math.abs(x + 0.5);
        for(j = 0; j < side; j++) {
            y = j-s;
            ay = Math.abs(y + 0.5);

            let colour = radius < Math.sqrt((ax + 0.5)**2 + (ay+0.5)**2) && radius > Math.sqrt((ax-0.501)**2 + (ay - 0.501)**2);
            
            let rect = document.createElementNS(svgns, 'rect');
            rect.onmouseover = (evt) => {console.log(evt.target)}
            rect.setAttribute("x", (i+borderSize) * sx);
            rect.setAttribute("y", (j+borderSize) * sy);
            rect.setAttribute("width", (1-2*borderSize)*sx);
            rect.setAttribute("height", (1-2*borderSize)*sy);
            rect.setAttribute("rx",0);
            rect.setAttribute("ry",0);
            rect.setAttribute("fill", colour ? onColour : offColour);
            svg.appendChild(rect);
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
    timeId = setTimeout(()=>{plotGrid()}, 200);
})

timeId2 = 0;
zoomInput.oninput = ()=>{
    clearTimeout(timeId2);
    zoom = 0.1 * Number(zoomInput.value) + 1;
    timeId2 = setTimeout(()=>plotGrid(), 10);
    
}