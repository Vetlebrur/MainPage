inputEl = document.querySelector("#formelInput");
btnEl = document.querySelector("#button");
outputEl = document.querySelector("#formelOutput");


function calculate(){
    let equation = inputEl.value.replaceAll(" ","").toLowerCase();
    if(equation == ""){
        alert("insert values");
        return;

    }
    else if (equation.includes("alert")){
        alert("error")
        return;

    }
    var newEquation = equation.replaceAll("one",1).replaceAll("two",2).replaceAll("three",3).replaceAll("four",4)
    .replaceAll("five",5).replaceAll("six",6).replaceAll("seven",7).replaceAll("eight",8).replaceAll("nine",9).replaceAll("ten",10)
    .replaceAll("^","**").replaceAll("plus","+").replaceAll("times","*").replaceAll("power","**");
    
    outputEl.innerHTML = `${newEquation.replaceAll("**","^")} = ${eval(newEquation)}`;
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
