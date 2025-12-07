function compareStrings(a, b) {
  if (a.length > b.length) return 1;
  if (a.length < b.length) return -1;

  for (let i = 0; i < a.length; i++) {
    if (a[i] > b[i]) return 1;
    if (a[i] < b[i]) return -1;
  }
  return 0; 
}

function subtractStrings(a, b) {
  a = a.split("").reverse();
  b = b.split("").reverse();
  let result = [];
  let borrow = 0;

  for (let i = 0; i < a.length; i++) {
    let digitA = parseInt(a[i]);
    let digitB = i < b.length ? parseInt(b[i]) : 0;

    let diff = digitA - digitB - borrow;

    if (diff < 0) {
      diff += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }

    result.push(diff);
  }

  while (result.length > 1 && result[result.length - 1] === 0) {
    result.pop();
  }

  return result.reverse().join("");
}

function divideByTwo(a) {
  let result = "";
  let carry = 0;

  for (let i = 0; i < a.length; i++) {
    let current = carry * 10 + parseInt(a[i]);
    result += Math.floor(current / 2).toString();
    carry = current % 2;
  }

  while (result.length > 1 && result[0] === "0") {
    result = result.substring(1);
  }

  return result;
}

function isEven(a) {
  return parseInt(a[a.length - 1]) % 2 === 0;
}

function isZero(a) {
  return a === "0" || a === "";
}

function binaryGCD(a, b) {
  if (isZero(a)) return b;
  if (isZero(b)) return a;

  let shift = 0;

  while (isEven(a) && isEven(b)) {
    a = divideByTwo(a);
    b = divideByTwo(b);
    shift++;
  }

  while (!isZero(a) && !isZero(b)) {
    while (isEven(a)) {
      a = divideByTwo(a);
    }

    while (isEven(b)) {
      b = divideByTwo(b);
    }

    let comparison = compareStrings(a, b);
    if (comparison > 0) {
      a = subtractStrings(a, b);
      a = divideByTwo(a); 
    } else if (comparison < 0) {
      b = subtractStrings(b, a);
      b = divideByTwo(b); 
    } else {
      break;
    }
  }

  let gcd = compareStrings(a, b) > 0 ? a : b;
  for (let i = 0; i < shift; i++) {
    gcd = gcd + "0";
  }

  return gcd;
}

function euclideanGCD(a, b) {
  while (!isZero(b)) {
    let temp = b;

    while (compareStrings(a, b) >= 0) {
      a = subtractStrings(a, b);
    }

    b = a;
    a = temp;
  }

  return a;
}

function main() {
  const readline = require("readline");
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  console.log("=== GCD CALCULATOR FOR LARGE NUMBERS ===");

  rl.question("Enter first number: ", (num1) => {
    rl.question("Enter second number: ", (num2) => {
      if (!/^\d+$/.test(num1) || !/^\d+$/.test(num2)) {
        console.log("Error: Please enter positive integers only!");
        rl.close();
        return;
      }

      num1 = num1.replace(/^0+/, "") || "0";
      num2 = num2.replace(/^0+/, "") || "0";

      console.log(`\nNumbers: ${num1} and ${num2}`);

      const gcd = binaryGCD(num1, num2);

      console.log(`GCD: ${gcd}`);

      const verify = euclideanGCD(num1, num2);
      console.log(`Verification: ${verify}`);

      if (gcd === verify) {
        console.log("✓ Results match!");
      }

      rl.close();
    });
  });
}

main();
