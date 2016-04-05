function GetMandel(x,y) {
    var d = CheckDistanses(x, y, canv.n);
    return canv.identifyColor(d);
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
