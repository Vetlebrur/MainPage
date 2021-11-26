//bilde 1
const svg1 = document.querySelector("#trePaaRad");

d3.select(svg1).append("rect").attr("width",60).attr("height",60).attr("fill","lightgray").attr("x",20).attr("y",20).attr("stroke","black");

d3.select(svg1).append("line").attr("stroke","black").attr("stroke-width",2).attr("x1",20).attr("y1",40).attr("x2",80).attr("y2",40);
d3.select(svg1).append("line").attr("stroke","black").attr("stroke-width",2).attr("x1",20).attr("y1",60).attr("x2",80).attr("y2",60);
d3.select(svg1).append("line").attr("stroke","black").attr("stroke-width",2).attr("x1",40).attr("y1",20).attr("x2",40).attr("y2",80);
d3.select(svg1).append("line").attr("stroke","black").attr("stroke-width",2).attr("x1",60).attr("y1",20).attr("x2",60).attr("y2",80);

d3.select(svg1).append("line").attr("stroke","black").attr("stroke-width",2).attr("x1",24).attr("y1",24).attr("x2",36).attr("y2",36);
d3.select(svg1).append("line").attr("stroke","black").attr("stroke-width",2).attr("x1",36).attr("y1",24).attr("x2",24).attr("y2",36);

d3.select(svg1).append("line").attr("stroke","black").attr("stroke-width",2).attr("x1",64).attr("y1",64).attr("x2",76).attr("y2",76);
d3.select(svg1).append("line").attr("stroke","black").attr("stroke-width",2).attr("x1",76).attr("y1",64).attr("x2",64).attr("y2",76);

d3.select(svg1).append("circle").attr("cx",50).attr("cy",50).attr("r",7).attr("fill","none").attr("stroke","black").attr("stroke-width",2);
d3.select(svg1).append("circle").attr("cx",30).attr("cy",70).attr("r",7).attr("fill","none").attr("stroke","black").attr("stroke-width",2);
d3.select(svg1).append("circle").attr("cx",70).attr("cy",50).attr("r",7).attr("fill","none").attr("stroke","black").attr("stroke-width",2);


//bilde 2
const svg2 = document.querySelector("#omMeg");

d3.select(svg2).append("rect").attr("id","himmel").attr("width",100).attr("height",70).attr("fill","skyblue");
d3.select(svg2).append("rect").attr("y",70).attr("width",100).attr("height",30).attr("fill","#348C31");
d3.select(svg2).append("circle").attr("id","sol").attr("cx",20).attr("cy",30).attr("r",10).attr("fill","yellow");
d3.select(svg2).append("circle").attr("id","maane").attr("cx",-80).attr("cy",30).attr("r",10).attr("fill","lightgray");
d3.select(svg2).append("rect").attr("y",60).attr("x",45).attr("width",10).attr("height",20).attr("fill","brown");
d3.select(svg2).append("path").attr("d","M30 60 70 60 50 30").attr("fill","green");
d3.select(svg2).append("path").attr("d","M32 50 68 50 50 20").attr("fill","green");
d3.select(svg2).append("path").attr("d","M34 40 66 40 50 10").attr("fill","green");



svg2.addEventListener("mouseover",svg2ani);

function svg2ani(){
    d3.select("#sol")
    .transition().ease(d3.easeLinear).duration(1500).attr("cx",120)
    .transition().duration(0).attr("cx",-80)
    .transition().ease(d3.easeLinear).duration(1500).attr("cx",20);
    

    d3.select("#maane")
    .transition().duration(0).attr("cx",-80)
    .transition().ease(d3.easeLinear).duration(1500).attr("cx",20)
    .transition().ease(d3.easeLinear).duration(1500).attr("cx",120)
    
    d3.select("#himmel")
    .transition().duration(1500).attr("fill","black")
    .transition().duration(1500).attr("fill","skyblue")
    .on('end', svg2ani);
}

svg2.addEventListener("mouseout",() =>{
    d3.select("#sol").interrupt()
    .attr("cx",20);
    d3.select("#maane").interrupt()
    .attr("cx",-80);
    d3.select("#himmel").interrupt()
    .attr("fill","skyblue");
});

//bilde 3
const svg3 = document.querySelector("#flappyBird");

d3.select(svg3).append("rect").attr("id","himmelFlappy").attr("width",100).attr("height",70).attr("fill","skyblue");
d3.select(svg3).append("rect").attr("y",70).attr("width",100).attr("height",30).attr("fill","#348C31");

d3.select(svg3).append("rect").attr("id","pipeTopp").attr("x",80).attr("y",0).attr("width",15).attr("height",30).attr("fill","lime");
d3.select(svg3).append("rect").attr("id","pipeBunn").attr("x",80).attr("y",60).attr("width",15).attr("height",60).attr("fill","lime");

d3.select(svg3).append("circle").attr("id","fugl").attr("cx",30).attr("cy",50).attr("r",5).attr("fill","yellow");


svg3.addEventListener("mouseover",svg3ani);
function svg3ani(){
    d3.select("#pipeTopp").transition().ease(d3.easeLinear).duration(700).attr("x",35);
    d3.select("#pipeBunn").transition().ease(d3.easeLinear).duration(700).attr("x",35);
}

svg3.addEventListener("mouseout",() =>{
    d3.select("#fugl").interrupt()
    .attr("cy",50);
    d3.select("#pipeBunn").interrupt()
    .attr("x",80);
    d3.select("#pipeTopp").interrupt()
    .attr("x",80);
});