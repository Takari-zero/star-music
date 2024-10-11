export function getValueFromLocalStorage(key, initial) {
  let val
  try {
    val = JSON.parse(localStorage.getItem(key))
    if (val === null) {
      throw new Error('该值为空')
    }
  } catch (e) {
    return initial
  }
  return val
}

export function setValueToLocalStorage(key, val) {
  localStorage.setItem(key, JSON.stringify(val))
}
