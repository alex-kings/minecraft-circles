// const ctx = document.getElementById("canvas").getContext("2d");
const sizeInput = document.getElementById("sizeInput")
const zoomInput = document.getElementById("zoomInput")
const container = document.getElementById("container")
const borderSize = 0.05;
const backColour = "white";
const offColour = "lightGray";
const onColour = "blue";
const activeColour = "green"
const circleColour = "red";
const svg = document.getElementById("svg");
const zoomContainer = document.getElementById("zoom-container");
const svgns = "http://www.w3.org/2000/svg";

const minWidth = 2;
const maxWidth = 400;

sizeInput.setAttribute("min", minWidth);
sizeInput.setAttribute("max", maxWidth);


// Parameters
let side = 4;
sizeInput.value = side;

svg.style.backgroundColor = offColour;

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
        grid.push([])
        for(j = 0; j < side; j++) {
            y = j-s;
            ay = Math.abs(y + 0.5);
            if(radius < Math.sqrt((ax + 0.5)**2 + (ay+0.5)**2) && radius > Math.sqrt((ax-0.501)**2 + (ay - 0.501)**2)) {
                grid.at(-1).push(true);
            }
            else {
                grid.at(-1).push(false);
                continue;
            }
            let rect = document.createElementNS(svgns, 'rect');
            rect.onmouseover = (evt) => {handleMouseover(evt, grid)}
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
zoomInput.oninput = ()=>{
    zoomContainer.style.width = `${zoomInput.value}%`;
    zoomContainer.style.height = `${zoomInput.value}%`;
}

// Handle when mouse is over an SVG element
function handleMouseover(evt, grid) {
    el = evt.target;

    [i,j] = el.id.split(",");
    i = Number(i);
    j = Number(j);

    n = grid.length;

    // if(!grid[i][j]) return;

    // Count horizontally
    d = 1;
    nx = 1;
    while(i + d < n && grid[i+d][j]) {
        nx++;
        d++;
    }
    d = 1;
    while(i - d >= 0 && grid[i-d][j]) {
        nx++;
        d++;
    }
    
    // Count vertically
    d = 1;
    ny = 1;
    while(j + d < n && grid[i][j+d]) {
        ny++;
        d++;
    }
    d = 1;
    while(j - d >= 0 && grid[i][j-d]) {
        ny++;
        d++;
    }

    console.log(nx, ny)
}


// IMPROVEMENTS:
/**
 * - Reduce lag by removing all the useless elements. Plot long lines instead.
 * - Display number of blocks in x and y directions.
 * - Make max zoom a function of the number of blocks.
 */