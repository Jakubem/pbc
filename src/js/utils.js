export function zeroPad(number) {
  let stringValue = String(number);

  while (stringValue.length < 3) {
    stringValue = `0${stringValue}`;
  }
  
  return stringValue;
};
