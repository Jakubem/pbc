export function zeroPad(number) {
  let stringValue = String(number);

  while (stringValue.length < 3) {
    stringValue = `0${stringValue}`;
  }
  
  return stringValue;
};

export function uri(str) {
  return decodeURIComponent(str)
}

// export function trimTitle(str) {
//   const titleChunks = str.split(" ")
//   return 
// }