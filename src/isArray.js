export default (value) => {
  return value &&
    value.length >= 0 &&
    Object.prototype.toString.call(value) === '[object Array]';
}
