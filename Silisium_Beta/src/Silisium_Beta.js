inputEl = document.querySelector("#formelInput");
btnEl = document.querySelector("#button");
outputEl = document.querySelector("#formelOutput");
const months =["january","february","march","april","may","june","july","august","september","october","november","december"];


document.body.onkeydown = function(e){
    if(e.keyCode == 13){
        btnEl.click();
    }
}

btnEl.addEventListener("click", ()=> {
    let input = inputEl.value.toLowerCase();
    if (months.some(v => input.includes(v))){
        doomsdayAlgorithm()
    }
    else{
        calculate()
    }
});




function calculate(){
    outputEl.innerHTML = "";
    let equation = inputEl.value.replaceAll(" ","").replaceAll("=","").toLowerCase();
    if(equation == ""){
        alert("insert values");
        return;
    }
    else if ((equation.toLowerCase().includes("christmastree"))||
        (equation.toLowerCase().includes("primes"))||
        (equation.toLowerCase().includes("fizzbuzz"))){
        eval(equation);
        return;
    }
    else if ((equation.includes("alert")) || (equation.includes("console"))){
        alert("error")
        return;
    }
    var newEquation = equation.replaceAll("one",1).replaceAll("two",2).replaceAll("three",3).replaceAll("four",4)
    .replaceAll("five",5).replaceAll("six",6).replaceAll("seven",7).replaceAll("eight",8).replaceAll("nine",9).replaceAll("ten",10)
    .replaceAll("^","**").replaceAll("plus","+").replaceAll("times","*").replaceAll("power","**").replaceAll("sqrt","Math.sqrt");

    try {
        outputEl.innerHTML = `${newEquation.replaceAll("**","^")} = ${eval(newEquation)}`;
    }
    catch{
        alert("error");
    }
}




//The doomsday method for calculating all dates 
function doomsdayAlgorithm(){
    let date = inputEl.value.toLowerCase().replaceAll(" ","").replaceAll("st","").replaceAll("date","")
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

function christmastree(num){
    let n = Number(num);
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

}

function primes(num){
    let primeFactors = [];
    let factorizedNumber = [];
    let n = Number(num);
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
    outputEl.innerHTML = `Factors of ${n}: ${factorizedNumber}`;
}

function fizzbuzz(num){
    let n = Number(num);
    for (let i = 1; i <= n; i++){
        let value = (i%3 != 0)? ((i%5 != 0)? i : "buzz"): (i%15 != 0)? "fizz":"fizzbuzz";  
        outputEl.innerHTML += value+"<br>";}
}
//function calculate(){
//    let equation = inputEl.value.replaceAll(" ","").toLowerCase();
//    let equationLength = equation.length;
//    if(equation.includes("+")){
//        let symbolLocation = equation.indexOf("+");
//        let a = Number(equation.slice(0,symbolLocation));
//        let b = Number(equation.slice(symbolLocation+1,equationLength))
//        outputEl.innerHTML = `${a} + ${b} = ${a+b}`;
//    }
//    else if(equation.includes("-")){
//        let symbolLocation = equation.indexOf("-");
//        let a = Number(equation.slice(0,symbolLocation));
//        let b = Number(equation.slice(symbolLocation+1,equationLength))
//        outputEl.innerHTML = `${a} - ${b} = ${a-b}`;
//
//    }
//    else if(equation.includes("*")|| equation.includes("^")){
//        if (equation.includes("**")){
//            let symbolLocation = equation.indexOf("*");
//            let a = Number(equation.slice(0,symbolLocation));
//            let b = Number(equation.slice(symbolLocation+2,equationLength))
//            outputEl.innerHTML = `${a} ^ ${b} = ${a**b}`;
//        }
//        else if(equation.includes("^")){
//            let symbolLocation = equation.indexOf("^");
//            let a = Number(equation.slice(0,symbolLocation));
//            let b = Number(equation.slice(symbolLocation+1,equationLength))
//            outputEl.innerHTML = `${a} ^ ${b} = ${a**b}`;
//
//        }
//        else{
//            let symbolLocation = equation.indexOf("*");
//            let a = Number(equation.slice(0,symbolLocation));
//            let b = Number(equation.slice(symbolLocation+1,equationLength))
//            outputEl.innerHTML = `${a} * ${b} = ${a*b}`;
//        }
//    }
//    else if(equation.includes("/")){
//        let symbolLocation = equation.indexOf("/");
//        let a = Number(equation.slice(0,symbolLocation));
//        let b = Number(equation.slice(symbolLocation+1,equationLength))
//        outputEl.innerHTML = `${a} / ${b} = ${a/b}`;
//    }
//
//
//
//
//}
