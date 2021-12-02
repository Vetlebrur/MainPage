svgWindow = document.querySelector("#mainSvg");
console.log(1)
d3.select(svgWindow).append("rect").attr("width", 1000).attr("height", 700).attr("fill","skyblue");
d3.select(svgWindow).append("rect").attr("y",700).attr("width", 1000).attr("height", 300).attr("fill","green");

d3.select(svgWindow).append("circle").attr("id","bird").attr("cx",500).attr("cy",500).attr("r",50).attr("fill","yellow");

d3.select(svgWindow).append("svg").attr("id","sjekk");

var holeStart = Math.floor(Math.random() * 400) + 200;
var holeEnd = (holeStart + 300);
var a = 0;
function falling(){
    d3.select("#bird").transition().duration(700).ease(d3.easeQuadIn).attr("cy",1000).on("end",falling);
}

d3.select(svgWindow).append("rect").attr("id","pipeTop");
d3.select(svgWindow).append("rect").attr("id","pipeBottom");

function pipeMove(){

    holeStart = Math.floor(Math.random() * 400) + 200;
    holeEnd = (holeStart + 300);
    d3.select("#pipeTop")
    .attr("x",1100).attr("y",0)
    .attr("width", 150).attr("height", holeStart)
    .attr("fill","lime").attr("stroke","black").attr("stroke-width",10);
    d3.select("#pipeBottom")
    .attr("x",1100).attr("y",holeEnd)
    .attr("width", 150).attr("height", 700)
    .attr("fill","lime").attr("stroke","black").attr("stroke-width",10);

    
    d3.select("#pipeTop")
    .transition().duration(2500).ease(d3.easeLinear).attr("x",-200)
    d3.select("#pipeBottom")
    .transition().duration(2500).ease(d3.easeLinear).attr("x",-200)
    .on("end",pipeMove);
}

function checkCollision(){
    let yBird = d3.select("#bird").attr("cy");

    let xPipe = d3.select("#pipeTop").attr("x");
    
    document.getElementById("trueSpan").innerHTML = "utenfor hullet:"+((yBird <= holeStart+50) || (yBird >= holeEnd-50));
    document.getElementById("falseSpan").innerHTML = "utenfor pipe:"+((300 < xPipe) && (xPipe < 550));
    document.getElementById("xbirdSpan").innerHTML = "x av fugl:"+500;
    document.getElementById("ybirdSpan").innerHTML = "y av fugl:"+Math.floor(yBird);
    document.getElementById("xpipeSpan").innerHTML = "x av pipe:"+Math.floor(xPipe);    

    if (yBird >= 950){
        fail();
    }

    if ( ( (yBird < holeStart+50) || (yBird > holeEnd-50) ) && ( (300 < xPipe) && (xPipe < 550)) ){
        fail();
    }
    a += 1;
    document.getElementById("collisionSpan").innerHTML = a;
    d3.select("#sjekk").transition().duration(1).on("end",checkCollision);
}

document.body.onkeydown = function(e){
    if(e.keyCode == 13){
        d3.select("#bird").attr("cy",500)
        pipeMove();
        falling();
        checkCollision(); 
    }
    else if(e.keyCode == 32){
        let yVerdi = d3.select("#bird").attr("cy");
        d3.select("#bird").interrupt()
        .transition().duration(300).ease(d3.easeQuadOut).attr("cy",(yVerdi-150)).on("end",falling);
       
    }
}

function fail(){
    d3.select("#bird").interrupt();
    d3.select("#pipeTop").interrupt();
    d3.select("#pipeBottom").interrupt();
}