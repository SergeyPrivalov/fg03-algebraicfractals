function Canv() {
    this.left;
    this.top;
    this.right;
    this.bottom;
    this.width = 600;
    this.height = 600;
    this.n;
    this.color;
    this.method;
    this.a;
    this.b;
    this.getComlexCoordinat = function (x, y) {
        var i = x * (this.right - this.left) / (this.width - 1) + this.left;
        var j = y * (this.bottom - this.top) / (this.height - 1) + this.top;
        return {x: i, y: j};
    };
    this.newCoords = function (l, t, r, b) {
        this.left = l;
        this.top = t;
        this.right = r;
        this.bottom = b;
    };
    this.callFunction = function (x,y) {
        switch (this.method) {
            case "pool":
                return GetPool(x,y);
            case  "Mandel":
                return GetMandel(x,y);
            case "Gull":
                return GetGull(x,y);
        }
    };
    this.identifyColor = function (d) {
        var atract;
        var iteration = d;
        if (this.method == "pool") {
            atract = d.at;
            iteration = d.it;
        }
        switch (this.color) {
            case "class":
                if (this.method == "pool")
                    return ClassicColor(atract);
                return Classic(iteration);
            case "lvl":
                return Lvl(iteration);
            case "zebra":
                return Zebra(iteration);
            case "gibrid":
                if (this.method == "pool")
                    return GibridColor(atract, iteration);
        }
    };
    this.readFields = function(){
        var p = document.getElementById("number");
        this.n = p.value
        p = document.getElementById("color");
        this.color = p.value;
        p = document.getElementById("method");
        this.method = p.value;
        p = document.getElementById("x");
        this.a = p.value;
        p = document.getElementById("y");
        this.b = p.value;
    }
}
canv = new Canv();
function Touch(){
    var canvas = document.getElementById("canvas");
    canvas.addEventListener("mousedown", function (e) {
        mouseDownHandler(canvas, e);
    }, false);
}
function GetFractal(left,top,right,bottom) {
    var start = new  Date();
    canv.newCoords(left,top,right,bottom);
    canv.readFields();
    var canvas = document.getElementById("canvas");

    var context = canvas.getContext('2d');

    var imageData = context.createImageData(canv.width, canv.height);

    for (var i = 0; i < canv.width; ++i) {
        for (var j = 0; j < canv.height; ++j) {
            var point = canv.getComlexCoordinat(i, j);
            var paint = canv.callFunction(point.x,point.y);
            imageData.data[4 * (i + canv.width * j) + 0] = paint[0];
            imageData.data[4 * (i + canv.width * j) + 1] = paint[1];
            imageData.data[4 * (i + canv.width * j) + 2] = paint[2];
            imageData.data[4 * (i + canv.width * j) + 3] = paint[3];
        }
    }
    context.putImageData(imageData, 0, 0);
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
        ox = canv.width * z/2;
        oy = canv.height * z/2;
    }

    var left = coords.x - ox;
    var top = coords.y - oy;
    var right = coords.x + ox;
    var bottom = coords.y + oy;

    var point1 = canv.getComlexCoordinat(left,top);
    var point2 = canv.getComlexCoordinat(right,bottom);

    console.log("left: " + point1.x + "\n top: " + point1.y);
    console.log("right: " + point2.x + "\n bottom: " + point2.y);

    GetFractal(point1.x, point1.y, point2.x, point2.y);
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
