const smooth = (arr, r = 5) => arr.map((_, i) =>
  arr.slice(Math.max(i - r, 0), Math.min(i + r + 1, arr.length)).reduce((a, x) => a + x, 0) / (Math.min(i + r + 1, arr.length) - Math.max(i - r, 0))
);

const transpose = (matrix) => matrix[0].map((_, i) => matrix.map(row => row[i]));

export {
  smooth,
  transpose,
};

