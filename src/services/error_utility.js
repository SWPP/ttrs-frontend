import { convertToReadable } from './parser'

export const supportErrors = () => {
  return {
    bools: {},
    texts: {},
  }
}

export const setErrors = (rawErrors) => {
  const bools = {}
  const texts = {}
  Object.keys(rawErrors).forEach(field => {
    bools[field] = true
    texts[field] = `${convertToReadable(field)}: ${rawErrors[field].join('\n')}`
  })
  return {
    bools,
    texts,
  }
}

export const updateErrors = (original, rawErrors) => {
  const bools = {}
  const texts = {}
  Object.keys(rawErrors).forEach(field => {
    bools[field] = true
    texts[field] = `${convertToReadable(field)}: ${rawErrors[field].join('\n')}`
  })
  return {
    bools: {
      ...original.bools,
      ...bools,
    },
    texts: {
      ...original.texts,
      ...texts,
    },
  }
}

export const customErrors = (tests) => {
  const bools = {}
  const texts = {}
  let error = false
  Object.keys(tests).forEach(field => {
    if (!tests[field][0]) {
      error = true
      bools[field] = true
      texts[field] = `${convertToReadable(field)}: ${tests[field][1]}`
    }
  })
  if (!error) {
    return null
  }
  return {
    bools,
    texts,
  }
}
