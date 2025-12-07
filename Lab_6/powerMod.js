const readline = require("readline");

function compare(a, b) {
  a = a.replace(/^0+/, "") || "0";
  b = b.replace(/^0+/, "") || "0";
  if (a.length > b.length) return 1;
  if (a.length < b.length) return -1;
  for (let i = 0; i < a.length; i++) {
    if (a[i] > b[i]) return 1;
    if (a[i] < b[i]) return -1;
  }
  return 0;
}

function add(a, b) {
  let i = a.length - 1;
  let j = b.length - 1;
  let carry = 0;
  let result = "";

  while (i >= 0 || j >= 0 || carry) {
    const digitA = i >= 0 ? parseInt(a[i--]) : 0;
    const digitB = j >= 0 ? parseInt(b[j--]) : 0;
    const sum = digitA + digitB + carry;
    result = (sum % 10) + result;
    carry = Math.floor(sum / 10);
  }

  return result.replace(/^0+/, "") || "0";
}

function subtract(a, b) {
  if (compare(a, b) < 0) return "-" + subtract(b, a);

  let i = a.length - 1;
  let j = b.length - 1;
  let borrow = 0;
  let result = "";

  while (i >= 0) {
    const digitA = parseInt(a[i--]);
    const digitB = j >= 0 ? parseInt(b[j--]) : 0;
    let diff = digitA - digitB - borrow;

    if (diff < 0) {
      diff += 10;
      borrow = 1;
    } else {
      borrow = 0;
    }

    result = diff + result;
  }

  return result.replace(/^0+/, "") || "0";
}

function multiplyByDigit(a, digit) {
  if (digit === 0 || a === "0") return "0";
  if (digit === 1) return a;

  let result = "";
  let carry = 0;

  for (let i = a.length - 1; i >= 0; i--) {
    const product = parseInt(a[i]) * digit + carry;
    result = (product % 10) + result;
    carry = Math.floor(product / 10);
  }

  if (carry > 0) result = carry + result;
  return result;
}

function multiply(a, b) {
  if (a === "0" || b === "0") return "0";

  let result = "0";
  let zeroPadding = "";

  for (let i = b.length - 1; i >= 0; i--) {
    const digit = parseInt(b[i]);
    const partial = multiplyByDigit(a, digit) + zeroPadding;
    result = add(result, partial);
    zeroPadding += "0";
  }

  return result;
}

function karatsubaMultiply(x, y) {
  if (x.length < 10 || y.length < 10) {
    return multiply(x, y);
  }

  const m = Math.max(x.length, y.length);
  const m2 = Math.floor(m / 2);

  const high1 = x.slice(0, -m2) || "0";
  const low1 = x.slice(-m2) || "0";
  const high2 = y.slice(0, -m2) || "0";
  const low2 = y.slice(-m2) || "0";

  const z0 = karatsubaMultiply(low1, low2);
  const z1 = karatsubaMultiply(add(low1, high1), add(low2, high2));
  const z2 = karatsubaMultiply(high1, high2);

  const term1 = z2 + "0".repeat(2 * m2);
  const term2 = subtract(subtract(z1, z2), z0) + "0".repeat(m2);

  return add(add(term1, term2), z0);
}

function mod(a, m) {
  if (compare(a, m) < 0) return a;
  if (m === "1") return "0";

  let remainder = a;

  while (compare(remainder, m) >= 0) {
    let temp = m;
    let shift = 0;

    while (compare(temp + "0", remainder) <= 0) {
      temp += "0";
      shift++;
    }

    for (let s = shift; s >= 0; s--) {
      while (compare(remainder, temp) >= 0) {
        remainder = subtract(remainder, temp);
      }
      if (s > 0) temp = temp.slice(0, -1);
    }
  }

  return remainder;
}

function divideByTwo(a) {
  let result = "";
  let carry = 0;

  for (let i = 0; i < a.length; i++) {
    const current = carry * 10 + parseInt(a[i]);
    result += Math.floor(current / 2).toString();
    carry = current % 2;
  }

  return result.replace(/^0+/, "") || "0";
}

function isEven(a) {
  const lastDigit = parseInt(a[a.length - 1]);
  return lastDigit % 2 === 0;
}

function modPow(base, exponent, modulus) {
  if (modulus === "1") return "0";

  base = mod(base, modulus);
  let result = "1";
  let exp = exponent;

  while (compare(exp, "0") > 0) {
    if (!isEven(exp)) {
      result = mod(karatsubaMultiply(result, base), modulus);
    }

    base = mod(karatsubaMultiply(base, base), modulus);
    exp = divideByTwo(exp);
  }

  return result;
}

function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  rl.question("Base (a): ", (a) => {
    rl.question("Exponent (b): ", (b) => {
      rl.question("Modulus (m): ", (m) => {
        const start = Date.now();
        const result = modPow(a, b, m);
        const end = Date.now();

        console.log(`\n${a}^${b} mod ${m} =`);
        console.log(result);
        console.log(`Time: ${end - start}ms`);

        rl.close();
      });
    });
  });
}

main();
