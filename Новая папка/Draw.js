function Zebra(n) {
    return n % 2 == 0 ? [0, 0, 0, 255] : [255, 255, 255, 255];
}
function Lvl(n) {
    var p = document.getElementById("number");
    var k = n;
    n = p.value;
    var brightness = n > 1 ? 255 * k * 4 / (n - 1) : 255;
    return [0, brightness, brightness, 255];
    //return [brightness, 0, brightness, 255];
    //return [0, brightness, 0, 255];
    //return [0, 0, brightness, 255];
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
function GibridColor(atract ,n){
    var opacity = 255;
    var red = 0;
    var green = 0;
    var blue = 0;

    var p = document.getElementById("number");
    var k = n;
    n = p.value;
    switch (atract) {
        case 1:
            red = n != 0 ? 255 * k / (n - 1) : 255;
            break;
        case 2:
            green = n != 0 ? 255 * k / (n - 1) : 255;
            break;
        case 3:
            blue = n != 0 ? 255 * k / (n - 1) : 255;
            break;
    }
    return [red, green, blue, opacity];

}
/**
 * Created by smpri on 18.03.2016.
 */
