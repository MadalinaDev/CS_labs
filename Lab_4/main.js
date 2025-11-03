const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const E_TABLE = [
  32, 1, 2, 3, 4, 5, 4, 5, 6, 7, 8, 9, 8, 9, 10, 11, 12, 13, 12, 13, 14, 15, 16,
  17, 16, 17, 18, 19, 20, 21, 20, 21, 22, 23, 24, 25, 24, 25, 26, 27, 28, 29,
  28, 29, 30, 31, 32, 1,
];

function expandE(initial) {
  let result = "";
  for (let i = 0; i < E_TABLE.length; i++) result += initial[E_TABLE[i] - 1];
  return result;
}

function xorBits(a, b) {
  let result = "";
  for (let i = 0; i < a.length; i++) result += (a[i] ^ b[i]).toString();
  return result;
}

function randomBits(len) {
  let s = "";
  for (let i = 0; i < len; i++) s += Math.round(Math.random());
  return s;
}

function chunk(str, size) {
  let arr = [];
  for (let i = 0; i < str.length; i += size) {
    arr.push(str.slice(i, i + size));
  }
  return arr.join(" ");
}

function validBits(str, len) {
  if (str.length !== len) return false;
  for (let i = 0; i < str.length; i++) {
    if (str[i] !== "0" && str[i] !== "1") return false;
  }
  return true;
}

function showETable() {
  console.log("\nE BIT-SELECTION TABLE (48 bits):");
  for (let i = 0; i < E_TABLE.length; i += 6) {
    let row = "";
    for (let j = i; j < i + 6 && j < E_TABLE.length; j++) {
      row += E_TABLE[j].toString().padStart(2, " ") + "  ";
    }
    console.log(row.trim());
  }
  console.log();
}

function processInputs(R0, K1) {
  console.log("\n=== DES (Data Encryption Standard) Algorithm ===");
  console.log("Initial values:");
  console.log("R0 = ", chunk(R0, 4));
  console.log("K1 = ", chunk(K1, 6));

  showETable();

  console.log("Step 1:   Expand R0 to 48 bits using E table:");
  const E_R0 = expandE(R0);
  console.log("E(R0) = ", chunk(E_R0, 6));

  console.log("\nStep 2:   XOR with K1:");
  const B = xorBits(K1, E_R0);
  console.log("K1 + E(R0) = ", chunk(B, 6));

  console.log("\nFinal 48-bit result (B1B2B3B4B5B6B7B8) = ", B);
  rl.close();
}

function start() {
  rl.question("Choose input mode: [1] Random or [2] Manual ? ", (mode) => {
    if (mode.trim() === "1") {
      const R0 = randomBits(32);
      const K1 = randomBits(48);
      processInputs(R0, K1);
    } else if (mode.trim() === "2") {
      rl.question("Enter R0 (32 bits): ", (R0) => {
        if (!validBits(R0, 32)) {
          console.log("Error: R0 must be exactly 32 bits (0/1).");
          rl.close();
          return;
        }
        rl.question("Enter K1 (48 bits): ", (K1) => {
          if (!validBits(K1, 48)) {
            console.log("Error: K1 must be exactly 48 bits (0/1).");
            rl.close();
            return;
          }
          processInputs(R0, K1);
        });
      });
    } else {
      console.log("Invalid choice. Please enter 1 or 2.");
      rl.close();
    }
  });
}

start();

// sample test for manual input:
// 01111111010100110001011101100011
// 110100100100011100101001111010010111100101110001