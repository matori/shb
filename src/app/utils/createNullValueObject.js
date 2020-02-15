function createNullValueObject(keys) {
  return keys.reduce((obj, key) => {
    obj[key] = null
    return obj
  }, {})
}

export default createNullValueObject
