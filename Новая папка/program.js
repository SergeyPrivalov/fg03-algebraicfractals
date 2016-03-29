countOfZoom = 1;
l = -2;
t = 2;
r = 2;
b = -2;
function GetFractal() {
    var p = document.getElementById("method");
    var canvas = document.getElementById("canvas");
    canvas.addEventListener("mousedown", function (e) {
        mouseDownHandler(canvas, e, p);
    }, false);
    switch (p.value) {
        case "pool":
            GetPool(l, t, r, b);
            break;
        case  "Mandel":
            GetMandel(l, t, r, b);
            break;
        case "Gull":
            GetGull(l, t, r, b);
            break;
    }
}
function mouseDownHandler(canvas, e,p) {
    var zoom = 8;
    var canvasWidth = parseInt(canvas.getAttribute("width"));
    var canvasHeight = parseInt(canvas.getAttribute("height"));
    var coords = canvas.relMouseCoords(e);
    var q = document.getElementById("zoom");
    var z = Math.pow(zoom, countOfZoom);

    var ox,oy;
    if (q.value === "+") {
        ox = canvasWidth / z;
        oy = canvasHeight / z;
    } else if (q.value === "-") {
        ox = canvasWidth * z;
        oy = canvasHeight * z;
    }

    var left = coords.x - ox;
    var top = coords.y - oy;
    var right = coords.x + ox;
    var bottom = coords.y + oy;

    var point1 = GetComlexCoordinat(left,top,l, t, r, b,canvasWidth,canvasHeight);
    var point2 = GetComlexCoordinat(right,bottom,l, t, r, b,canvasWidth,canvasHeight);
    alert(point1[0] + " " + point1[1] + " " + point2[0] + " " + point2[1]);
    switch (p.value) {
        case "pool":
            GetPool(point1[0], point1[1], point2[0], point2[1]);
            break;
        case  "Mandel":
            GetMandel(point1[0], point1[1], point2[0], point2[1]);
            break;
        case "Gull":
            GetGull(point1[0], point1[1], point2[0], point2[1]);
            break;
    }
    l = point1[0];
    t = point1[1];
    r = point2[0];
    b = point2[1];

}
HTMLCanvasElement.prototype.relMouseCoords = function (event) {
    var totalOffsetX = 0;
    var totalOffsetY = 0;
    var canvasX = 0;
    var canvasY = 0;
    var currentElement = this;

    do {
        totalOffsetX += currentElement.offsetLeft;
        totalOffsetY += currentElement.offsetTop;
    }
    while (currentElement = currentElement.offsetParent)

    canvasX = event.pageX - totalOffsetX;
    canvasY = event.pageY - totalOffsetY;

    // Fix for variable canvas width
    canvasX = Math.round(canvasX * (this.width / this.offsetWidth));
    canvasY = Math.round(canvasY * (this.height / this.offsetHeight));

    return {x: canvasX, y: canvasY}
}
function GetComlexCoordinat(x,y,left,top,right,bottom,width,height) {
    var i = x * (right - left) / (width - 1) + left;
    var j = y * (bottom - top) / (height - 1) + top;
    var point = [i, j];
    return point;
}
