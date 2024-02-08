function palindrome(str) {
  // Remove non-alphanumeric characters and convert to lowercase
  const cleanStr = str.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();

  // Check if the cleaned string is equal to its reverse
  return cleanStr === cleanStr.split('').reverse().join('');
}