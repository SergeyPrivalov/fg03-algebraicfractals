function GetMandel(left,top,right,bottom) {
    var n = document.getElementById("number");
    var canvas = document.getElementById("canvas");
    var canvasWidth = parseInt(canvas.getAttribute("width"));
    var canvasHeight = parseInt(canvas.getAttribute("height"));

    var color = document.getElementById("color");

    var context = canvas.getContext('2d');

    var imageData = context.createImageData(canvasWidth, canvasHeight);

    for (var i = 0; i < canvasWidth; ++i) {
        for (var j = 0; j < canvasHeight; ++j) {
            var point = GetComlexCoordinat(i, j, left, top, right, bottom, canvasWidth, canvasHeight);
            var d = CheckDistanses(point[0], point[1], n.value);
            var paint;
            switch (color.value) {
                case "class":
                    paint = Classic(d);
                    break;
                case "lvl":
                    paint = Lvl(d);
                    break;
                case "zebra":
                    paint = Zebra(d);
                    break;
            }
            //alert(d);
            imageData.data[4 * (i + canvasWidth * j) + 0] = paint[0];
            imageData.data[4 * (i + canvasWidth * j) + 1] = paint[1];
            imageData.data[4 * (i + canvasWidth * j) + 2] = paint[2];
            imageData.data[4 * (i + canvasWidth * j) + 3] = paint[3];
        }
    }
    context.putImageData(imageData, 0, 0);
}
/**
 * @return {number}
 */
function CheckDistanses(a,b,n) {
    var x0 = 0;
    var y0 = 0;
    var x1 = 0;
    var y1 = 0;
    var iteration = 0;
    while (iteration < n) {
        x1 = x0 * x0 - y0 * y0 + a;
        y1 = 2 * x0 * y0 + b;
        if (x1 * x1 + y1 * y1 > 4)
            return iteration;
        x0 = x1;
        y0 = y1;
        iteration++;
    }
    return 0;
}
/**
 * Created by smpri on 18.03.2016.
 */
