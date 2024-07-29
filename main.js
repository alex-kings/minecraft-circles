// const ctx = document.getElementById("canvas").getContext("2d");
const sizeInput = document.getElementById("sizeInput")
const zoomInput = document.getElementById("zoomInput")
const container = document.getElementById("container")
const borderSize = 0.05;
const backColour = "white";
const offColour = "lightGray";
const onColour = "#0a791e";
const activeColour = "#5f340b";
const tempBarColour = "rgba(255,255,255,0.2)";
const svg = document.getElementById("svg");
const svgOuter = document.getElementById("svg-outer");
// const zoomContainer = document.getElementById("zoom-container");
const svgns = "http://www.w3.org/2000/svg";

const nbBlocksElement = document.getElementById("total-nb-blocks");
const nbBlocksXElement = document.getElementById("blocks-x");
const nbBlocksYElement = document.getElementById("blocks-y");
const stackSpan = document.getElementById("stackSpan")

const svgSize = 100;
const minWidth = 2;
const maxWidth = 1000;

sizeInput.setAttribute("min", minWidth);
sizeInput.setAttribute("max", maxWidth);

// Parameters
let side = 4;
sizeInput.value = side;

updateZoom();

svg.style.backgroundColor = offColour;

// Temporary bars
let vTempBar;
let hTempBar;

// Run on start
plotGrid();

function plotGrid() {
    // Reinitialize nb blocks
    updateZoom();
    nbBlocksXElement.innerText = 0;
    nbBlocksYElement.innerText = 0;

    radius = side/2 - 0.65;
    s = side/2;
    let nbBlocks = 0;

    svg.innerHTML = ""
    
    nx = side;
    ny = side;

    sx = svgSize/nx;
    sy = svgSize/ny;

    // Generate grid
    grid = [];

    for(i = 0; i < side; i++) {
        x = i-s;
        ax = Math.abs(x + 0.5);
        grid.push([])
        for(j = 0; j < side; j++) {
            y = j-s;
            ay = Math.abs(y + 0.5);
            if(radius < Math.sqrt((ax + 0.5)**2 + (ay+0.5)**2) && radius > Math.sqrt((ax-0.501)**2 + (ay - 0.501)**2)) {
                grid.at(-1).push(true);
                nbBlocks ++;
            }
            else {
                grid.at(-1).push(false);
                continue;
            }
            let rect = document.createElementNS(svgns, 'rect');
            rect.onmouseover = (evt) => {handleMouseover(evt, grid)}
            rect.onclick = (evt) => {handleClick(evt, grid)}
            rect.setAttribute("x", `${(i+borderSize) * sx}%`);
            rect.setAttribute("y", `${(j+borderSize) * sy}%`);
            rect.setAttribute("id", `${i},${j}`)
            rect.setAttribute("width", `${(1-2*borderSize) * sx}%`);
            rect.setAttribute("height", `${(1-2*borderSize) * sy}%`);
            rect.setAttribute("fill", onColour);
            svg.appendChild(rect);
        }
    }

    // Plot the separation lines
    for(i = 1; i < nx; i++) {
        let rect = document.createElementNS(svgns, 'rect');
        rect.setAttribute("x", `${(i*1 - borderSize) * sx}%`);
        rect.setAttribute("y", `0%`);
        rect.setAttribute("width", `${(2*borderSize) * sx}%`);
        rect.setAttribute("height", `100%`);
        rect.setAttribute("fill", backColour);
        svg.appendChild(rect);
        rect = document.createElementNS(svgns, 'rect');
        rect.setAttribute("y", `${(i*1 - borderSize) * sx}%`);
        rect.setAttribute("x", `0%`);
        rect.setAttribute("height", `${(2*borderSize) * sx}%`);
        rect.setAttribute("width", `100%`);
        rect.setAttribute("fill", backColour);
        svg.appendChild(rect);
    }
    // Add borders
    // Left
    rect = document.createElementNS(svgns, 'rect');
    rect.setAttribute("x", `0%`);
    rect.setAttribute("y", `0%`);
    rect.setAttribute("width", `${borderSize * sx}%`);
    rect.setAttribute("height", `100%`);
    rect.setAttribute("fill", backColour);
    svg.appendChild(rect);
    // Right
    rect = document.createElementNS(svgns, 'rect');
    rect.setAttribute("x", `${100 - borderSize * sx}%`);
    rect.setAttribute("y", `0%`);
    rect.setAttribute("width", `${borderSize * sx}%`);
    rect.setAttribute("height", `100%`);
    rect.setAttribute("fill", backColour);
    svg.appendChild(rect);
    // Top
    rect = document.createElementNS(svgns, 'rect');
    rect.setAttribute("x", `0%`);
    rect.setAttribute("y", `0%`);
    rect.setAttribute("width", `100%`);
    rect.setAttribute("height", `${borderSize * sx}%`);
    rect.setAttribute("fill", backColour);
    svg.appendChild(rect);
    // Bottom
    rect = document.createElementNS(svgns, 'rect');
    rect.setAttribute("x", `0%`);
    rect.setAttribute("y", `${100 - borderSize * sx}%`);
    rect.setAttribute("width", `100%`);
    rect.setAttribute("height", `${borderSize * sx}%`);
    rect.setAttribute("fill", backColour);
    svg.appendChild(rect);

    
    nbBlocksElement.innerText = nbBlocks;
    nbStacks = Math.floor(nbBlocks/64);
    overStack = nbBlocks%64;
    if(nbStacks > 0) {
        stackSpan.innerText = ` (${nbStacks} stack${nbStacks > 1 ? "s" : ""}${overStack ? " + " + overStack : ""})`;
    }
    else {
        stackSpan.innerText = ``
    }
}

