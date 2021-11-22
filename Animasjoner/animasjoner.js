const svg1 = document.getElementById("animasjon1");
const svg2 = document.getElementById("animasjon2");
const svg3 = document.getElementById("animasjon3"); 
const svg4 = document.getElementById("animasjon4"); 

d3.select(svg1).append("circle").attr("id","sirkel1").attr("r", 25).attr("fill", "blue");


function animasjon1(){
    d3.select("#sirkel1")
    .transition().duration(1000).attr("fill","black").attr("r",10)
    .transition().duration(1000).attr("cy",200)

    .transition().duration(1000).attr("cy",0)
    .transition().duration(1000).attr("fill","blue").attr("r",25);

}

d3.select(svg2).append("path").attr("id","strek2").attr("stroke","black").attr("fill","none")
.attr("d","M5 10 L15 40 25 10 30 10 L30 40 50 40 30 25 L50 25 30 10 L50 10").attr("stroke-dasharray",210).attr("stroke-dashoffset",210);

function animasjon2(){
    d3.select("#strek2")
    .transition().duration(1000).attr("stroke-dashoffset",0).attr("stroke","blue")

    .transition().duration(1000).attr("stroke-dasharray",210).attr("stroke-dashoffset",210);




}

d3.select(svg3).append("rect").attr("width",100).attr("height",70).attr("fill","skyblue");
d3.select(svg3).append("rect").attr("y",70).attr("width",100).attr("height",30).attr("fill","green");
d3.select(svg3).append("circle").attr("id","sirkel3").attr("cx",50).attr("cy",30).attr("r",10).attr("fill","red");

function animasjon3(){
    d3.select("#sirkel3")
    .transition().ease(d3.easeQuadIn).duration(800).attr("cy",80)
    .transition().ease(d3.easeQuadOut).duration(700).attr("cy",40)
    .transition().ease(d3.easeQuadIn).duration(600).attr("cy",80)
    .transition().ease(d3.easeQuadOut).duration(500).attr("cy",50)
    .transition().ease(d3.easeQuadIn).duration(400).attr("cy",80)
    .transition().ease(d3.easeQuadOut).duration(300).attr("cy",60)
    .transition().ease(d3.easeQuadIn).duration(250).attr("cy",80)
    .transition().ease(d3.easeQuadOut).duration(200).attr("cy",70)
    .transition().ease(d3.easeQuadIn).duration(150).attr("cy",80)
    .transition().ease(d3.easeQuadOut).duration(100).attr("cy",75)
    .transition().ease(d3.easeQuadIn).duration(100).attr("cy",80);

}

//const circle4 = document.getElementById("circle4");

//document.getElementById("boks4").addEventListener('mousemove', animasjon4);

const circle4 = d3.select(svg4).on("mousemove",animasjon4)
.append("circle").attr("id","circle4")
.attr("r",5).attr("fill","violet").attr("stroke","cyan").attr("stroke-width",1);

function animasjon4(event){
    var coordinates = d3.pointer(event);
    var x = coordinates[0]
    var y = coordinates[1]
    document.getElementById("xVerdi").innerHTML = Math.round(x);
    document.getElementById("yVerdi").innerHTML = Math.round(y);
    d3.select("#circle4").attr("cx",x).attr("cy",y)
  
    
}