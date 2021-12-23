
// var canvas = document.getElementById("canvas");

// var box = canvas.getContext("2d");

// const o = [box];

// var x  = 0;
// var y  = 0;
// var vx = 0;
// var vy = 0;
// var ax = 1;
// var ay = 1;
// var frameTime = 0.0167;

// box.fillStyle = "#FF0000";
// box.fillRect(x,y,80,150);

// function move(dt) {
//     console.log(x)
//     vx += ax * dt;
//     vy += ay * dt;
//     x += vx * dt;
//     y += vy * dt;
    
// }

// function moveWithGravity(dt, o) {  // "o" refers to Array of objects we are moving
//     for (let o1 of o) {  // Zero-out accumulator of forces for each object
//         o1.fx = 0;
//         o1.fy = 0;
//     }
//     for (let [i, o1] of o.entries()) {  // For each pair of objects...
//         for (let [j, o2] of o.entries()) {
//             if (i < j) {  // To not do same pair twice
//                 let dx = o2.x - o1.x;  // Compute distance between centers of objects
//                 let dy = o2.y - o1.y;
//                 let r = Math.sqrt(Math.pow(dx, 2) + Math.pow(dy, 2));
//                 if (r < 1) {  // To avoid division by 0
//                     r = 1;
//                 }
//                 // Compute force for this pair; k = 1000
//                 let f = (1000 * o1.m * o2.m) / Math.pow(r, 2);  
//                 let fx = f * dx / r;  // Break it down into components
//                 let fy = f * dy / r;
//                 o1.fx += fx;  // Accumulate for first object
//                 o1.fy += fy;
//                 o2.fx -= fx;  // And for second object in opposite direction
//                 o2.fy -= fy;
//             }
//         }
//     }
//     for (let o1 of o) {  // for each object update...
//         let ax = o1.fx / o1.m;  // ...acceleration 
//         let ay = o1.fy / o1.m;

//         o1.vx += ax * dt;  // ...speed
//         o1.vy += ay * dt;

//         o1.x += o1.vx * dt;  // ...position
//         o1.y += o1.vy * dt;
//     }
// }




//var redCircle, yellowCircle, blueCircle;

var framesPerSecond = 50;

var gravity = false;
var g = 9.81;

var buoyancy = false;
var airPressure = 1.225;

var airResistance = false;
var dragCoefficient = 0.47;


var maxSpeed = 30;
var energyRetainment = 1;

var frameTimer = 0;
var time = [0];
var objects = [];
var dataOfChart = [];

document.body.onkeydown = function(e){
    if(e.keyCode == 13){
        document.body.removeChild(document.body.children[0]);
        startParticleSimulation();
        
    }
}

function startSimulation(num){
    document.body.removeChild(document.body.children[0]);
    objects = [];
    if (num == 1){
        startBalloonSimulation();
    }
    else if (num == 2){
        startParticleSimulation();
    }
    else if (num == 3){
    
    }
    else if (num == 4){

    }
    simulationArea.start();
}

function startBalloonSimulation(){
    gravity = true;
    buoyancy = true;
    airResistance = true;


    blueCircle = new circle(450, 100, 12, 1.64, "blue");
    objects.push(blueCircle);
    // redCircle = new circle(100,100,50, 100, "red");
    // yellowCircle = new circle(500, 100, 50, 100,"yellow");
    
    
    // objects.push(redCircle);
    // objects.push(yellowCircle);

    
}

function startParticleSimulation() {
    gravity = true;

    createObjects();  
    
}



var simulationArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 700;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateSimulation, 1000/framesPerSecond);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

