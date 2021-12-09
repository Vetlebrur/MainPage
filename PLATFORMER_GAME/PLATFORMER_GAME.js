const screenEl = document.querySelector("#screen");

//settings
const speed = 100;
const jump = 200;




//Main Box
const startPosition = [200,700];
var boxPositionX = startPosition[0];
var boxPositionY = startPosition[1];
var mainChar = d3.select(screenEl).append("rect").attr("id","mainCharacter")
.attr("width",100).attr("height",100)
.attr("x",-100).attr("y",startPosition[1])
.attr("fill","red").append("rect").attr("width",80).attr("height",20).attr("fill","black");

var platform, ground;



//The Start Button
var startButton = d3.select(screenEl).append("rect").attr("id","startButton")
.attr("width",400).attr("height",200)
.attr("x",600).attr("y",500)
.attr("fill","red").on("click",play);


var gameStarted = false;
function play(){
    d3.select("#startButton").attr("x",-400);
    d3.select("#mainCharacter")
    .attr("x",startPosition[0]).attr("y",startPosition[1]);

    gameStarted = true;

}
function restart(){
    boxPositionX = startPosition[0];
    boxPositionY = startPosition[1];
}



document.body.onkeydown = function(e){
    if (gameStarted){
        if(e.keyCode == 32){
            d3.select("#mainCharacter")
            .transition().duration(600).ease(d3.easeQuadOut)
            .attr("y",boxPositionY-jump)
            .transition().duration(600).ease(d3.easeQuadIn)
            .attr("y",boxPositionY);

        }
        else if(e.keyCode == 37){
            boxPositionX -= speed;
            d3.select("#mainCharacter")
            .transition().duration(100).ease(d3.easeLinear)
            .attr("x",boxPositionX);


        }
        else if(e.keyCode == 38){
            boxPositionY -= speed;
            d3.select("#mainCharacter")
            .transition().duration(100).ease(d3.easeLinear)
            .attr("y",boxPositionY);

        
        }
        else if(e.keyCode == 39){
            boxPositionX += speed;
            d3.select("#mainCharacter")
            .transition().duration(100).ease(d3.easeLinear)
            .attr("x",boxPositionX);

        
        }
        else if(e.keyCode == 40){
            boxPositionY += speed;
            d3.select("#mainCharacter")
            .transition().duration(100).ease(d3.easeLinear)
            .attr("y",boxPositionY);

        
        }
    }
}
// document.body.onkeyup = function(e){
//     if (gameStarted){
//         if(e.keyCode == 37){
//             boxPositionX -= speed;
//             d3.select("#mainCharacter")
//             .interrupt();
//         }
//         else if(e.keyCode == 38){
//             boxPositionY -= speed;
//             d3.select("#mainCharacter")
//             .interrupt();
//         }
//         else if(e.keyCode == 39){
//             boxPositionX += speed;
//             d3.select("#mainCharacter")
//             .interrupt();
//         }
//         else if(e.keyCode == 40){
//             boxPositionY += speed;
//             d3.select("#mainCharacter")
//             .interrupt();

//         }
//     }
// }
