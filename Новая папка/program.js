function Canv(){
    this.left;
    this.top;
    this.right;
    this.bottom;
    this.width = 600;
    this.height = 600;
    this.canvas;
    this.GetComlexCoordinat =  function(x,y) {
        var i = x * (this.right - this.left) / (this.width - 1) + this.left;
        var j = y * (this.bottom - this.top) / (this.height - 1) + this.top;
        return [i, j];
    };
    this.NewCoords = function(l,t,r,b){
        this.left = l;
        this.top = t;
        this.right = r;
        this.bottom = b;
    };
    this.CallFunction = function(){
        var p = document.getElementById("method");
        switch (p.value) {
            case "pool":
                GetPool();
                break;
            case  "Mandel":
                GetMandel();
                break;
            case "Gull":
                GetGull();
                break;
        }
    }
}
canv = new Canv();
function Touch(){
    var canvas = document.getElementById("canvas");
    canvas.addEventListener("mousedown", function (e) {
        mouseDownHandler(canvas, e);
    }, false);
}
function GetFractal() {
    var start = new  Date();
    canv.NewCoords(-2,2,2,-2);
    canv.CallFunction();
    var end = new Date();
    console.log("вермя выполнения фрактала: " + (end.getDate() - start.getDate()) + " ms");
}
function mouseDownHandler(canvas, e) {
    var start = new  Date();
    var z = 4;
    var coords = canvas.relMouseCoords(e);
    console.log("центр приближения x: " + coords.x + " y: " + coords.y);
    var q = document.getElementById("zoom");

    var ox,oy;
    if (q.value === "+") {
        ox = canv.width / z;
        oy = canv.height / z;
    } else if (q.value === "-") {
        ox = canv.width * z;
        oy = canv.height * z;
    }

    var left = coords.x - ox;
    var top = coords.y - oy;
    var right = coords.x + ox;
    var bottom = coords.y + oy;

    var point1 = canv.GetComlexCoordinat(left,top);
    var point2 = canv.GetComlexCoordinat(right,bottom);

    console.log("left: " + point1[0] + "\n top: " + point1[1]);
    console.log("right: " + point2[0] + "\n bottom: " + point2[1]);

    canv.NewCoords(point1[0], point1[1], point2[0], point2[1]);
    canv.CallFunction();
    var end = new Date();
    console.log("вермя выполнения zoom: " + (end.getDate() - start.getDate()) + " ms");
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