sizeInput.addEventListener("change", ()=> {
    r = parseInt(sizeInput.value);
    if(r < minWidth || r > maxWidth) return;
    side = r
    plotGrid()
})

// On resize of window
timeId = 0;
window.addEventListener("resize", ()=>{
    clearTimeout(timeId);
    timeId = setTimeout(()=>{plotGrid()}, 200);
})

// Handle zoom
zoomInput.oninput = updateZoom;
window.onresize = updateZoom;

function updateZoom() {
    z = parseInt(zoomInput.value)*(Math.sqrt(side/3)) + 100;
    svg.style.width = z + "%";
}

// Handle when mouse is over an SVG element
function handleMouseover(evt, grid) {
    el = evt.target;

    [i,j] = el.id.split(",");
    i = Number(i);
    j = Number(j);

    n = grid.length;

    // Count horizontally
    d = 1;
    nx = 1;
    nxAbove = 0;
    while(i + d < n && grid[i+d][j]) {
        nx++;
        d++;
    }
    d = 1;
    while(i - d >= 0 && grid[i-d][j]) {
        nx++;
        d++;
        nxAbove++;
    }
    
    // Count vertically
    d = 1;
    ny = 1;
    nyAbove = 0;
    while(j + d < n && grid[i][j+d]) {
        ny++;
        d++;
    }
    d = 1;
    while(j - d >= 0 && grid[i][j-d]) {
        ny++;
        d++;
        nyAbove++;
    }

    // Update text
    nbBlocksXElement.innerText = nx;
    nbBlocksYElement.innerText = ny;

    // Remove temporary bars
    if(vTempBar) {
        vTempBar.remove();
    }
    if(hTempBar) {
        hTempBar.remove();
    }

    vTempBar = document.createElementNS(svgns, 'rect');
    vTempBar.setAttribute("x", `${(i*1 + borderSize) * sx}%`);
    vTempBar.setAttribute("y", `${(borderSize + j - nyAbove)*sy}%`);
    vTempBar.setAttribute("width", `${(1 - 2*borderSize) * sx}%`);
    vTempBar.setAttribute("height", `${(ny - 2*borderSize) * sx}%`);
    vTempBar.setAttribute("fill", tempBarColour);
    vTempBar.setAttribute("pointer-events", "none")
    svg.appendChild(vTempBar);
    hTempBar = document.createElementNS(svgns, 'rect');
    hTempBar.setAttribute("y", `${(j*1 + borderSize) * sy}%`);
    hTempBar.setAttribute("x", `${(borderSize + i - nxAbove)*sx}%`);
    hTempBar.setAttribute("height", `${(1 - 2*borderSize) * sy}%`);
    hTempBar.setAttribute("width", `${(nx - 2*borderSize) * sy}%`);
    hTempBar.setAttribute("fill", tempBarColour);
    hTempBar.setAttribute("pointer-events", "none")
    svg.appendChild(hTempBar);
}

function handleClick(evt, grid) {
    if(evt.target.getAttribute('fill') == onColour) {
        evt.target.setAttribute("fill", activeColour);
    }
    else {
        evt.target.setAttribute("fill", onColour);
    }
}

// IMPROVEMENTS:
/**
 * - Display number of blocks in x and y directions.
 * - Make max zoom a function of the number of blocks.
 */