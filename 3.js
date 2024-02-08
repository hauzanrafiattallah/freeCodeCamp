function rot13(str) {
  // Function to perform ROT13 transformation for a single character
  function transformChar(char) {
      const charCode = char.charCodeAt(0);

      if (charCode >= 65 && charCode <= 90) {
          // For uppercase letters (A-Z)
          return String.fromCharCode(((charCode - 65 + 13) % 26) + 65);
      } else if (charCode >= 97 && charCode <= 122) {
          // For lowercase letters (a-z)
          return String.fromCharCode(((charCode - 97 + 13) % 26) + 97);
      } else {
          // For non-alphabetic characters
          return char;
      }
  }

  // Apply the transformation to each character in the string
  return str.split('').map(transformChar).join('');
}
