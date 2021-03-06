//player settings
var playerHp = 100;
var playerMoney = 1000;

//settings
var framesPerSecond = 60;
var selectedTower = 0;

var pathPoints =[
[1,0],[1,1],[1,2],[1,3],[1,4],[1,5],[1,6],[2,6],[3,6],[4,6],[4,5],[4,4],
[4,3],[4,2],[4,1],[5,1],[6,1],[7,1],[7,2],[7,3],[7,4],[7,5],[7,6],[8,6],
[9,6],[10,6],[10,5],[10,4],[10,3],[10,2],[10,1],[11,1],[12,1],[13,1],
[13,2],[13,3],[13,4],[13,5],[13,6],[12,6],[11,6],[10,6],[10,5],[10,4],
[10,3],[10,2],[10,1],[11,1],[12,1],[13,1],[13,2],[13,3],[13,4],[13,5],
[13,6],[14,6],[15,6],[16,6],[16,5],[16,4],[16,3],[16,2],[16,1],[17,1],
[18,1],[19,1],[20,1]];

//creating arrays for objects
var enemies = [];
var towers = [];
var projectiles = [];
var buttons = [];
var path = [];



document.addEventListener("keydown", (event) => {
    let key = event.keyCode;
    switch(key){
        case 13: // enter button
            screen.start(); 
            break;
         case 49: // 1 key
            createEnemy("runner"); 
            break;
        case 50: // 2 key
            createEnemy("tank");
            break;
        case 51: // 3 key
            createEnemy("joe");
            break;
        default:
            console.log("Error: unknown enemy")
            return;
    }
});

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
    constructor(speed, radius, color, health, value){
        this.index = enemies.length;

        this.hp = health;
        this.clr = color;
        this.r = radius;
        this.spd = speed;
        this.value = value;

        this.percent = 0;
        this.track = 0;
        this.reachedEnd = false;

        this.x = pathPoints[0][0]*50+25;
        this.y = pathPoints[0][1]*50+25; 
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
        if (this.percent >= 100){
            this.percent = 0;
            this.track += 1;
            if (this.track == pathPoints.length-1){
                this.reachedEnd = true;
                return;
            
            }
        }

        if (pathPoints[this.track][1] == pathPoints[this.track+1][1]){ // means the change in direction is not downward or upward
            this.x = (pathPoints[this.track][0] < pathPoints[this.track+1][0])? this.percent*0.5 : this.percent*-0.5;
            this.x += pathPoints[this.track][0]*50 +25;
        }
        else if (pathPoints[this.track][0] == pathPoints[this.track+1][0]){ //means that the path travels downwards, since no change in x value
            this.y = (pathPoints[this.track][1] < pathPoints[this.track+1][1])? this.percent*0.5 : this.percent*-0.5;
            this.y += pathPoints[this.track][1]*50 +25;
        }
        else{
            console.log("error: path error");
        }
        this.percent+= this.spd;
    }
    checkStatus(){
        if(this.hp <= 0){
            playerMoney += this.value;

            enemies.splice(this.index,1);
            for (let en of enemies) {
                if (en.index>this.index){
                    en.index--;
                }
            }
            return false;
        }
        else if (this.reachedEnd){
            playerHp -= 1;

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

function createEnemy(name){
    let enemyType;
        switch (name){
            case ("runner"):
                enemyType = new enemy(20, 10, "brown", 20, 10);
                break;
            case ("tank"):
                enemyType = new enemy(5, 30, "green", 100, 50);
                break;
            case ("joe"):
                enemyType = new enemy(10, 20, "red", 40, 100);
                break;
            default:
                console.log("error: unkown enemy");
                return;
        }
    enemies.push(enemyType);
}

class tower{
    constructor (x, y, radius, color, damage, atkSpeed, range, cost){
        this.index = towers.length;

        this.x = x;
        this.y = y;
        this.r = radius;
        this.clr = color;
        this.cost = cost;

        this.dmg = damage;
        this.spd = atkSpeed;
        this.rng = range;

        this.loaded = true;
    }
    draw(){
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
                    this.loaded = false; // Gun is no longer loaded

                    setTimeout(() => {this.loaded = true}, this.spd*100) // make it loaded after a short while

                    let bullet = new projectile(this.index, en.index, this.dmg) // create the projectile, travelling from the tower to the selected enemy
                    projectiles.push(bullet)
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
    if (yCoor<370){
        createTurret(selectedTower,xCoor,yCoor);
    }
    for (let btn of buttons){
        if ((xCoor > btn.x && xCoor<(btn.x+btn.width)) && (yCoor > btn.y && yCoor<(btn.y+btn.height))){
            selectedTower = btn.towerSelect;
            console.log(`selected tower: ${selectedTower}`)
        }
    }
});

function createTurret(name,x,y){
    let turret;
    switch(name){
        case ("machineGun"):
            turret = new tower(x, y, 30, "grey", 5, 2, 150, 200);
            break;
        case ("sniper"):
            turret = new tower(x, y, 25, "green", 30, 20, 10000, 400);
            break;
        case ("laser"):
            turret = new tower(x, y, 30, "red", 1, 0.1, 150, 150);
            break;
        default:
            console.log("error: unkown enemy");
            return;
    }
    for (otherTurret of towers){ // checks if other turrets are occupying the space
        let dx = turret.x - otherTurret.x;
        let dy = turret.y - otherTurret.y;
        let d = Math.sqrt(Math.pow(dy,2)+Math.pow(dx,2));
        console.log(otherTurret.r + turret.r)
        if ((d<(otherTurret.r + turret.r))){
            console.log("error: not enough space");
            return; // not enough space
        }
    }
    for (let tiles of path){
        if (!(turret.x + turret.r < tiles.x || turret.x - turret.r > tiles.x + tiles.width)){
            if (!(turret.y + turret.r < tiles.y || turret.y - turret.r > tiles.y + tiles.height)){
                console.log(`error: intersecting path with tile nr: ${path.indexOf(tiles)}`);
                return;
            }
        }
    }
    if ((turret.cost <= playerMoney)){
        playerMoney-=turret.cost;
        towers.push(turret);
    }
    else{
        console.log("error: not enough money to buy turret");
        return;
    }
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
        let dx = this.ene.x - this.tow.x;
        let dy = this.ene.y - this.tow.y;
        this.x = this.tow.x + dx * this.percent;
        this.y = this.tow.y + dy * this.percent;
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

class pathPart{
    constructor(x,y){
        this.x = x*50;
        this.y = y*50;
        this.width = 50;
        this.height = 50;
        this.clr = "grey";
    }
    draw(){
        let ctx = screen.context;
        ctx.beginPath();
        ctx.fillStyle = this.clr;
        ctx.fillRect(this.x,this.y,this.width, this.height);
    }
}

class towerSelect {
    constructor(){
        this.x = 0;
        this.y = 400;
        this.height = this.y - screen.canvas.height;
        this.width = 1000;
        this.background = "brown";
    }
    draw(){
        let ctx = screen.context;
        ctx.beginPath();
        ctx.fillStyle = this.background;
        ctx.fillRect(this.x,this.y,this.width, this.height);
    }
}


class button {
    constructor(tower){
        this.clr = "white";
        this.towerSelect = tower;

        this.x = 20+(70*buttons.length);
        this.y = 420;
        this.width = 50;
        this.height = 50;
    }
    draw(){
        let ctx = screen.context;
        ctx.beginPath();
        ctx.fillStyle = this.clr;
        ctx.fillRect(this.x,this.y,this.width, this.height);
    }
}
function createButton(towerType){
    let newButton = new button(towerType)
    buttons.push(newButton);
}

//Creation of all objects on startup
for (let i = 0; i < pathPoints.length; i++) {
    let pathpart = new pathPart(pathPoints[i][0],pathPoints[i][1]);
    path.push(pathpart);
}
var text = {
    draw: function () {
        let hp = `HP: ${playerHp}`;
        let money = `$: ${playerMoney}`;
        let ctx = screen.context;
        ctx.font = "30px Arial";
        ctx.fillStyle = "black";
        ctx.fillText(hp, 850, 500);
        ctx.fillText(money, 850, 550);
    }
}
var towerMenu = new towerSelect();
createButton("machineGun");
createButton("sniper")
createButton("laser")

function renderFrame() { //clears the screen, and draws the objects anew
    screen.clear();
    towerMenu.draw()

    path.forEach(pathTile => pathTile.draw());

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
    buttons.forEach(btn => btn.draw());

    text.draw();
}