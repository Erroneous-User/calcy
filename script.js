const num = Array.from({ length: 37 }, (_, i) => i);

const buttons = Array.from(document.getElementsByClassName("a"));
const screen = document.getElementById("screen");
let value = 1;
let result=1;

function input() {
  buttons.forEach((button, index) => {
    button.addEventListener("click", function(event) {
      value = button.value;
      console.log(value);
      if (screen.value === "Welcome to Calcy! Your Personal Scientific Calculator.")
        screen.value = "";
      if (value === "AC")
        screen.value = "";
      else if (value === "C")
        screen.value = screen.value.slice(0, -1);
      else if (value === "="){
        try{
          result = eval(screen.value)
        }
        catch{
          result = calculation(screen.value);
        }
        screen.value = result;
      }
      else {
        screen.value += value;
      }
    });
  });
}
input();

function calculation(val) {
  if (val.includes("sin(")) {
    val = val.replace("sin(", "Math.sin(");
  }
  if (val.includes("cos(")) {
    val = val.replace("cos(", "Math.cos(");
  }
  if (val.includes("tan(")) {
    val = val.replace("tan(", "Math.tan(");
  }
  if (val.includes("π")) {
    val = val.replace("π", "Math.PI");
  }
  if (val.includes("x²")) {
    val = val.replace("x²", "^2");
  }
  if (val.includes("x³")) {
    val = val.replace("x³", "^3");
  }
  if (val.includes("xʸ")) {
    val = val.replace("xʸ", "^");
  }
  if (val.includes("inv")) {
    let num = val.match(/\d+(?=inv)/)[0];
    val = val.replace(num + "inv", `1/${num}`);
  }
  if (val.includes("√(")) {
    val = val.replace("√(", "Math.sqrt(");
  }
  if (val.includes("ʸ√(")) {
    let match = val.match(/(\d+)ʸ√\((\d+)\)/);
    if (match) {
      let base = match[1];
      let exponent = match[2];
      val = val.replace(match[0], `Math.pow(${base}, 1/${exponent})`);
    }
  }
  if (val.includes("exp(")) {
    val = val.replace("exp(", "Math.exp(");
  }
  if (val.includes("log (")) {
    val = val.replace("log (", "Math.log10(");
  }
  if (val.includes("ln (")) {
    val = val.replace("ln (", "Math.log(");
  }
  if (val.includes("e^(")) {
    val = val.replace("e^(", "Math.exp(");
  }
  if (val.includes("e")) {
    val = val.replace("e", "Math.E");
  }
  if (val.includes("!")) {
    let num = val.match(/\d+/)[0];
    let fact = 1;
    for (let i = 1; i <= num; i++) {
      fact *= i;
    }
    val = val.replace(num + "!", fact);
  }
  
  try {
    return eval(val);
  } catch (e) {
    return "Error: Invalid expression";
  }
}