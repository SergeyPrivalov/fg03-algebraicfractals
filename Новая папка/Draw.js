function Zebra(n) {
    return n % 2 == 0 ? [0, 0, 0, 255] : [255, 255, 255, 255];
}
function Lvl(n) {
    var brightness = n != 0 ? 255 / (n - 1) : 255;
    return [0, 0, 0, brightness];
}
function Classic(d) {
    return d == 0 ? [0, 0, 0, 255] : [255, 255, 255, 255];
}
function ClassicColor(atract) {
    var opacity = 255;
    var red = 0;
    var green = 0;
    var blue = 0;

    switch (atract) {
        case 1:
            red = 255;
            break;
        case 2:
            green = 255;
            break;
        case 3:
            blue = 255;
            break;
    }
    return [red, green, blue, opacity];
}
/**
 * Created by smpri on 18.03.2016.
 */
