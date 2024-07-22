const ctx = document.getElementById("canvas").getContext("2d");

function getCircleGrid(radius) {
    // Generate grid
    grid = [];
    for(x = -radius; x <= radius; x++) {
        grid.push([])
        for(y = -radius; y <= radius; y++) {
            if(radius > Math.sqrt((Math.abs(x)-0.5)**2 + (Math.abs(y)-0.5)**2) && radius < Math.sqrt((Math.abs(x)+0.5)**2 + (Math.abs(y)+0.5)**2)) {
                grid.at(-1).push(true);
            }
            else grid.at(-1).push(false)
        }
    }
    return grid
}
function plotGrid(grid) {
    
}
