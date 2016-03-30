function GetMandel() {
    var n = document.getElementById("number");
    var canvas = document.getElementById("canvas");

    var color = document.getElementById("color");

    var context = canvas.getContext('2d');

    var imageData = context.createImageData(canv.width, canv.height);

    for (var i = 0; i < canv.width; ++i) {
        for (var j = 0; j < canv.height; ++j) {
            var point = canv.GetComlexCoordinat(i, j);
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
