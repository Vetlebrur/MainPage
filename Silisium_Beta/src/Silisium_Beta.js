inputEl = document.querySelector("#formelInput");
btnEl = document.querySelector("#button");
outputEl = document.querySelector("#formelOutput");


function calculate(){
    let equation = inputEl.value.replaceAll(" ","").toLowerCase();
    let equationLength = equation.length;
    if(equation.includes("+")){
        let symbolLocation = equation.indexOf("+");
        let a = Number(equation.slice(0,symbolLocation));
        let b = Number(equation.slice(symbolLocation+1,equationLength))
        outputEl.innerHTML = `${a} + ${b} = ${a+b}`;
    }
    else if(equation.includes("-")){
        let symbolLocation = equation.indexOf("-");
        let a = Number(equation.slice(0,symbolLocation));
        let b = Number(equation.slice(symbolLocation+1,equationLength))
        outputEl.innerHTML = `${a} - ${b} = ${a-b}`;

    }
    else if(equation.includes("*")|| equation.includes("^")){
        if (equation.includes("**")){
            let symbolLocation = equation.indexOf("*");
            let a = Number(equation.slice(0,symbolLocation));
            let b = Number(equation.slice(symbolLocation+2,equationLength))
            outputEl.innerHTML = `${a} ^ ${b} = ${a**b}`;
        }
        else if(equation.includes("^")){
            let symbolLocation = equation.indexOf("^");
            let a = Number(equation.slice(0,symbolLocation));
            let b = Number(equation.slice(symbolLocation+1,equationLength))
            outputEl.innerHTML = `${a} ^ ${b} = ${a**b}`;

        }
        else{
            let symbolLocation = equation.indexOf("*");
            let a = Number(equation.slice(0,symbolLocation));
            let b = Number(equation.slice(symbolLocation+1,equationLength))
            outputEl.innerHTML = `${a} * ${b} = ${a*b}`;
        }
    }
    else if(equation.includes("/")){
        let symbolLocation = equation.indexOf("/");
        let a = Number(equation.slice(0,symbolLocation));
        let b = Number(equation.slice(symbolLocation+1,equationLength))
        outputEl.innerHTML = `${a} / ${b} = ${a/b}`;
    }




}
