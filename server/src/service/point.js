const {uniqueId} = require("lodash/util");
const {inRange, random} = require("lodash/number");
const Point = new Map();

/**
 * @typedef Point
 * @property {string} pointId
 * @property {number} left
 * @property {number} top
 * @property {number} value
 */

/**
 * @return Point[]
 */
const getAllPoints = () => {
  return [...Point.values()]
}


const deletePoint = (pointId) => {}

/**
 * @param points { {
 *  left?: number;
 *  top?: number;
 *  value: number
 * }[] }
 */
const bulkCreatePoints = (points) => {


  points.forEach(point => {
    const pointId = point.pointId ? point.pointId : uniqueId();

    Point.set(pointId, {
      pointId,
      left: point.left ? point.left : 0,
      top: point.top ? point.top : 0,
      value: point.value ? point.value : 1,
    })
  })

  return points;
}

const bulkDeletePoints = () => {}

/**
 *
 * @param position { {left: number; top: number} }
 * @return ?Point
 */
const getPointByPosition = (position) => {
  return [...Point.values()].find((point) => {
    return point.left === position.left && point.top === position.top
  })
}
const deletePointByPosition = (position) => {
  const point =  [...Point.values()].find((point) => {
    return inRange(point.left, position.left - 20, position.left + 20) && inRange(point.top, position.top - 20, position.top + 20)  })

  if (point) {
    Point.delete(point.pointId)

    return true;
  }

  return false;
}

/**
 *
 * @param amount {number}
 */
const generateRandomPoints = (amount) => {

  const maxW = 1000, maxH = 700;

  const points = [];

  const margin = 10;

  const pointsDistance = 5;

  for (let i = 0; i < amount; i++) {

    let randomLeft, randomTop;

    do {
      randomLeft = random(0 + margin, maxW - margin);

      randomTop = random(0 + margin, maxH - margin);
    }
    while(points.length < amount && points.some((p) => {

      const pMinLeft = p.left - pointsDistance,
        pMaxLeft = p.left + pointsDistance,
        pMinTop = p.top - pointsDistance,
        pMaxTop = p.top + pointsDistance;

      return (randomLeft > pMinLeft && randomLeft < pMaxLeft) && (randomTop > pMinTop && randomTop < pMaxTop)
    }));

    points.push({
      pointId: uniqueId(),
      left: randomLeft,
      top: randomTop,
      value: 1
    })
  }

  points.forEach(p => {
    Point.set(p.pointId, p)
  })

  return points;
}

module.exports = {
  generateRandomPoints,
  getAllPoints,
  bulkCreatePoints,
  deletePointByPosition
}
