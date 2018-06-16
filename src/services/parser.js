export const isInstanceOf = (obj, typeString) => Object.prototype.toString.call(obj).slice(8, -1) === typeString
const isUpperCase = (char) => char.toLowerCase() !== char
// const isLowerCase = (char) => char.toUpperCase() !== char

const toCStyle = (key) => {
  const words = []
  let start = 0
  for (let i = 0; i < key.length; i += 1) {
    if (isUpperCase(key[i])) {
      words.push(key.slice(start, i).toLowerCase())
      start = i
    }
  }
  words.push(key.slice(start).toLowerCase())
  return words.join('_')
}

const toJavaStyle = (key) => {
  const words = []
  let first = true
  let start = 0
  for (let i = 0; i < key.length; i += 1) {
    if (key[i] === '_') {
      if (first) {
        words.push(key.slice(start, i))
      } else {
        words.push(key[start].toUpperCase() + key.slice(start + 1, i))
      }
      first = false
      start = i + 1
    }
  }
  if (first) {
    words.push(key.slice(start))
  } else {
    words.push(key[start].toUpperCase() + key.slice(start + 1))
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

const toLookUpStyle = (key) => {
  const words = []
  let start = 0
  for (let i = 0; i < key.length; i += 1) {
    if (key[i] === '.') {
      words.push(key.slice(start, i))
      start = i + 1
    }
  }
  words.push(key.slice(start))
  return words.join('__')
}

export const updateURLParams = (url, params) => {
  const attrs = []
  Object.keys(params).forEach((key) => {
    attrs.push(`${toLookUpStyle(toCStyle(key))}=${params[key]}`)
  })
  return `${url}?${attrs.join('&')}`
}

export const convertToReadable = (key) => {
  const words = []
  let start = 0
  for (let i = 0; i < key.length; i += 1) {
    if (isUpperCase(key[i])) {
      if (start === 0) {
        words.push(key[start].toUpperCase() + key.slice(start + 1, i))
      } else {
        words.push(key.slice(start, i))
      }
      start = i
    }
  }
  if (start === 0) {
    words.push(key[start].toUpperCase() + key.slice(start + 1))
  } else {
    words.push(key.slice(start))
  }
  return words.join(' ')
}

export const compressBlocks = (_blocks) => {
  let blocks = _blocks
  if (blocks === null || blocks === undefined) {
    blocks = []
    for (let i = 0; i < 24; i += 1) {
      blocks.push([])
      for (let j = 0; j < 6; j += 1) {
        blocks[i].push(true)
      }
    }
  }
  let empty = true
  for (let i = 0; i < 24; i += 1) {
    for (let j = 0; j < 6; j += 1) {
      if (blocks[i][j]) {
        empty = false
      }
    }
  }
  if (empty) {
    for (let i = 0; i < 24; i += 1) {
      for (let j = 0; j < 6; j += 1) {
        blocks[i][j] = true
      }
    }
  }
  blocks.push([])
  for (let j = 0; j < 6; j += 1) {
    blocks[24].push(false)
  }
  const days = []
  for (let j = 0; j < 6; j += 1) {
    const slots = []
    let start = null
    for (let i = 0; i < 25; i += 1) {
      if (!blocks[i][j]) {
        if (start !== null) {
          slots.push(`${start + 18}:${i + 18}`)
          start = null
        }
      } else if (start === null) {
        start = i
      }
    }
    days.push(slots.join(','))
  }
  return days.join('|')
}
