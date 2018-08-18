export function zeroPad(i) {
  let stringValue = String(i);

  while (stringValue.length < 3) {
    stringValue = `0${stringValue}`;
  }
  
  return stringValue;
};

export function uri(str) {
  return decodeURIComponent(str)
}