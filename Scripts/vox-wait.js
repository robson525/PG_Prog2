var canvas;// = document.getElementById("cvWait");
var ctx;//= canvas.getContext("2d");

var h;// = canvas.height;
var w;// = canvas.width;

var start = -90;
var spread = 360;
var width = 5;
var stepsize = 11;
var style = "pie";

var startColor = [0, 100, 255];
var stopColor = [255, 0, 100];



var spinnerAnim = setInterval(function () {
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    spread = 360;
    width = 5;
    stepsize = 11;
    style = "pie";

    start += stepsize + width;
    drawParts(ctx, start, spread, width, stepsize, style, startColor, stopColor);
}, 100);



$(document).ready(function () {

    canvas = document.getElementById("cvWait");
    ctx = canvas.getContext("2d");
     h = canvas.height;
    w = canvas.width;

    drawParts(ctx, start, spread, width, stepsize, style, startColor, stopColor);
});
    

function deg2rad(degrees) {
    return parseFloat((Math.PI / 180) * degrees);
}

function rad2deg(radials) {
    return parseFloat(radials / (Math.PI / 180));
}

function drawParts(ctx, start, spread, partWidth, gapSize, style, startColor, stopColor) {
    ctx.lineCap = "round";

    var height = ctx.canvas.height / 2;
    var width = ctx.canvas.width / 2;

    var stepCount = Math.ceil(spread / (partWidth + gapSize));
    var count = 0;
    var color = [];

    for (var i = start; i < start + spread; i += partWidth + gapSize) {
        // Calculate the color cycle
        // Normally you'd precalculate this but I'm lazy this time
        //
        color[0] = interpolate(stopColor[0], startColor[0], count, stepCount); // Red
        color[1] = interpolate(stopColor[1], startColor[1], count, stepCount); // Green
        color[2] = interpolate(stopColor[2], startColor[2], count, stepCount); // Blue

        ctx.beginPath();
        ctx.fillStyle = "rgba(" + color.join() + "," + ((1 / stepCount) * count) + ")";

        ctx.arc(width, height, (Math.min(width, height) * 0.9), deg2rad(i), deg2rad(i + partWidth), false);

        switch (style) {
            case "swirl":
                // Swirl
                //                
                ctx.arc(width, height, (Math.min(width, height) * 0.4), deg2rad(i + partWidth + (partWidth + gapSize)), deg2rad(i + (partWidth + gapSize)), true);
                break;

            case "straight":
                // Straight lines
                //
                ctx.arc(width, height, (Math.min(width, height) * 0.4), deg2rad(i + partWidth * 2), deg2rad(i), true);
                break;

            default:
                // Pie chart like
                //
                ctx.arc(width, height, (Math.min(width, height) * 0.4), deg2rad(i + partWidth), deg2rad(i), true);
                break;
        }

        ctx.fill();

        count++;
    }
}

function interpolate(start, end, step, numSteps) {
    if (start < end) {
        return parseInt(((end - start) * (step / numSteps)) + start, 10);
    }
    else {
        return parseInt(((start - end) * (1 - (step / numSteps))) + end, 10);
    }
}



//drawParts(ctx, start, spread, width, stepsize, style, startColor, stopColor);