class circle{
    constructor(x, y, radius, mass, color){
        this.x = x;
        this.y = y;
        this.color = color;
        this.r = radius;
        this.m = mass;
        this.V = (4/3)*Math.PI*Math.pow(this.r/20,3);
        this.A = Math.PI*Math.pow(this.r/20,2)
        this.Cd = dragCoefficient;
    
        this.ax = 0;
        this.ay = 0;
        this.vx = 0;
        this.vy = 0; 
        this.fx = 0;
        this.fy = 0;
    }
    draw(){
        var ctx = simulationArea.context;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }
    newPos(){
            this.fx = 0;
            this.fy = ((gravity)? g*this.m : 0)- ((buoyancy)? g*this.V*airPressure : 0) - ((airResistance)? (1/2)*airPressure*this.Cd*this.A*Math.pow(this.vy,2) : 0);
            this.ax = this.fx/(framesPerSecond*this.m);
            this.ay = this.fy/(framesPerSecond*this.m);
            this.vx += this.ax;
            this.vy += this.ay;
            this.x += this.vx;
            this.y += this.vy;
            if (this.vx > maxSpeed) {
                this.vx = maxSpeed
            }
            if (this.vx < -maxSpeed) {
                this.vx = -maxSpeed
            }
            if (this.vy > maxSpeed) {
                this.vy = maxSpeed
            }
            if (this.vy < -maxSpeed) {
                this.vy = -maxSpeed
            }
    }

    resolveEdgeCollision(){
        // Detect collision with right wall.
        if (this.x + this.r > simulationArea.canvas.width) {
            // Need to know how much we overshot the canvas width so we know how far to 'bounce'.
            this.x = simulationArea.canvas.width - this.r;
            this.vx = -this.vx*energyRetainment;
            this.ax = -this.ax*energyRetainment;
        }

        // Detect collision with bottom wall.
        else if (this.y + this.r > simulationArea.canvas.height) {
            this.y = simulationArea.canvas.height - this.r;
            this.vy = -this.vy*energyRetainment;
            //this.ay = -this.ay;
        }

        // Detect collision with left wall.
        else if (this.x - this.r < 0) {
            this.x  = this.r;
            this.vx = -this.vx*energyRetainment;
            this.ax = -this.ax*energyRetainment;
        }
        // Detect collision with top wall.
        else if (this.y - this.r < 0) {
            this.y = this.r;
            this.vy = -this.vy*energyRetainment;
            this.ay = -this.ay*energyRetainment;
        }
    }
}

function checkCollision(o1,o2){
    let dx = Math.abs(o2.x) - Math.abs(o1.x);
    let dy = Math.abs(o2.y) - Math.abs(o1.y);
    let d = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));

    if (d < o1.r+o2.r){
        let nx = dx / d;  // Compute iegen vectors
        let ny = dy / d;
        let s = o1.r + o2.r - d;
        o1.x -= nx * s/2;  // Move first object by half of collision size
        o1.y -= ny * s/2;
        o2.x += nx * s/2;  // Move other object by half of collision size in opposite direction
        o2.y += ny * s/2;

        let k = -2 * ((o2.vx - o1.vx) * nx + (o2.vy - o1.vy) * ny) / (1/o1.m + 1/o2.m);
        o1.vx -= k * nx / o1.m;  // Same as before, just added "k" and switched to "m" instead of "s/2"
        o1.vy -= k * ny / o1.m;
        o2.vx += k * nx / o2.m;
        o2.vy += k * ny / o2.m;
    }
}

function updateSimulation() {
    simulationArea.clear();

    for (let [i, o1] of objects.entries()) {
        for (let [j, o2] of objects.entries()) {
            if (i < j) {
                checkCollision(o1, o2);
            }
        }
    }
    for (let o of objects) {
        o.resolveEdgeCollision();
        o.newPos();
        o.draw();
    }



    frameTimer++;
    for (let o of objects){
        let coordinate = {x:time[time.length-1], y:o.vy};
        dataOfChart.push(coordinate);
    }
    time.push(time[time.length-1]+0.02);
    if (frameTimer==500){
        myChart.update();
    }

}

function createObjects(){
    objectCreation = {
        amount: 500,
        radius: 10,
        mass: 10,
        color: "black",
    };
    for (let i = 0; i < objectCreation.amount; i++) {
        let x = Math.random()*simulationArea.canvas.width*3;
        let y = Math.random()*simulationArea.canvas.height*5;
        let obj = new circle(x, y, objectCreation.radius, objectCreation.mass, objectCreation.color);
        objects.push(obj);
    }
}




// charting of info
const ctx = document.getElementById('canvasChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: time,
        datasets: [{
            label: 'Speed',
            data: dataOfChart,
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
