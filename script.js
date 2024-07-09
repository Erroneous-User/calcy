const num = Array.from({ length: 37 }, (_, i) => i);

const buttons = Array.from(document.getElementsByClassName("a"));
const screen = document.getElementById("screen");
let value = 1;
let result=1;
let fact = 1;
let nums= 1;

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
  // Replace trigonometric functions
  val = val.replace(/sin\(([^)]+)\)/g, function(match, p1) {
    return `Math.sin(${p1} * Math.PI / 180)`;
  });
  val = val.replace(/cos\(([^)]+)\)/g, function(match, p1) {
    return `Math.cos(${p1} * Math.PI / 180)`;
  });
  val = val.replace(/tan\(([^)]+)\)/g, function(match, p1) {
    return `Math.tan(${p1} * Math.PI / 180)`;
  });

  // Replace π
  val = val.replace("π", "Math.PI");

  // Replace ² and ³
  val = val.replace(/(\d+)²/g, function(match, p1) {
    return `(${p1} * ${p1})`;
  });
  val = val.replace(/(\d+)³/g, function(match, p1) {
    return `(${p1} * ${p1} * ${p1})`;
  });

  // Replace ʸ
  val = val.replace(/(\d+)(ʸ)(\d+)/g, function(match, p1, p2, p3) {
    return `Math.pow(${p1}, ${p3})`;
  });

  // Replace inv
  val = val.replace(/(\d+)inv/g, function(match, p1) {
    return `(1 / ${p1})`;
  });

  // Replace y√
  val = val.replace(/(\d+)(y√)\((\d+)\)/g, function(match, p1, p2, p3) {
    return `Math.pow(${p3}, 1 / ${p1})`;
  });

  // Replace √
  val = val.replace(/√\(([^)]+)\)/g, function(match, p1) {
    return `Math.sqrt(${p1})`;
  });

  // Replace E
  val = val.replace(/(\d+)E(\d+)/g, function(match, p1, p2) {
    return `${p1} * Math.pow(10, ${p2})`;
  });


  // Replace log
  val = val.replace(/log\(([^)]+)\)/g, function(match, p1) {
    return `Math.log10(${p1})`;
  });

  // Replace ln
  val = val.replace(/ln\(([^)]+)\)/g, function(match, p1) {
    return `Math.log(${p1})`;
  });

  
  // Replace e
  val = val.replace(/e/g, "Math.E");

  // Replace e^
  val = val.replace(/e\^/g, "Math.exp(");

  // Handle factorial
  while (val.includes("!")) {
    let nums = val.match(/\d+(?=!)/)[0];
    fact = 1;
    for (let i = 1; i <= nums; i++) {
      fact *= i;
    }
    val = val.replace(nums + "!", fact);
  }

  try {
    console.log(val);
    return eval(val);
  } catch (e) {
    return "Error: Invalid expression";
  }
}