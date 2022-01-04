t=[];
for(i=0;i<11;i++){
    r=[];
    for(j=0;j<11;j++){
        r.push(j*i)
    }
        t.push(r)
}

let personer = [["Hans",12],["Nils",3],["Sofie",5]]


function sortAlphabet(array){
    console.log(array);
    array.sort(function(a, b){
        var elementA = a[0].toLowerCase();
        var elementB = b[0].toLowerCase();
        if (elementA < elementB) {
            return -1;
          }
          if (elementA > elementB) {
            return 1;
          }
        
          // names must be equal
          return 0;
        });
    console.log(array);
}





function sorter(type){
    for (let i = 0; i < trekanter.length; i++) {
        trekanter[i].style.transform = "rotate(0deg)";
    }

    var indexAvTypen = type.cellIndex;
    var switched = true;
    var rows = tableEl.rows;

    if (stigende == false){
        trekanter[indexAvTypen].style.transform = "rotate(0deg)";
        stigende = true;

        while (switched == true) { 
            switched = false;

            for (i = 1; i < (rows.length - 1); i++) { 

                var x = rows[i].children[indexAvTypen];
                var y = rows[i+1].children[indexAvTypen];

                if (indexAvTypen === 0){

                    if (x.id < y.id){
                        tableEl.insertBefore(rows[i+1], rows[i]);
                        switched = true;
                    }

                }
                else{

                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()){
                        tableEl.insertBefore(rows[i+1], rows[i]);
                        switched = true;
                    }
                }
            }
        }
    }
    else{
        trekanter[indexAvTypen].style.transform = "rotate(180deg)";
        stigende = false;

        while (switched == true) { 
            switched = false;

            for (i = 1; i < (rows.length - 1); i++) { 

                var x = rows[i].children[indexAvTypen];
                var y = rows[i+1].children[indexAvTypen];

                if (indexAvTypen ===0 ){

                    if (x.id > y.id){
                        tableEl.insertBefore(rows[i+1], rows[i]);
                        switched = true;
                    }

                }

                else{

                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()){
                        tableEl.insertBefore(rows[i+1], rows[i]);
                        switched = true;
                    }
                }
            }
        }
    }
}
function compareAge(a,b){
    if (a[1]<b[1]) {
        return 1;   
    }
    else if (a[1]>b[1]){
        return -1;
    }
    else{
        return 0;
    }

}


