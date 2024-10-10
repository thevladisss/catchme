const {uniqueId} = require("lodash/util");
const {inRange} = require("lodash/number");
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
    const pointId = uniqueId();
    Point.set(pointId, {
      pointId,
      left: point.left ? point.left : 0,
      top: point.top ? point.top : 0,
      value: point.value ? point.value : 1,
    })
  })
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

module.exports = {
  getAllPoints,
  bulkCreatePoints,
  deletePointByPosition
}
