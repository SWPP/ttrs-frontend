/**
 * error_utility
 *
 * Set of util functions for semantic-UI-style error handling
 * Yield semantic-UI-style error structure by parsing raw errors from backend error response or
 *                                         by checking custom validations from frontend
 *
 * It uses its own structure for errors, which is an object having a frame below,
 * {
 *   bools: {},
 *   texts: {},
 * }
 * bools has key-value pairs where key is field name of the error and value is always true
 * texts has key-value pairs where key is field name of the error and value is the error message
 */

import { convertToReadable } from './parser'

/**
 * get initial error structure
 */
export const initErrors = () => {
  return {
    bools: {},
    texts: {},
  }
}

/**
 * get semantic error structure from raw errors
 *
 * @param rawErrors: raw errors from backend
 * Example:
 * {
 *     username: ['A user with that username already exists.'],
 *     password: ['This password is too short.'],
 * }
 *
 * @returns semantic-UI-style error structure
 * Example:
 * {
 *   bools: {
 *     username: true,
 *     password: true,
 *   },
 *   texts: {
 *     username: 'Username: A user with that username already exists.',
 *     password: 'Password: This password is too short.'
 *   },
 * }
 */
export const getErrors = (rawErrors) => {
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

/**
 * update semantic-UI-style error structure based on original error structure
 * @param original: original error structure
 * @param rawErrors: raw errors from backend
 * @returns updated semantic-UI-style error structure
 */
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

/**
 * get semantic-UI-style error structure from custom error generating validations
 * @param validations: object of field: [test, message]
 *   where field is field name, test is condition for validation and message is the error message when error detected
 * @returns null if there is no errors, else semantic-UI-style error structure
 */
export const customErrors = (validations) => {
  const bools = {}
  const texts = {}
  let error = false
  Object.keys(validations).forEach(field => {
    if (!validations[field][0]) {
      error = true
      bools[field] = true
      texts[field] = `${convertToReadable(field)}: ${validations[field][1]}`
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
