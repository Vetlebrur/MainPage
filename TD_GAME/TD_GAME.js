//settings
var framesPerSecond = 60;
var time = 0;
var absolutePercent = 0;
var relativePercent = 0;

var enemySpeed = 10;
var enemyHealth = 40;
var enemySize = 55;
var enemyColor = "red";

var towerDamage = 10;
var towerAtkSpeed = 5;
var towerSize = 20;
var towerRange = 200;

var pathPoints = "M 100 0 L 100 350 300 350 300 100 500 100 500 350 700 350 700 100 900 100";
var pathThickness = 50;
var pathColor = "grey";

var enemies = [];
var towers = [];
var projectiles = [];

var playerHp = 100;
var playerMoney = 500;

var screen ={
    canvas : document.createElement("canvas"),
    start : function() {
        this.canvas.width = 1000;
        this.canvas.height = 600;
        this.context = this.canvas.getContext("2d");
        document.getElementById("screen").insertBefore(this.canvas, document.getElementById("screen").childNodes[0]);
        this.interval = setInterval(renderFrame, 1000/framesPerSecond);
    },
    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}





class enemy{
    constructor(speed, radius, color, health){
        this.index = enemies.length;

        this.hp = health;
        this.clr = color;
        this.r = radius;
        this.spd = speed;

        this.percent = 0;
        this.track = 0;

        this.x = 100;
        this.y = 0; 
        this.t = 0;
    }
    draw(){
        let ctx = screen.context;
        ctx.fillStyle = this.clr;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }
    move(){
        let xy = [];
        let relativePercent;
        switch (true){
            case (this.percent < 25):
                relativePercent = this.percent / 24;
                xy = getLineXYatPercent({x: 100,y: 0}, {x: 100,y: 350}, relativePercent);
                break;
            case (this.percent < 50):
                relativePercent = (this.percent - 25) / 24
                xy = getLineXYatPercent({x: 100,y: 350}, {x: 300,y: 350}, relativePercent);
                break;
            case (this.percent < 75):
                relativePercent = (this.percent - 50) / 24
                xy = getLineXYatPercent({x: 300,y: 350}, {x: 300,y: 100}, relativePercent);
                break;
            case (this.percent < 100):
                relativePercent = (this.percent - 75) / 25
                xy = getLineXYatPercent({x: 300,y: 100}, {x: 500,y: 100}, relativePercent);
                break;
            case (this.percent < 125):
                relativePercent = (this.percent - 100) / 25
                xy = getLineXYatPercent({x: 500,y: 100}, {x: 500,y: 350}, relativePercent);
                break;
            case (this.percent < 150):
                relativePercent = (this.percent - 125) / 25
                xy = getLineXYatPercent({x: 500,y: 350}, {x: 700,y: 350}, relativePercent);
                break;
            case (this.percent < 175):
                relativePercent = (this.percent - 150) / 25
                xy = getLineXYatPercent({x: 700,y: 350}, {x: 700,y: 100}, relativePercent);
                break;
            case (this.percent < 200):
                relativePercent = (this.percent - 175) / 25
                xy = getLineXYatPercent({x: 700,y: 100}, {x: 900,y: 100}, relativePercent);
                break;
            default:
                return;
        }
        this.x = xy[0];
        this.y = xy[1]; 
        this.percent += (this.percent<200)? 0.5 : 0;

    }
    checkStatus(){
        if(this.hp <= 0){
            enemies.splice(this.index,1);

            for (let en of enemies) {
                if (en.index>this.index){
                    en.index--;
                }
            }
            return false;
        }
        return true;
    }
}

document.addEventListener("keydown", (event) => {
    if (event.keyCode === 49) {
      createEnemy("runner");
    }
  });

function createEnemy(name){
    let enemyType;
        switch (name){
            case ("runner"):
                enemyType = new enemy(20, 10, "brown", 20);
                break;
            case ("tank"):
                enemyType = new enemy(5, 30, "green", 100);
                break;
            case ("joe"):
                enemyType = new enemy(10, 20, "red", 40);
                break;
            default:
                console.log("error: unkown enemy");
                return;
        }
    enemies.push(enemyType);
}

