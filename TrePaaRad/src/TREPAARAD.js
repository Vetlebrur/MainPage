const brettEl = document.querySelector("#spillBrett");
const tur = document.querySelector("#identitetAvSpiller")
var rute = [
    "","","",
    "","","",
    "","","",
]
var scoreX = 0;
var scoreO = 0;
var ferdigBrett = false;

var turVelger = 0;
function plasser(felt){
    if (ferdigBrett){
        alert("no")
    }
    else{
        if (rute[felt.rowIndex] == ""){
            if (turVelger === 0){
                turVelger++;

                d3.select("#rute"+(felt.rowIndex+1).toString())
                .append("svg")
                .attr("viewBox", "0 0 10 10").attr("width","100%").attr("height","100%")
                .append("polyline")
                .attr("points","1,1 9,9 5,5 1,9 9,1 5,5 1,1").attr("stroke","black").attr("stroke-width",2);
                
                rute[felt.rowIndex] = "X";
                sjekkPosisjon(rute[felt.rowIndex]);
                tur.innerHTML = "O";
            }
            else{
                turVelger--;
                
                d3.select("#rute"+(felt.rowIndex+1).toString())
                .append("svg").attr("viewBox", "-5 -5 10 10").attr("width","100%").attr("height","100%")
                .append("circle")
                .attr("fill","none").attr("stroke","black").attr("stroke-width",1).attr("r",4);

                rute[felt.rowIndex] = "O";
                sjekkPosisjon(rute[felt.rowIndex]);
                tur.innerHTML = "X";
            }
        }
        else{
            alert("no")
        }
    }
}


function resetBrett(){
    
    for (let i = 1; i < 10; i++) {
        let ruteBit = document.getElementById("rute"+i.toString());
        if (ruteBit.children[0] instanceof SVGElement){
            let yes = ruteBit.removeChild(ruteBit.children[0]);
        }
    }
    tur.innerHTML = "X";
    turVelger = 0;
    ferdigBrett = false;
    rute = [
        "","","",
        "","","",
        "","",""
    ]
}


function sjekkPosisjon(i){
    if ((rute[0]==i && rute[1]==i && rute[2]==i)||(rute[3]==i && rute[4]==i && rute[5]==i)||(rute[6]==i && rute[7]==i && rute[8]==i)){
        alert(i+" vant!")
        updatescore(i);
        ferdigBrett=true;
    }
    else if ((rute[0]==i && rute[3]==i && rute[6]==i)||(rute[1]==i && rute[4]==i && rute[7]==i)||(rute[2]==i && rute[5]==i && rute[8]==i)){
        alert(i+" vant!")
        updatescore(i)
        ferdigBrett=true;
        
    }
    else if ((rute[0]==i && rute[4]==i && rute[8]==i)||(rute[6]==i && rute[4]==i && rute[2]==i)){
        alert(i+" vant!")
        updatescore(i)
        ferdigBrett=true;

    }
    else if (rute[0] != "" && rute[1] != "" && rute[2] != "" && rute[3] != "" && rute[4] != "" && rute[5] != "" && rute[6] != "" && rute [7] != "" && rute[8] != ""){
        alert("ingen vant!")
        ferdigBrett=true;
    }
}

function updatescore(i){
    if (i==="X"){
        scoreX +=1;
        document.getElementById("xScore").innerText =scoreX;
    }
    else{
        scoreO +=1;
        document.getElementById("oScore").innerText =scoreO;
        
    }
}