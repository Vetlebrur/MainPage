//settings for the simulations
var framesPerSecond = 50;

var gravity = false;
var g = 9.81;

var buoyancy = false;
var airPressure = 1.225;

var airResistance = false;
var dragCoefficient = 0.47;


var maxSpeed = 30;
var energyRetainment = 1;

//game related settings
var boxCollision = false;
var controls = false;
var speed = 200;
var jumpHeight = 10;
var onGround = false;
var onPlatform = false;
var keyLock = false;

//data log settings
var logData = false;
var frameTimer = 0;
var time = [0];
var objects = [];
var dataOfChart = [];

//enter key => starts the game simulation
document.body.onkeydown = function(e){
    if(e.keyCode == 13){
        startSimulation(3);
    }
}

//chooses a simulation and runs it
function startSimulation(num){
    objects = [];
    switch (num){
        case 1:
            startBalloonSimulation();
            break;
        case 2:
            startParticleSimulation();
            break;
        case 3:
            startGame();
            break;
        case 4:
            //last simulation
            break;
    }
    simulationArea.start();
}

//simulation for a balloon drop, includes buoyancy, air resistance, and gravity
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

//simulation for hundreds of particles under gravity, and elastic collisions. Also includes an energy retainment from collision with walls
function startParticleSimulation() {
    gravity = true;
    logData = true;
    energyRetainment = 0.9;
    
    //creation of the 500 particles in the particle simulation
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

//start of code for a Game. Game includes collision, gravity, and dynamic and static objects
function startGame(){
    gravity = true;
    controls = true;
    maxSpeed = 10;
    boxCollision = true;
    //creates a dynamic box, which we can control. objects[0] is the main box, and the one the controls affect. Therefore it is added first
    redBox = new box(50, 0, 100, 100, 10, "red", true);
    objects.push(redBox);
    //Creating the obstacles, static objects 
    blueObstacle1 = new box(500, 500, 300, 40, 100, "blue", false);
    blueObstacle2 = new box(200,300, 300, 20, 100, "blue", false);
    objects.push(blueObstacle1);
    objects.push(blueObstacle2);
}

//controls for the game, only works if the control boolean is true
document.body.onkeydown = function(e){
    if (controls){
        //left arrow => movement to the left
        if (e.keyCode == 37) {
            if (!keyLock){
                objects[0].fx = -speed;
                keyLock = true;
            }
        }
        //right arrow => movement to the right
        if (e.keyCode == 39) {
            if (!keyLock){
                objects[0].fx = speed;
                keyLock = true;
            }
        }
        //space => jump
        if (e.keyCode == 32 || e.keyCode == 38){
            if (onGround || onPlatform){
                objects[0].vy = -jumpHeight;
                objects[0].newPos()
            }   
        }
    }
}

//makes the controls stop when the key is released(onkeyup)
document.body.onkeyup = function(e){
    if (controls){
        //left arrow
        if (e.keyCode == 37){
            objects[0].fx = 0;
            objects[0].ax = 0;
            objects[0].vx = 0;
            keyLock = false;
        }
        //right arrow
        if (e.keyCode == 39){
            objects[0].fx = 0;
            objects[0].ax = 0;
            objects[0].vx = 0;
            keyLock = false;
        }
    }
}

//the canvas or simulation area that everything is rendered in.
var simulationArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 700;
        this.context = this.canvas.getContext("2d");
        document.getElementById("simulationArea").insertBefore(this.canvas, document.getElementById("simulationArea").childNodes[0]);
        this.interval = setInterval(updateSimulation, 1000/framesPerSecond);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

//Creates an object with class circle
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
        this.moveable = true;
    
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

//Creates an object with class box
class box{
    constructor(x, y, width, height, mass, color, moveable){
        this.x = x;
        this.y = y;
        this.color = color;
        this.width = width;
        this.height = height;
        this.m = mass;
        this.A = width*height;
        this.moveable = moveable;
    
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
        ctx.rect(this.x, this.y, this.width, this.height);
        ctx.stroke();
        ctx.fill();
        
    }
    newPos(){
        if (this.moveable){
            this.fx += 0;
            this.fy = ((gravity)? g*this.m : 0);
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
        
    }
    resolveEdgeCollision(){
        // Detect collision with right wall.
        if (this.x + this.width > simulationArea.canvas.width) {
            // Need to know how much we overshot the canvas width so we know how far to 'bounce'.
            this.x = simulationArea.canvas.width - this.width;
            this.vx = 0;
            this.ax = 0;
        }

        // Detect collision with bottom wall.
        if (this.y + this.height > simulationArea.canvas.height) {
            onGround = true;
            onPlatform = false;
            this.y = simulationArea.canvas.height - this.height;
            this.vy = 0;
            //this.ay = -this.ay;
        }
        else{
            onGround = false;
        }

        // Detect collision with left wall.
        if (this.x < 0) {
            this.x  = 0;
            this.vx = 0;
            this.ax = 0;
        }
        // Detect collision with top wall.
        if (this.y < 0) {
            this.y = 0;
            this.vy = 0;
            this.ay = 0;
        }
    }

}

//collision between circles
function checkCollision(o1,o2){
    //finding the difference (deltaX and deltaY) between the centers of the circles 
    let dx = Math.abs(o2.x) - Math.abs(o1.x);
    let dy = Math.abs(o2.y) - Math.abs(o1.y);
    //then the length of the vector between them (pythagoras)
    let d = Math.sqrt(Math.pow(dx,2) + Math.pow(dy,2));

    //if the vector length is smaller than the two radiis, the circles are intersecting/touching 
    if (d < o1.r+o2.r){
        let nx = dx / d;  // Compute iegen vectors
        let ny = dy / d;
        let s = o1.r + o2.r - d; //calculates the amount of overlap that has occured
        o1.x -= nx * s/2;  // Move first object by half of the overlap size, in the direction opposite of the other ball
        o1.y -= ny * s/2;
        o2.x += nx * s/2;  // Move second object by half of the overlap size, in the direction opposite of the first ball
        o2.y += ny * s/2;

        let k = -2 * ((o2.vx - o1.vx) * nx + (o2.vy - o1.vy) * ny) / (1/o1.m + 1/o2.m); //magic, with vectors and stuff
        o1.vx -= k * nx / o1.m;  // Same as before, just added "k" and switched to "m" instead of "s/2"
        o1.vy -= k * ny / o1.m;
        o2.vx += k * nx / o2.m;
        o2.vy += k * ny / o2.m;
    }
}

//Collision between boxes
function checkBoxCollision(object1, object2){
    //if an object is static, then they will never collide.
    //It also matters if both objects are dynamic, as the forces need to be calculated.
    //two dynamic objects have not been added yet
    if (object1.moveable && object2.moveable){
        o1 = object1;
        o2 = object2;
    }
    else if (object1.moveable){
        o1 = object1;
        o2 = object2;
    }
    else if (object2.moveable){
        o1 = object2;
        o2 = object1;
    }
    else{
        return;
    }
    //value for the total intersection of the objects
    let intersectionX = 0;
    let intersectionY = 0;
    //checks if object 1 exists somewhere inside object 2 in the y plane, AND in the x plane
    if ((o1.y+o1.height > o2.y && o1.y < o2.y+o2.height) && (o1.x+o1.width > o2.x && o1.x<o2.x+o2.width)){
        // if both are true, the objects have collided/intersected, and we can continue

        //now we check which plane has the most intersection, resolving a collision in the plane with the most intersection:
        intersectionX = (o1.x < o2.x)? o1.x+o1.width - o2.x : o2.x+o2.width - o1.x;
        intersectionY = (o1.y < o2.y)? o1.y+o1.height - o2.y : o2.y+o2.height - o1.y;
        if (intersectionY > intersectionX){
            //collision with o2 to the left of o1
            if (o1.x > o2.x){
                o1.x = o2.x + o2.width;
            }
            //collision with o2 to the right of o1
            else{
                o1.x =  o2.x - o1.width;
            }
            o1.fx = 0;
            o1.ax = 0;
            o1.vx = 0;
            keyLock = false;
        }
        else{
            //collision with o2 being below o1:
            if (o1.y < o2.y){
                o1.y = o2.y - o1.height;
                onPlatform =true;
            }
            //collision with o2 being above o1.
            else{
                o1.y = o2.y + o2.height;
            }
            o1.fy = 0;
            o1.ay = 0;
            o1.vy = 0;
        }
    }
}

//every frame the collisions are checked, the objects are moved, and the objects are redrawn.
function updateSimulation() {
    simulationArea.clear(); //clear canvas, removing everything
    onPlatform = false;
    //go through every object in the objects array, and checking if they collide with one another, 
    if (objects.length > 1){
        for (let [i, o1] of objects.entries()) {
            for (let [j, o2] of objects.entries()) {
                if (i < j) { //this removes redundancy in the collision check. Helps with speed, especially if the objects are in the hundreds.
                    if (!boxCollision){
                        checkCollision(o1, o2);
                    }
                    else{
                        checkBoxCollision(o1, o2);
                        //if the object is on a platform, the code kinda breaks if you run through 
                    }
                }
            }
        }
    }
    for (let o of objects) {
        if(o.moveable){
            o.resolveEdgeCollision(); //checks if the object has collided with a wall
            o.newPos(); //calculate with speed, acceleration, force, etc, to find the new position of the object
        }
        o.draw(); //drawing it all anew
    }

    //for logging of data
    if (logData){
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
}

// charting of info, uses a library for data, currently broken
function chartData(){
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
}