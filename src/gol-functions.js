// fonctions that deliver board for the game :
// virgin board, random board, next board from a board applying the game rules

/**
 * Return next state of a plot
 * @param {*} array must be a 3x3 array. array[1][1][0] is the plot to test
 * @returns 0(dead) or 1(alive) depending of game of life rules
 */
export const countNeigbhours = (array) => {
  // plot extraction
  const plot = array[1][1][0];
  // sum of the plot neighbours
  array = [array[0], [array[1][0], array[1][2]], array[2]];
  array = array.flat(2);
  const neigbhours = array.reduce((a, x) => a + x);
  // rules application
  if (plot === 0 && neigbhours === 3) {
    console.log("become alive");
    return 1;
  } else if (plot === 1 && (neigbhours === 2 || neigbhours === 3)) {
    console.log("stay alive");
    return 1;
  } else {
    console.log("dead zone");
    return 0;
  }
};

/**
 * Create a virgin board
 * @param {number} width
 * @param {number} height
 * @returns {array} width x height array with 0 value
 */
export const createGame = (width, height) => {
  const gameGround = [];
  for (let j = 0; j < height; j++) {
    const line = [];
    for (let i = 0; i < width; i++) {
      line.push(0);
    }
    gameGround.push(line);
  }
  return gameGround;
};

/**
 * Create a random board ()
 * @param {number} width
 * @param {number} height
 * @returns {array} width x height array with random value
 */
export const randomBoard = (width, height) => {
  // adjustment between 0 and 0.5. if > 0 => less "1"
  const adjustment = 0.2;
  const gameGround = [];
  for (let j = 0; j < height; j++) {
    const line = [];
    for (let i = 0; i < width; i++) {
      line.push(Math.round(Math.abs(Math.random() - adjustment)));
    }
    gameGround.push(line);
  }
  return gameGround;
};

/**
 * Crete a 0 value array length=width
 * @param {number} width
 * @returns {array}
 */
const setZeroLine = (width) => {
  let zeroArray = [];
  for (let i = 0; i < width; i++) {
    zeroArray.push(0);
  }
  return zeroArray;
};

/**
 * Create an array with a "0" border around the array given in parameters
 * @param {array} array width x height
 * @param {number} width
 * @param {number} height
 * @returns {array} (with+2) x (height + 2) array
 */
export const createBackgroundGame = (array, width, height) => {
  const zeroLine = setZeroLine(width + 2);
  let workingArray = [zeroLine];
  for (let j = 0; j < height; j++) {
    const line = [0, ...array[j], 0];
    workingArray.push(line);
  }
  workingArray = [...workingArray, zeroLine];
  return workingArray;
};

/**
 * Apply the Game of life rules on an board that has been transform in a background array
 * @param {array} array with a "0" border (createBackgroundGame)
 * @param {number} width
 * @param {height} height
 * @returns {array} (width-2)x(height-2) array
 */
export const nextBoard = (array, width, height) => {
  let result = [];
  for (let j = 1; j < height + 1; j++) {
    // for an inner plot, creation of the neighbours array
    let lineResult = [];
    for (let i = 1; i < width + 1; i++) {
      const arrayWidthNeighbours = [
        [[array[j - 1][i - 1]], [array[j - 1][i]], [array[j - 1][i + 1]]],
        [[array[j][i - 1]], [array[j][i]], [array[j][i + 1]]],
        [[array[j + 1][i - 1]], [array[j + 1][i]], [array[j + 1][i + 1]]],
      ];
      lineResult.push(countNeigbhours(arrayWidthNeighbours));
    }
    result.push(lineResult);
  }
  return result;
};
