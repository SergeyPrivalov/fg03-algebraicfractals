function GetPool(left,top,right,bottom) {
    var n = document.getElementById("number");
    var canvas = document.getElementById("canvas");
    var canvasWidth = parseInt(canvas.getAttribute("width"));
    var canvasHeight = parseInt(canvas.getAttribute("height"));

    var color = document.getElementById("color");

    var context = canvas.getContext('2d');

    var imageData = context.createImageData(canvasWidth, canvasHeight);


    var cos = Math.cos(Math.PI / 3);
    var sin = Math.sin(Math.PI / 3);
    for (var i = 0; i < canvasWidth; ++i) {
        for (var j = 0; j < canvasHeight; ++j) {
            var point = GetComlexCoordinat(i, j, left, top, right, bottom, canvasWidth, canvasHeight);
            var atract = GetAtract(point[0], point[1], 0, n.value, cos, sin);
            var paint;
            switch (color.value) {
                case "class":
                    paint = ClassicColor(atract[0]);
                    break;
                case "lvl":
                    paint = Lvl(atract[1]);
                    break;
                case "zebra":
                    paint = Zebra(atract[1]);
                    break;
            }
            imageData.data[4 * (i + canvasWidth * j) + 0] = paint[0];
            imageData.data[4 * (i + canvasWidth * j) + 1] = paint[1];
            imageData.data[4 * (i + canvasWidth * j) + 2] = paint[2];
            imageData.data[4 * (i + canvasWidth * j) + 3] = paint[3];
        }
    }
    context.putImageData(imageData, 0, 0);
}
function GetAtract(x,y,iteration,n,cos,sin) {
    if (n == 0) return [0, 0];

    if (Check(x, y, 1, 0))return [1, iteration];

    if (Check(x, y, -cos, sin))return [2, iteration];

    if (Check(x, y, -cos, -sin))return [3, iteration];

    var a = x * x;
    var b = y * y;

    var X = 2 * x / 3 + (a - b) / (3 * Math.pow((a + b), 2));
    var Y = 2 * y * (1 - x / Math.pow((a + b), 2)) / 3;
    return GetAtract(X, Y, iteration + 1, n - 1, cos, sin);
}

/**
 * @return {boolean}
 */
function Check(x1,y1,x2,y2) {
    var epsilon = 0.0001;
    return Math.abs(x1 - x2) <= epsilon && Math.abs(y1 - y2) <= epsilon;
}
/**
 * z = 1;
 * z = -0.5 - 0.86603i
 * z = -0.5 + 0.86603i
 * Created by smpri on 18.03.2016.
 */
