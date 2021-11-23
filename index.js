const svg1 = document.querySelector("#trePaaRad");

d3.select(svg1).append("rect").attr("width",60).attr("height",60).attr("fill","lightgray").attr("x",20).attr("y",20).attr("stroke","black")
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
