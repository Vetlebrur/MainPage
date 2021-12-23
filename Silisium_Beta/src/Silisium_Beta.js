inputEl = document.querySelector("#formulaInput");
btnEl = document.querySelector("#button");
outputEl = document.querySelector("#formulaOutput");
const months =["january","february","march","april","may","june","july","august","september","october","november","december"];


document.body.onkeydown = function(e){
    if(e.keyCode == 13){
        btnEl.click();
    }
}

btnEl.addEventListener("click", ()=> {
    outputEl.innerHTML = "";
    let input = inputEl.value.toLowerCase();
    if(input == ""){
        alert("insert values");
    }
    else if ((input.includes("alert")) || (input.includes("console"))){
        alert("error");
    }
    else if(input.includes("(") && !input.includes("sq")){
        try{
            eval(input);
        }
        catch{
            alert("error");
            
        }
    }
    
    else if(months.some(v => input.includes(v))){
        doomsdayAlgorithm();
    }
    else{
        calculate(input);
    }
    
});

function calculate(equation){

    let items = {
        "twen":2,"thir":3,"fif":5,"eigh":8,"teen":"+10","zero":0,
        "one": 1,"two": 2,"three":3,"four":4,"five":5,"six":6,"seven":7,
        "eight":8,"nine":9,"ten":10,"eleven":11,"twelve":12,"ty":"*10+",
        "hundred":"*100","thousand":"*1000",

        " ":"","=":"","of":"","by":"","the":"","and":"+","plus":"+",
        "minus":"-","divided":"/","times":"*","power":"**","^":"**",
        "sqrt(":"Math.sqrt(","squareroot(":"Math.sqrt(",
    }

    let newEquation = equation;
    for (let i = 0; i < Object.keys(items).length; i++) {
        let word = Object.keys(items)[i];
        if (equation.includes(word)){
            newEquation = newEquation.replaceAll(word, items[word]);
        }
    }
    //alert(equation)
    //alert(newEquation)
    try {
        let solution = eval(newEquation); 
        outputEl.innerHTML = `${equation} = ${solution}`;
    }
    catch{
        alert("error");
    }
}




//The doomsday method for calculating all weekdays for any dates 
function doomsdayAlgorithm(){
    let date = inputEl.value.toLowerCase().replaceAll(" ","").replaceAll("date","")
    .replaceAll("nd","").replaceAll("rd","").replaceAll("th","").replaceAll("of","");
    var day, specialDay, weekDay, dayOfWeek, year, month, leapYear, century;

    //year
    year = Number(date.slice(-4));

    //month
    for (let i = 0; i < months.length; i++) {
        let candidateMonth = months[i];
        if (date.includes(candidateMonth)){
            month = candidateMonth;
        }  
    }

    //day
    day = Number(date.slice(0,2));
    if (day){
    }
    else{
        day = Number(date.slice(0,1));
    }

    //leap Year
    if (year%4 == 0){
        leapYear = true;
    }
    else{
        leapYear = false;
    }

    //Doomsday of each year
    century = Math.floor(year/100);
    
    if (century%4 == 0){
        weekDay = 2;
    }
    else if (century%4 == 1){
        weekDay = 0;
    }
    else if (century%4 == 2){
        weekDay = 5;
    }
    else if (century%4 == 3){
        weekDay = 3;
    }

    weekDay +=(year%100);
    weekDay += ((year%100)/4);
    weekDay = weekDay%7;
    weekDay = Math.floor(weekDay);
    
    //doomsday of each month
    switch (month){
        case "january":
            if (leapYear){
                specialDay = 4;
            }
            else{
                specialDay = 3;
            }

            break;

        case "february":
            if (leapYear){
                specialDay = 29;
            }
            else{
                specialDay = 28;
            }

            break;

        case "march":
            specialDay = 14;
            break;

        case "april":
            specialDay = 4;
            break;

        case "may":
            specialDay = 9;
            break;

        case "june":
            specialDay = 6;
            break;
    
        case "july":
            specialDay = 11;
            break;

        case "august":
            specialDay = 8;
            break;

        case "september":
            specialDay = 5;
            break;

        case "october":
            specialDay = 10;
            break;
        
        case "november":
            specialDay = 7;
            break;

        case "december":
            specialDay = 12;
            break;   
    }
    weekDay += day;
    weekDay -= specialDay;
    
    if(weekDay < 0){
        while (weekDay < 0){
            weekDay+=7;
        }
    }
    weekDay = weekDay%7;
    
    //number to day
    switch (weekDay){
        case 0:
            dayOfWeek = "Sunday";
            break;
        case 1:
            dayOfWeek = "Monday";
            break;
        case 2: 
            dayOfWeek = "Tuesday";
            break;
        case 3:
            dayOfWeek = "Wednesday";
            break;
        case 4:
            dayOfWeek = "Thursday";
            break;
        case 5:
            dayOfWeek = "Friday";
            break;
        case 6:
            dayOfWeek= "Saturday";
            break;
    }
    outputEl.innerHTML= `the date falls on a ${dayOfWeek}!`;
}

