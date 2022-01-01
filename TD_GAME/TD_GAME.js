//settings
var framesPerSecond = 60

var speed = 10;






var screen ={
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 450;
        this.context = this.canvas.getContext("2d");
        document.getElementById("screen").insertBefore(this.canvas, document.getElementById("screen").childNodes[0]);
        this.interval = setInterval(renderFrame, 1000/framesPerSecond);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}


screen.start();



//Track path



var path = screen.context;
path.beginPath();
path.lineWidth = "50";
path.strokeStyle = "blue";
path.moveTo(100,0);
path.lineTo(100,350);
path.lineTo(300,350);
path.lineTo(300,100);
path.lineTo(500,100);
path.lineTo(500,350);
path.lineTo(700,350);
path.lineTo(700,100);
path.lineTo(900,100);
path.stroke();


var enemy = screen.context;
enemy.id = "enemy";
enemy.beginPath();
enemy.fillStyle = "red";
enemy.fillRect(50,0, 100, 100);
enemy.closePath();

function renderFrame() {
    
    

}











