const isInstanceOf = (obj, typeString) => {
  return Object.prototype.toString.call(obj).slice(8, -1) === typeString
}

const toCStyle = (originalKey) => {
  const words = []
  let start = 0
  for (let i = 0; i < originalKey.length; i += 1) {
    if (originalKey[i].isUppercase()) {
      words.push(originalKey.slice(start, i).toLowerCase())
      start = i
    }
  }
  words.push(originalKey.slice(start).toLowerCase())
  return words.join('_')
}

const toJavaStyle = (originalKey) => {
  const words = []
  let first = true
  let start = 0
  for (let i = 0; i < originalKey.length; i += 1) {
    if (originalKey[i] === '_') {
      if (first) {
        words.push(originalKey.slice(start, i))
      } else {
        words.push(originalKey[start].toUpperCase() + originalKey.slice(start + 1, i))
      }
      first = false
      start = i + 1
    }
  }
  if (first) {
    words.push(originalKey.slice(start))
  } else {
    words.push(originalKey[start].toUpperCase() + originalKey.slice(start + 1))
  }
  return words.join('')
}

const convertStyle = (original, style) => {
  if (isInstanceOf(original, 'Array')) {
    const array = []
    for (let i = 0; i < original.length; i += 1) {
      array.push(convertStyle(original[i], style))
    }
    return array
  } else if (isInstanceOf(original, 'Object')) {
    const dictionary = {}
    Object.keys(original).forEach((key) => {
      dictionary[style(key)] = convertStyle(original[key], style)
    })
    return dictionary
  }
  return original
}

export const convertToCStyle = (original) => {
  return convertStyle(original, toCStyle)
}

export const convertToJavaStyle = (original) => {
  return convertStyle(original, toJavaStyle)
}
