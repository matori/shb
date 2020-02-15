function sleep (msec) {
  return new Promise(resolve => setTimeout(resolve, msec));
}

export default sleep
