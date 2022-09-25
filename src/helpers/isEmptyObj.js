export function isEmpty(object) {
  if (typeof object !== 'object')
    throw new Error(`"${object}" is not type Object`)

  if (Array.isArray(object)) return object.length === 0

  return Object.keys(object).length === 0
}
