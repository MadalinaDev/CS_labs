const readline = require("readline");
const alphabet = "AĂÂBCDEFGHIÎJKLMNOPQRSȘTȚUVWXYZ";

function processInput(text) {
  let result = "";
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (ch !== " ") result += ch.toUpperCase();
  }
  return result;
}

function validateText(text) {
  for (let i = 0; i < text.length; i++) {
    let valid = false;
    for (let j = 0; j < alphabet.length; j++) {
      if (text[i] === alphabet[j]) {
        valid = true;
        break;
      }
    }
    if (!valid) return false;
  }
  return true;
}

function letterToIndex(letter) {
  for (let i = 0; i < alphabet.length; i++) {
    if (alphabet[i] === letter) return i;
  }
  return -1;
}

function indexToLetter(index) {
  return alphabet[index % alphabet.length];
}

function encrypt(message, key) {
  message = processInput(message);
  key = processInput(key);
  if (key.length < 7)
    throw new Error("The key must be at least 7 characters long.");
  if (!validateText(message) || !validateText(key))
    throw new Error("Only Romanian letters A to Z, Ă, Â, Î, Ș, Ț are allowed.");
  let cipher = "";
  for (let i = 0; i < message.length; i++) {
    const mIndex = letterToIndex(message[i]);
    const kIndex = letterToIndex(key[i % key.length]);
    const cIndex = (mIndex + kIndex) % alphabet.length;
    cipher += indexToLetter(cIndex);
  }
  return cipher;
}

function decrypt(cipher, key) {
  cipher = processInput(cipher);
  key = processInput(key);
  if (key.length < 7)
    throw new Error("The key must be at least 7 characters long.");
  if (!validateText(cipher) || !validateText(key))
    throw new Error("Only Romanian letters A to Z, Ă, Â, Î, Ș, Ț are allowed.");
  let message = "";
  for (let i = 0; i < cipher.length; i++) {
    const cIndex = letterToIndex(cipher[i]);
    const kIndex = letterToIndex(key[i % key.length]);
    const mIndex = (cIndex - kIndex + alphabet.length) % alphabet.length;
    message += indexToLetter(mIndex);
  }
  return message;
}

console.log("=== Vigenere Cipher (Romanian) ===");
console.log("Rules:");
console.log("1. Only Romanian letters are allowed: A to Z, Ă, Â, Î, Ș, Ț");
console.log("2. Spaces will be removed automatically.");
console.log("3. Key must be at least 7 characters long.");
console.log(
  "4. Enter 'encrypt' to encrypt a message or 'decrypt' to decrypt a message.\n"
);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

rl.question("Enter 'encrypt' or 'decrypt': ", (action) => {
  rl.question("Enter the key: ", (key) => {
    rl.question("Enter the message: ", (message) => {
      try {
        if (action.toLowerCase() === "encrypt") {
          console.log("Result:", encrypt(message, key));
        } else if (action.toLowerCase() === "decrypt") {
          console.log("Result:", decrypt(message, key));
        } else {
          console.log("Invalid action. Use 'encrypt' or 'decrypt'.");
        }
      } catch (err) {
        console.log("Error:", err.message);
      }
      rl.close();
    });
  });
});
