function GetGull(x,y) {
    var iteration = FindIteration(x, y, parseFloat(canv.a), parseFloat(canv.b), canv.n);
    return canv.identifyColor(iteration);
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