function christmastree(n){
    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            let random = Math.random()
            if (j == 0 && i == 0){
                outputEl.innerHTML += "☆";
            }
            else if (random>0.8){
                outputEl.innerHTML += " #";
            }
            else{
                outputEl.innerHTML += " *";
            }
        }
        outputEl.innerHTML += "<br>";
    }
    outputEl.style.textAlign = "center";
    outputEl.style.backgroundColor = "green";
    if (n>48){
        outputEl.style.width = "100%";

    }

}

function primes(n){
    let primeFactors = [];
    let factorizedNumber = [];
    let factoredN = n;
    for (let i = 2; i < Math.sqrt(n); i++) {
        if(factoredN%i == 0){
            if(!primeFactors.includes(i)){
                primeFactors.push(i);
            }
            while (factoredN%i == 0){
                factorizedNumber.push(i);
                factoredN = factoredN/i;
            }
        } 
    } 
    if (factoredN != 1){
        factorizedNumber.push(factoredN);
        primeFactors.push(factoredN);
    }
    outputEl.innerHTML = (factorizedNumber.length == 1)? `${n} is prime`:`Factors of ${n}: ${factorizedNumber}`;
}

function fizzbuzz(n){
    for (let i = 1; i <= n; i++){
        let value = (i%3 != 0)? ((i%5 != 0)? i : "buzz"): (i%15 != 0)? "fizz":"fizzbuzz";  
        outputEl.innerHTML += value+"<br>";}
}

function collatz(n){
    let steps = 0;
    while (n != 1){
        outputEl.innerHTML += `${n}-`;
        n = (n%2 == 0)? n/2 : 3*n +1;
        steps++;
        

    }
    outputEl.innerHTML += `1 <br>${num} reaches 1 after ${steps} steps.`;
}
function collatzto(n){
    for (let i = 1; i <= n; i++) {
        let steps = 0;
        let int = i;
        while (int != 1){
            int = (int%2 == 0)? int/2 : 3*int +1;
            steps++;
        }
        outputEl.innerHTML += `${i}: ${steps} steps.<br>`;
        
    }
    
    

}
function collatzvar(n, constant){
    for (let i = 1; i <= n; i++) {
        let steps = 0;
        let int = i;
        while ((int != (constant||1)) && (steps < 25000)){
            int = (int%2 == 0)? int/2 : 3*int +constant;
            steps++;
        }
        outputEl.innerHTML += `${i}: ${steps} steps.<br>`;  
    }
}

function fibonacci(num){
    let sequence = [1,1];
    for (let i = 2; i < num; i++) {
        let nthNumber = sequence[i-1] + sequence[i-2];
        sequence.push(nthNumber);
    }
    outputEl.innerHTML = `${sequence}<br>${num}th fibonacci number: ${sequence[num-1]}`;
    

}