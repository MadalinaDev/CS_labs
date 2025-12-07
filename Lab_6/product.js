function multiplyStrings(a, b) {
  if (a === "0" || b === "0") return "0";

  let aRev = a.split("").reverse();
  let bRev = b.split("").reverse();
  let result = new Array(a.length + b.length).fill(0);

  for (let i = 0; i < aRev.length; i++) {
    for (let j = 0; j < bRev.length; j++) {
      let multiply = parseInt(aRev[i]) * parseInt(bRev[j]);
      let sum = multiply + result[i + j];

      result[i + j] = sum % 10;
      result[i + j + 1] += Math.floor(sum / 10);
    }
  }

  while (result[result.length - 1] === 0) {
    result.pop();
  }

  return result.reverse().join("");
}

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


let inputs = [];

rl.on("line", (input) => {
  inputs.push(input.trim());

  if (inputs.length === 1) {
    console.log("Enter second number:");
  } else if (inputs.length === 2) {
    const num1 = inputs[0];
    const num2 = inputs[1];
    console.log(`\nProduct:\n${multiplyStrings(num1, num2)}`);
    rl.close();
  }
});

console.log("Enter first number:");
