function caesarCipher() {
  const readline = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  function askQuestion(question) {
    return new Promise((resolve) => {
      readline.question(question, resolve);
    });
  }

  
  function encrypt(message, key) {
    let encrypted = "";
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < message.length; i++) {
      const char = message[i];
      const currentIndex = alphabet.indexOf(char);
      const newIndex = (currentIndex + key) % 26;
      encrypted += alphabet[newIndex];
    }

    return encrypted;
  }

  function decrypt(message, key) {
    let decrypted = "";
    const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    for (let i = 0; i < message.length; i++) {
      const char = message[i];
      const currentIndex = alphabet.indexOf(char);
      const newIndex = (currentIndex - key + 26) % 26;
      decrypted += alphabet[newIndex];
    }

    return decrypted;
  }

  async function main() {
    console.log("=== Caesar Cipher Program ===");
    console.log("Valid operations: 'encrypt' or 'decrypt'");
    console.log("Valid key range: 1-25");
    console.log("Message can contain letters A-Z, a-z, and spaces\n");

    let operation = await askQuestion("Choose operation (encrypt/decrypt): ");
    operation = operation.toLowerCase().trim();

    if (operation !== "encrypt" && operation !== "decrypt") {
      console.log("Error: Operation must be 'encrypt' or 'decrypt'");
      readline.close();
      return;
    }

    const keyInput = await askQuestion("Enter key (1-25): ");
    const key = parseInt(keyInput.trim());

    if (isNaN(key) || key < 1 || key > 25) {
      console.log("Error: Key must be a number between 1 and 25");
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

    let result;
    if (operation === "encrypt") {
      result = encrypt(processedMessage, key);
      console.log(`\nEncrypted message: ${result}`);
    } else {
      result = decrypt(processedMessage, key);
      console.log(`\nDecrypted message: ${result}`);
    }

    readline.close();
    return result;
  }

  main();
}

caesarCipher();
