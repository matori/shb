function increment(currentIndex, arrayLength, loop) {
  const nextIndex = currentIndex + 1
  if (nextIndex > arrayLength - 1) {
    return loop ? 0 : currentIndex
  }
  return nextIndex
}

function decrement(currentIndex, arrayLength, loop) {
  const next = currentIndex - 1
  if (next < 0) {
    return loop ? arrayLength - 1 : 0
  }
  return next
}

export { increment, decrement }
