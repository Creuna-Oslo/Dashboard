// Array utils

const map = func => array => array.map(func);
const reduce = (func, initial) => array => array.reduce(func, initial);

export { map, reduce };
