function GetGull() {
    var n = document.getElementById("number");
    var canvas = document.getElementById("canvas");

    var a = document.getElementById("x");
    var b = document.getElementById("y");

    var color = document.getElementById("color");

    var context = canvas.getContext('2d');

    var imageData = context.createImageData(canv.width, canv.height);

    for (var i = 0; i < canv.width; ++i) {
        for (var j = 0; j < canv.height; ++j) {
            var point = canv.GetComlexCoordinat(i, j);
            var iteration = FindIteration(point[0], point[1], parseFloat(a.value), parseFloat(b.value), n.value);
            var paint;
            switch (color.value) {
                case "class":
                    paint = Classic(iteration);
                    break;
                case "lvl":
                    paint = Lvl(iteration);
                    break;
                case "zebra":
                    paint = Zebra(iteration);
                    break;
            }
            imageData.data[4 * (i + canv.width * j) + 0] = paint[0];
            imageData.data[4 * (i + canv.width * j) + 1] = paint[1];
            imageData.data[4 * (i + canv.width * j) + 2] = paint[2];
            imageData.data[4 * (i + canv.width * j) + 3] = paint[3];
        }
    }
    context.putImageData(imageData, 0, 0);
}
/**
 * @return {number}
 */
function FindIteration(x,y,a,b,n) {
    var x0 = x;
    var y0 = y;
    var x1 = 0;
    var y1 = 0;
    var iteration = 0;
    while (iteration < n) {
        if (x0 * x0 + y0 * y0 > 4)
            return iteration;
        x1 = x0 * x0 - y0 * y0 + a;
        y1 = 2 * x0 * y0 + b;
        x0 = x1;
        y0 = y1;
        iteration++;
    }
    return 0;
}
