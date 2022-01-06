var startBtn = document.getElementById("startButton");
var stopBtn = document.getElementById("stopButton");

var linesPerSecond=5;
var active = false;
var activatedOnce = false;

var screen ={
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1440;
        this.canvas.height = 780;
        this.context = this.canvas.getContext("2d");
        document.getElementById("screen").insertBefore(this.canvas, document.getElementById("thing").childNodes[0]);
        active = true;
        if (!activatedOnce){
            this.interval = setInterval(drawLine, 1000/linesPerSecond);
        }
        activatedOnce = true;
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
var lastPoint = [50,50];
function drawLine(){
    if(!active) return;
    let randomX = Math.random()*1440;
    let randomY = Math.random()*780;
    let randomHex = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    let ctx = screen.context;
    ctx.beginPath();
    ctx.moveTo(lastPoint[0],lastPoint[1]);
    ctx.lineTo(randomX,randomY);
    ctx.strokeStyle = randomHex;
    ctx.stroke();
    lastPoint = [randomX,randomY];
    let transRect = screen.context;
    transRect.fillRect(0,0,1440,780);
    transRect.fillStyle = "#00000022";
}
startBtn.addEventListener("click", () => {
    screen.start();
    screen.clear();
});
stopBtn.addEventListener("click", () =>{active = false});