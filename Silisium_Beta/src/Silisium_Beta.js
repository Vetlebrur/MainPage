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
        alert("error: insert values");
    }
    else if ((input.includes("alert")) || (input.includes("console"))){
        alert("error: illegal command");
    }
    else if(input.includes("(") && !input.includes("sq")){
        try{
            eval(input);
        }
        catch{
            alert("error: not a function");
            
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
        "twen":2,"thir":3,"for":4,"fif":5,"eigh":8,"teen":"+10","zero":0,
        "one": 1,"two": 2,"three":3,"four":4,"five":5,"six":6,"seven":7,
        "eight":8,"nine":9,"ten":10,"eleven":11,"twelve":12,"ty":"*10+",
        "hundred":"*100","thousand":"*1000",

        " ":"","=":"","to":"","of":"","by":"","the":"","and":"+","plus":"+",
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
    try {
        let solution = eval(newEquation); 
        outputEl.innerHTML = `${equation} = ${solution}`;
    }
    catch{
        newEquation += 0;
        try {
            let solution = eval(newEquation);
            outputEl.innerHTML = `${equation} = ${solution}`;
        } catch {
            alert("error: not computable");
        }
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
//Creates a christmas tree
function christmastree(n){
    for (let i = 0; i < n; i++) {
        for (let j = 0; j <= i; j++) {
            let random = Math.random()
            if (j == 0 && i == 0){
                outputEl.innerHTML += "???";
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
// checks for primes up to n
function primes(n){
    for (let i = 3; i <= n; i++) {
        let primeFactors = [];
        let factorizedNumber = [];
        let factoredN = i;
        for (let j = 2; j < Math.sqrt(n); j++) {
            if(factoredN%j == 0){
                (!primeFactors.includes(j))? primeFactors.push(j): 0;
                while (factoredN%j == 0){
                    factorizedNumber.push(j);
                    factoredN = factoredN/j;
                }
            } 
        } 
        if (factoredN != 1){
            factorizedNumber.push(factoredN);
            primeFactors.push(factoredN);
        }
        outputEl.innerHTML += ((factorizedNumber.length == 1)? `${i} is prime`:`${i} = ${factorizedNumber}`) + "<br>";
    }
    outputEl.innerHTML.replaceAll(",","*");
}
//classic fizzbuzz, but 140 characters and 1/2 line(s)
function fizzbuzz(n){
    for (let i = 1; i <= n; i++){
        outputEl.innerHTML += ((i%3!=0)? ((i%5!=0)? i:"buzz"):(i%15!=0)? "fizz":"fizzbuzz")+"<br>";}
};

//checks if given n will go to 1 through the criterions given by the collatz conjecture
function collatz(n){
    let steps = 1;
    let num = n;
    while (n != 1){
        outputEl.innerHTML += `${n}-`;
        n = (n%2 == 0)? n/2 : 3*n + 1;
        steps++;
    }
    outputEl.innerHTML += `1 <br>${num} reaches 1 after ${steps} steps.`;
}

//checks all values up to n with the same rules
function collatzto(n){
    outputEl.innerHTML += `n: k steps <br>`;
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
//checks all values up to n, but the +1 is a variable 'constant'
function collatzvar(n, constant){
    if (constant%2 != 0){
        for (let i = 1; i <= n; i++) {
            let steps = 0;
            let int = i;
            while ((int != (constant||1)) && (steps < 25000)){
                int = (int%2 == 0)? int/2 : 3*int +constant;
                steps++;
            }
            outputEl.innerHTML += `${i}: ${steps} steps.<br>`;
            
        }
        return;
    }
    alert("error: if the constant is even, the value will never converge to a value.")
    
}
//finds the fibonacci numbers up to n
function fibonacci(n){
    let sequence = [1,1];
    for (let i = 2; i < n; i++) {
        let nthNumber = sequence[i-1] + sequence[i-2];
        sequence.push(nthNumber);
    }
    outputEl.innerHTML = `${sequence}<br>${n}th fibonacci number: ${sequence[n-1]}`;
    

}
//creates a pascal triangle
function pascaltriangle(n){
    let columns =[];
    for (let i = 0; i < n; i++) {
        let row = [];
        row.push(1);
        for (let j = 1; j < i; j++) {
            let number = columns[i-1][j-1]+columns[i-1][j];
            row.push(number);   
        }
        (i != 0)? row.push(1): 0;
        columns.push(row);
        outputEl.innerHTML += `${row}<br>`;
    }
}