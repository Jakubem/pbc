import * as Moment from 'moment';

export function zeroPad(number) {
  let stringValue = String(number);

  while (stringValue.length < 3) {
    stringValue = `0${stringValue}`;
  }
  
  return stringValue;
};

export function uri(str) {
  return decodeURIComponent(str);
}

export function formatDate(str) {
  return Moment(str).format('MMM Do, YYYY');
}

// export function trimTitle(str) {
//   const titleChunks = str.split(" ")
//   return 
// }