
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



// class Collision {
//     constructor(o1, o2, dx, dy, d) {
//         this.o1 = o1;
//         this.o2 = o2;

//         this.dx = dx;
//         this.dy = dy;
//         this.d = d;
//     }
// }

var redGamePiece, yellowGamePiece;

function startGame() {
    redGamePiece = new circle(100, 100, 50, 100, "red");
    yellowGamePiece = new circle(500, 100, 50, 1000,"yellow");    
    myGameArea.start();
}

var myGameArea = {
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 800;
        this.canvas.height = 700;
        this.context = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
        this.interval = setInterval(updateSimulation, 20);
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
    
        this.ax = 0;
        this.ay = 0;
        this.vx = 3;
        this.vy = 0; 
        this.fx = 0;
        this.fy = 9.81*this.m;
    }
    draw(){
        var ctx = myGameArea.context;
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }
    newPos(){
            this.ax = this.fx/(50*this.m);
            this.ay = this.fy/(50*this.m);
            this.vx += this.ax;
            this.vy += this.ay;
            this.x += this.vx;
            this.y += this.vy;
    }

    resolveEdgeCollision(){
        // Detect collision with right wall.
        if (this.x + this.r > myGameArea.canvas.width) {
            // Need to know how much we overshot the canvas width so we know how far to 'bounce'.
            this.x = myGameArea.canvas.width - this.r;
            this.vx = -this.vx;
            this.ax = -this.ax;
        }

        // Detect collision with bottom wall.
        else if (this.y + this.r > myGameArea.canvas.height) {
            this.y = myGameArea.canvas.height - this.r;
            this.vy = -this.vy;
            //this.ay = -this.ay;
        }

        // Detect collision with left wall.
        else if (this.x - this.r < 0) {
            this.x  = this.r;
            this.vx = -this.vx;
            this.ax = -this.ax;
        }
        // Detect collision with top wall.
        else if (this.y - this.r < 0) {
            this.y = this.r;
            this.vy = -this.vy;
            this.ay = -this.ay;
        }

    }
}

function checkcollision(o1,o2){
    

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
    myGameArea.clear();

    redGamePiece.resolveEdgeCollision();
    yellowGamePiece.resolveEdgeCollision();

    redGamePiece.newPos();
    yellowGamePiece.newPos();


    checkcollision(redGamePiece,yellowGamePiece);
    redGamePiece.draw();
    yellowGamePiece.draw();
}

// document.body.onkeydown = function(e){
//     if(e.keyCode == 13){
//         move(frameTime)
//         box.fillRect(x,y,80,150);
//     }
// }
// for(let i = 0; i<60; i++){
//     move(frameTime);
//     box.fillRect(x,y,80,150);
function animate() {
    ctx.clearRect(0, 0, myGameArea.canvas.width, myGameArea.canvas.height);

    for (let o of objects) {
        o.resolveEdgeCollision();
    }
    let collisions = [];
    for (let [i, o1] of objects.entries()) {
        for (let [j, o2] of objects.entries()) {
            if (i < j) {
                let {collisionInfo, collided} = checkCollision(o1, o2);
                if (collided) {
                    collisions.push(collisionInfo);
                }
            }
        }
    }

    for (let col of collisions) {
        currentCollisionType(col)  // resolveCollision(col)
    }
    for (let o of objects) {
        o.draw();
    }
    window.requestAnimationFrame(animate);
}