class tower{
    constructor (x,y,radius,color,attack,atkSpeed,range){
        this.index = towers.length;

        this.x = x;
        this.y = y;
        this.r = radius;
        this.clr = color;

        this.dmg = attack;
        this.spd = atkSpeed;
        this.rng = range;

        this.cooldown = 0;
        this.loaded = true;
        
    }
    draw(){
        //range
        let range = screen.context;
        range.fillStyle = "#aaaaaaaa";
        range.beginPath();
        range.arc(this.x, this.y, this.rng, 0, Math.PI*2, true);
        range.closePath();
        range.fill();
        //tower
        let ctx = screen.context;
        ctx.fillStyle = this.clr;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();

    }
    shoot(){
        //checks if an enemy is inside the range of the tower
        for (let en of enemies){
            let dx = this.x - en.x;
            let dy = this.y - en.y;
            let d = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2))

            if (d<this.rng){
                //enemy is in the tower's range. So we try to fire

                if (this.loaded){
                    //we fire a bullet towards the enemy
                    this.loaded = false;
                    this.cooldown = this.spd*100;
                    console.log(this.cooldown)
                    setTimeout(() => {this.loaded = true}, this.cooldown)



                    let bullet = new projectile(this.index, en.index, this.dmg)
                    projectiles.push(bullet)

                    console.log("bang");

                }

                return;

            }
            
        }

    }
    checkStatus(){
        if(this.loaded){
            return true;
        }
        return false;
    }
}



screen.canvas.addEventListener("click", (event) => {
    let xCoor = event.offsetX;
    let yCoor = event.offsetY;
    createTurret("machineGun",xCoor,yCoor);
    
});

function createTurret(name,x,y){
    let turret;
    switch(name){
        case ("machineGun"):
            turret = new tower(x, y, 30, "grey", 5, 2, 150);
            break;

        case ("sniper"):
            turret = new tower(x, y, 25, "grey", 30, 20, 400);
            break;

        case ("noe"):
            turret = new tower(x, y, 30, "grey", 5, 2, 150);
            break;

        default:
            console.log("error: unkown enemy");
            return;
    }
    towers.push(turret);
}


class projectile {
    constructor(towerIndex, enemyIndex,damage){
        this.index = projectiles.length;

        this.tow = towers[towerIndex];
        this.ene = enemies[enemyIndex];
        this.x = this.tow.x;
        this.y = this.tow.y;
        this.clr = "black";

        this.r = 5;
        this.dmg = damage;

        this.percent = 0;


    }
    move(){
        this.percent += 0.1;
        let xy = getLineXYatPercent({x: this.tow.x, y: this.tow.y}, {x: this.ene.x, y: this.ene.y}, this.percent);
        this.x = xy[0];
        this.y = xy[1];

    }
    draw(){
        let ctx = screen.context;
        ctx.fillStyle = this.clr;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, Math.PI*2, true);
        ctx.closePath();
        ctx.fill();
    }
    hit(){
        let dx = this.x-this.ene.x;
        let dy = this.y - this.ene.y;
        let d = Math.sqrt(Math.pow(dx,2)+Math.pow(dy,2))
        if (d<this.r+this.ene.r){

            this.ene.hp -= this.dmg;
            

            projectiles.splice(this.index,1);
            for (let pr of projectiles) {
                if (pr.index>this.index){
                    pr.index--;
                }
            }

            return true;
        }
        else {
            return false;
        }
    }
}

class track{
    constructor(path, girth, color){
        this.path = path;
        this.width = girth;
        this.color = color;
    }
    draw(){
        let ctx = screen.context;
        let p = new Path2D(pathPoints);
        ctx.beginPath();
        ctx.lineWidth = this.width;
        ctx.strokeStyle = this.color;
        ctx.stroke(p);

    }
}


function renderFrame() {
    screen.clear();
    levelTrack.draw();
    

    for (let to of towers){
        let loaded = to.checkStatus();
        if (loaded){
            to.shoot()
            
        }
        to.draw()
    }
    

    for (let en of enemies){
        let alive = en.checkStatus();
        if (alive){
            en.move();

            en.draw();
        }
    }

    for (let pr of projectiles){
        let collided = pr.hit();
        if (!collided){
            pr.move();

            pr.draw();
        } 
    }
    
    time++;
}

screen.start();
createTurret("sniper");
createEnemy("tank");
createEnemy("normal")


var levelTrack = new track(pathPoints, pathThickness, pathColor);
var redEnemy = new enemy(enemySpeed, enemySize, enemyColor ,enemyHealth);
var blueTower = new tower(200,200, towerSize,"blue",towerDamage,towerAtkSpeed,towerRange);
enemies.push(redEnemy);
towers.push(blueTower);

renderFrame();


function getLineXYatPercent(startPt, endPt, percent) {
    let dx = endPt.x - startPt.x;
    let dy = endPt.y - startPt.y;
    let X = startPt.x + dx * percent;
    let Y = startPt.y + dy * percent;
    return [X,Y];
}
