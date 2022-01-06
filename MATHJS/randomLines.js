var startBtn = document.getElementById("startButton");
var stopBtn = document.getElementById("stopButton");



var linesPerSecond=5;
var active = false;

var screen ={
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1500;
        this.canvas.height = 780;
        this.context = this.canvas.getContext("2d");
        document.getElementById("screen").insertBefore(this.canvas, document.getElementById("thing").childNodes[0]);
        active = true
        this.interval = setInterval(drawLine, 1000/linesPerSecond);
        this.background = this.context;
        this.background.fillStyle = "black";
        this.background.fillRect(0,0,this.canvas.width,this.canvas.height);
        
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}
var lastPoint = [50,50];
function drawLine(){
    if(!active) return;
    let randomX = Math.random()*1500;
    let randomY = Math.random()*780;
    let randomClr = Math.floor(Math.random()*10);

    console.log(randomClr)
    let color;
    switch (randomClr){
        case 1:
            color = "white";
            break;
        case 2:
            color = "red";
            break;
        case 3:
            color = "cyan";
            break;
        case 4:
            color = "blue";
            break;
        case 5:
            color= "orange";
            break;
        case 6:
            color = "yellow";
            break;
        case 7:
            color = "red";
            break;
        case 8:
            color = "magenta";
            break;
        case 9:
            color = "tan";
            break;
        default:
            color = "green";
            break;
    }
    //let randomHex = `#${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}${Math.floor(Math.random()*10)}`
    let randomHex = `#${Math.floor(Math.random()*16777215).toString(16)}`;
    let ctx = screen.context;
    ctx.beginPath();
    ctx.moveTo(lastPoint[0],lastPoint[1]);
    ctx.lineTo(randomX,randomY);
    ctx.closePath();
    ctx.strokeStyle = randomHex;
    ctx.stroke();
    lastPoint = [randomX,randomY];
}
startBtn.addEventListener("click", () => {screen.start()});
stopBtn.addEventListener("click", () =>{active = false;});