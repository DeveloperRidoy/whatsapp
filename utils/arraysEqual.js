const arraysEqual = (a, b) => {
    a.sort();
    b.sort();
    return a.length === b.length && a.every((v, i) => v === b[i])
};

module.exports = arraysEqual;