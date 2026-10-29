// base が0で割合を計算できないときは null を返す
function percentage(num, base, fixed = 0) {
  if (!base) {
    return null
  }
  const baseNum = (num / base) * 100
  return Math.round(baseNum * Math.pow(10, fixed)) / Math.pow(10, fixed)
}

export default percentage
