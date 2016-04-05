cos = Math.cos(Math.PI / 3);
sin = Math.sin(Math.PI / 3);
function GetPool(x,y) {
    var atract = GetAtract(x, y, 0, canv.n);
    return canv.identifyColor(atract);
}
function GetAtract(x,y,iteration,n) {
    if (n == 0) return {at : 0,it : iteration};

    if (Check(x, y, 1, 0))return {at : 1,it : iteration};

    if (Check(x, y, -cos, sin))return {at : 2,it : iteration};

    if (Check(x, y, -cos, -sin))return {at : 3,it : iteration};

    var a = x * x;
    var b = y * y;

    var X = 2 * x / 3 + (a - b) / (3 * Math.pow((a + b), 2));
    var Y = 2 * y * (1 - x / Math.pow((a + b), 2)) / 3;
    return GetAtract(X, Y, iteration + 1, n - 1);
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
