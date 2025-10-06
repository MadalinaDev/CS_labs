function caesarCipherWithKeyword() {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function askQuestion(question) {
    return new Promise((resolve) => {
      readline.question(question, resolve);
    });
  }

  function generatePermutedAlphabet(keyword) {
    const originalAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let permutedAlphabet = "";

    const seen = new Set();
    for (let char of keyword) {
      if (!seen.has(char)) {
        permutedAlphabet += char;
        seen.add(char);
      }
    }

    for (let char of originalAlphabet) {
      if (!seen.has(char)) {
        permutedAlphabet += char;
        seen.add(char);
      }
    }

    return permutedAlphabet;
  }

  function encryptWithPermutedAlphabet(
    message,
    key,
    originalAlphabet,
    permutedAlphabet
  ) {
    let encrypted = "";

    for (let i = 0; i < message.length; i++) {
      const char = message[i];
      const originalIndex = originalAlphabet.indexOf(char);
      const permutedChar = permutedAlphabet[originalIndex];
      const permutedIndex = permutedAlphabet.indexOf(permutedChar);
      const newIndex = (permutedIndex + key) % 26;
      encrypted += permutedAlphabet[newIndex];
    }

    return encrypted;
  }

  function decryptWithPermutedAlphabet(
    message,
    key,
    originalAlphabet,
    permutedAlphabet
  ) {
    let decrypted = "";

    for (let i = 0; i < message.length; i++) {
      const char = message[i];

      const permutedIndex = permutedAlphabet.indexOf(char);
      const originalPermutedIndex = (permutedIndex - key + 26) % 26;
      const originalPermutedChar = permutedAlphabet[originalPermutedIndex];
      const positionInPermuted = permutedAlphabet.indexOf(originalPermutedChar);
      decrypted += originalAlphabet[positionInPermuted];
    }

    return decrypted;
  }

  async function main() {
    console.log("=== Caesar Cipher with Keyword Permutation ===");
    console.log("Valid operations: 'encrypt' or 'decrypt'");
    console.log("Key 1 range: 1-25");
    console.log("Key 2: keyword for alphabet permutation (Latin letters only)");
    console.log("Message can contain letters A-Z, a-z, and spaces\n");

    let operation = await askQuestion("Choose operation (encrypt/decrypt): ");
    operation = operation.toLowerCase().trim();

    if (operation !== "encrypt" && operation !== "decrypt") {
      console.log("Error: Operation must be 'encrypt' or 'decrypt'");
      readline.close();
      return;
    }

    const key1Input = await askQuestion("Enter key 1 (number 1-25): ");
    const key1 = parseInt(key1Input.trim());

    if (isNaN(key1) || key1 < 1 || key1 > 25) {
      console.log("Error: Key 1 must be a number between 1 and 25");
      readline.close();
      return;
    }

    const key2 = await askQuestion("Enter keyword for alphabet permutation: ");
    const processedKey2 = key2.toUpperCase().replace(/[^A-Z]/g, "");

    if (processedKey2.length === 0) {
      console.log("Error: Keyword must contain at least one Latin letter");
      readline.close();
      return;
    }

    const message = await askQuestion("Enter message: ");

    if (!message || typeof message !== "string") {
      console.log("Error: Message must be a non-empty string");
      readline.close();
      return;
    }

    const processedMessage = message.toUpperCase().split(" ").join("");

     if (
       !processedMessage.split("").every((char) => {
         const code = char.charCodeAt(0);
         return code >= 65 && code <= 90; // A-Z
       })
     ) {
       console.log("Error: Message must contain only letters A-Z and a-z");
       readline.close();
       return;
     }

    const originalAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const permutedAlphabet = generatePermutedAlphabet(processedKey2);

    console.log(`\nOriginal alphabet: ${originalAlphabet}`);
    console.log(`Permuted alphabet: ${permutedAlphabet}`);

    let result;
    if (operation === "encrypt") {
      result = encryptWithPermutedAlphabet(
        processedMessage,
        key1,
        originalAlphabet,
        permutedAlphabet
      );
      console.log(`\nEncrypted message: ${result}`);
    } else {
      result = decryptWithPermutedAlphabet(
        processedMessage,
        key1,
        originalAlphabet,
        permutedAlphabet
      );
      console.log(`\nDecrypted message: ${result}`);
    }

    readline.close();
    return result;
  }

  main();
}

if (require.main === module) {
  caesarCipherWithKeyword();
}

module.exports = {
  caesarCipherWithKeyword
};
