function percentage(num, base, fixed = 0) {
  const baseNum = (num / base) * 100
  return Math.round(baseNum * Math.pow(10, fixed)) / Math.pow(10, fixed)
}

export default percentage
